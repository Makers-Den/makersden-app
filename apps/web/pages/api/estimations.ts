import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import StoryblokClient, { type ISbStoryData } from "storyblok-js-client";
import type { EstimationContent } from "./storyTypes";

// @TODO validate envs (zod?) and move them somewhere
const env = {
  GOOGLE_SHEETS_API_KEY: process.env.GOOGLE_SHEETS_API_KEY,
  GOOGLE_SHEETS_SPREADSHEET_ID: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
  STORYBLOK_ACCESS_TOKEN: process.env.STORYBLOK_ACCESS_TOKEN,
  STORYBLOK_ESTIMATIONS_FOLDER_ID: process.env.STORYBLOK_ESTIMATIONS_FOLDER_ID,
  STORYBLOK_OAUTH_TOKEN: process.env.STORYBLOK_OAUTH_TOKEN,
  STORYBLOK_SPACE_ID: process.env.STORYBLOK_SPACE_ID,
};

export type SheetRow = [string, string, number, number, number, number];

// @TODO move all storyblok related types to one place (shared library?)
export interface StoryResponse {
  story: ISbStoryData<EstimationContent>;
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
    spreadsheetId: env.GOOGLE_SHEETS_SPREADSHEET_ID, // @TODO get this from request
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
