import { sheets_v4 } from "googleapis";
import randomstring from "randomstring";
import StoryblokClient from "storyblok-js-client";
import { estimationFromSheet } from "../factories/estimationFromSheet";
import { downloadEstimationSheet } from "../gateways/sheets/download/downloadEstimationSheet";
import { parseEstimationSheet } from "../gateways/sheets/parse/parseEstimationSheet";
import { createEstimation } from "../gateways/storyblok/create/createEstimation";

interface CreateEstimationFromSheetCommand {
  sheetsClient: sheets_v4.Sheets;
  spreadsheetId: string;
  storyblokReadClient: StoryblokClient;
  storyblokWriteClient: StoryblokClient;
  storyblokEnvironmentFolderName: string;
  storyblokEstimationsFolderId: string;
  storyblokSpaceId: string;
}

const generateEstimationSecret = (organization: string) => {
  const preparedOrganizationText = organization
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();

  const randomText = randomstring.generate({
    length: 4,
    capitalization: "lowercase",
  });

  return `${preparedOrganizationText}-${randomText}`;
};

export const createEstimationFromSheet = async (
  command: CreateEstimationFromSheetCommand
) => {
  const estimationSheetDownloadResult = await downloadEstimationSheet(
    command.sheetsClient,
    command.spreadsheetId
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

  const { estimationSheet } = estimationSheetParseResult;

  const estimationSecret = generateEstimationSecret(
    estimationSheet.organization
  );
  const estimation = estimationFromSheet(estimationSheet, estimationSecret);

  const createEstimationResult = await createEstimation({
    client: command.storyblokWriteClient,
    estimation: estimation,
    folderId: command.storyblokEstimationsFolderId,
    spaceId: command.storyblokSpaceId,
  });

  if (createEstimationResult.isError === true) {
    return createEstimationResult;
  }

  return { isError: false, secret: estimationSecret };
};
