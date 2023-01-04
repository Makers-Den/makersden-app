import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import StoryblokClient from "storyblok-js-client";

// @TODO validate envs (zod?) and move them somewhere
const env = {
  GOOGLE_SHEETS_API_KEY: process.env.GOOGLE_SHEETS_API_KEY,
  STORYBLOK_ACCESS_TOKEN: process.env.STORYBLOK_ACCESS_TOKEN,
  STORYBLOK_ESTIMATIONS_FOLDER_ID: process.env.STORYBLOK_ESTIMATIONS_FOLDER_ID,
  STORYBLOK_OAUTH_TOKEN: process.env.STORYBLOK_OAUTH_TOKEN,
  STORYBLOK_SPACE_ID: process.env.STORYBLOK_SPACE_ID,
};

export type SheetRow = [string, string, number, number, number, number];

// @TODO move all storyblok related types to one place (shared library?)
export interface Mark {
  type: string;
}

export interface Content3 {
  text: string;
  type: string;
  marks: Mark[];
}

export interface Content2 {
  type: string;
  content: Content3[];
}

export interface Description {
  type: string;
  content: Content2[];
}

export interface Task {
  type: string;
  content: Content2[];
}

export interface Row {
  _uid: string;
  task: Task;
  component: string;
  description: Description;
  nominalDays: string;
  optimisticDays: string;
  pessimisticDays: string;
  _editable: string;
}

export interface Section {
  _uid: string;
  rows: Row[];
  title: string;
  component: string;
  _editable: string;
}

export interface Content {
  _uid: string;
  title: string;
  sections: Section[];
  component: string;
  _editable: string;
}

export interface Story {
  name: string;
  created_at: Date;
  published_at: Date;
  id: number;
  uuid: string;
  content: Content;
  slug: string;
  full_slug: string;
  sort_by_date?: any;
  position: number;
  tag_list: any[];
  is_startpage: boolean;
  parent_id: number;
  meta_data?: any;
  group_id: string;
  first_published_at: Date;
  release_id?: any;
  lang: string;
  path?: any;
  alternates: any[];
  default_full_slug?: any;
  translated_slugs?: any;
}

export interface StoryResponse {
  story: Story;
}

const sheets = google.sheets({
  version: "v4",
  auth: env.GOOGLE_SHEETS_API_KEY,
});

// @TODO Figure out if we can somehow merge write/read clients
const WriteStoryblokClient = new StoryblokClient({
  oauthToken: env.STORYBLOK_OAUTH_TOKEN,
});

const ReadStoryblokClient = new StoryblokClient({
  accessToken: env.STORYBLOK_ACCESS_TOKEN,
});

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // @TODO check if user can generate spreadsheet
  if (req.headers.authorization !== "temporary-secret-for-testing-purposes") {
    res.status(401).end();
    return;
  }

  const batchSpreadsheetRes = await sheets.spreadsheets.values.batchGet({
    spreadsheetId: "1YGIZxikkkW6yopbFs5kwRk49A7jXQds8fYSfdcEotTk", // @TODO get this from request
    ranges: ["A3:F3", "A4:F4", "A5:F5"], // @TODO do not hardcore this
    valueRenderOption: "UNFORMATTED_VALUE",
  }); // @TODO handle error (sheet not public/wrong api key and so on)

  const rows = batchSpreadsheetRes.data.valueRanges?.flatMap(
    (valueRange) => valueRange.values
  );

  if (!rows || rows.length === 0) {
    // @TODO return error
    return null;
  }

  // @TODO validate rows content
  // @TODO round to estimates to 1 place after comma

  const spreadsheetName = "example-project-" + randomBetween(0, 10000000); // @TODO figure out way to generate names

  // @TODO make it type safe
  const content = {
    component: "Estimation",
    title: spreadsheetName,
    sections: [
      {
        component: "EstimationSection",
        title: "authorization/authorization",
        rows: rows.map(
          ([
            task,
            description,
            optimisticDays,
            nominalDays,
            pessimisticDays,
          ]: any) => ({
            component: "EstimationRow",
            task: {
              type: "doc",
              content: task
                .split("\n")
                .filter((paragraph: string) => !!paragraph)
                .map((paragraph: string) => ({
                  type: "paragraph",
                  content: [{ text: paragraph, type: "text" }],
                })),
            },
            description: {
              type: "doc",
              content: description
                .split("\n")
                .filter((paragraph: string) => !!paragraph)
                .map((paragraph: string) => ({
                  type: "paragraph",
                  content: [{ text: paragraph, type: "text" }],
                })),
            },
            optimisticDays,
            nominalDays,
            pessimisticDays,
          })
        ),
      },
    ],
  };

  const createStoryblokEstimationRes = await WriteStoryblokClient.post(
    `spaces/${env.STORYBLOK_SPACE_ID}/stories`,
    {
      story: {
        name: spreadsheetName,
        slug: spreadsheetName,
        parent_id: env.STORYBLOK_ESTIMATIONS_FOLDER_ID,
        content,
      },
    }
  ); // @TODO handle error

  // @TODO check if we can skip this part and just return data from 'createEstimationRes' variable
  const storyblokEstimationRes = await ReadStoryblokClient.get(
    `cdn/stories/estimations/${spreadsheetName}`,
    {
      version: "draft",
    }
  ); // @TODO handle error

  // @TODO make it type safe
  res.status(200).json((storyblokEstimationRes as any).data as StoryResponse);
};
