import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import StoryblokClient, { type ISbStoryData } from "storyblok-js-client";
import type { EstimationContent } from "./storyTypes";
import { downloadEstimationSheet } from "../../lib/estimation-sheet/download/downloadEstimationSheet";
import { parseEstimationSheet } from "../../lib/estimation-sheet/parse/parseEstimationSheet";

// @TODO validate envs (zod?) and move them somewhere
const env = {
  GOOGLE_SHEETS_API_KEY: process.env.GOOGLE_SHEETS_API_KEY,
  GOOGLE_SHEETS_SPREADSHEET_ID: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
  STORYBLOK_ACCESS_TOKEN: process.env.STORYBLOK_ACCESS_TOKEN,
  STORYBLOK_ENVIRONMENT_FOLDER_NAME:
    process.env.STORYBLOK_ENVIRONMENT_FOLDER_NAME,
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

  const estimationSheetDownloadResult = await downloadEstimationSheet(
    sheets,
    env.GOOGLE_SHEETS_SPREADSHEET_ID
  );

  if (estimationSheetDownloadResult.isError === true) {
    res
      .status(500)
      .json({ message: "Estimation sheet could not be downloaded" });

    return;
  }

  const estimationSheetParseResult = parseEstimationSheet(
    estimationSheetDownloadResult.rows
  );

  if (estimationSheetParseResult.isError === true) {
    const { error } = estimationSheetParseResult;

    if (error.type === "EMPTY_SHEET") {
      res.status(422).json({ message: "Estimation sheet is empty" });
    } else if (error.type === "FIRST_ROW_IS_NOT_SECTION_HEADER") {
      res
        .status(422)
        .json({ message: "Estimation sheet first row is not section header" });
    } else if (error.type === "ROW_PARSE_FAILURE") {
      res.status(422).json({
        message: "Estimation sheet first row is not section header",
        row: error.row,
      });
    } else {
      res.status(500).json({
        message: "Something went wrong",
      });
    }

    return;
  }

  const spreadsheetName = "example-project-" + randomBetween(0, 10000000); // @TODO figure out way to generate names

  // @TODO make it type safe
  const content = {
    component: "Estimation",
    title: spreadsheetName,
    sections: estimationSheetParseResult.estimationSheet.sections.map(
      (section) => ({
        component: "EstimationSection",
        title: section.title,
        description: {
          type: "doc",
          content: section.description
            .split("\n")
            .filter((paragraph: string) => !!paragraph)
            .map((paragraph: string) => ({
              type: "paragraph",
              content: [{ text: paragraph, type: "text" }],
            })),
        },
        rows: section.rows.map((row) => ({
          component: "EstimationRow",
          task: {
            type: "doc",
            content: row.task
              .split("\n")
              .filter((paragraph: string) => !!paragraph)
              .map((paragraph: string) => ({
                type: "paragraph",
                content: [{ text: paragraph, type: "text" }],
              })),
          },
          description: {
            type: "doc",
            content: row.description
              .split("\n")
              .filter((paragraph: string) => !!paragraph)
              .map((paragraph: string) => ({
                type: "paragraph",
                content: [{ text: paragraph, type: "text" }],
              })),
          },
          optimisticDays: row.optimisticDays ?? 0,
          nominalDays: row.nominalDays ?? 0,
          pessimisticDays: row.pessimisticDays ?? 0,
        })),
      })
    ),
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
    `cdn/stories/${env.STORYBLOK_ENVIRONMENT_FOLDER_NAME}/estimations/${spreadsheetName}`,
    {
      version: "draft",
    }
  ); // @TODO handle error

  // @TODO make it type safe
  res.status(200).json((storyblokEstimationRes as any).data as StoryResponse);
};
