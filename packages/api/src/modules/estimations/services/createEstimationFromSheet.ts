import { sheets_v4 } from "googleapis";
import StoryblokClient from "storyblok-js-client";
import { estimationFromSheet } from "../factories/estimationFromSheet";
import { downloadEstimationSheet } from "../gateways/sheets/download/downloadEstimationSheet";
import { parseEstimationSheet } from "../gateways/sheets/parse/parseEstimationSheet";
import { createEstimation } from "../gateways/storyblok/create/createEstimation";

interface CreateEstimationFromSheetCommand {
  sheetsClient: sheets_v4.Sheets;
  spreadsheetId: string;
  sheetId: number;
  storyblokReadClient: StoryblokClient;
  storyblokWriteClient: StoryblokClient;
  storyblokEnvironmentFolderName: string;
  storyblokEstimationsFolderId: string;
  storyblokSpaceId: string;
}

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const createEstimationFromSheet = async (
  command: CreateEstimationFromSheetCommand
) => {
  const estimationSheetDownloadResult = await downloadEstimationSheet(
    command.sheetsClient,
    command.spreadsheetId,
    command.sheetId
  );

  if (estimationSheetDownloadResult.isError === true) {
    return estimationSheetDownloadResult;
  }

  const estimationSheetParseResult = parseEstimationSheet(
    estimationSheetDownloadResult.rows
  );

  if (estimationSheetParseResult.isError === true) {
    return estimationSheetParseResult;
  }

  const estimationName = "example-project-" + randomBetween(0, 10000000); // @TODO figure out way to generate names
  const estimation = estimationFromSheet(
    estimationName,
    estimationSheetParseResult.estimationSheet
  );

  const createEstimationResult = await createEstimation({
    client: command.storyblokWriteClient,
    estimation: estimation,
    name: estimationName,
    folderId: command.storyblokEstimationsFolderId,
    spaceId: command.storyblokSpaceId,
  });

  if (createEstimationResult.isError === true) {
    return createEstimationResult;
  }

  return { isError: false };
};
