import { sheets_v4 } from "googleapis";
import StoryblokClient from "storyblok-js-client";
import { createEstimationFromSheet } from "./services/createEstimationFromSheet";
import { listEstimations } from "./services/listEstimations";

export interface EstimationsModuleDeps {
  sheetsClient: sheets_v4.Sheets;
  storyblokReadClient: StoryblokClient;
  storyblokWriteClient: StoryblokClient;
  storyblokEstimationsFolderId: string;
  storyblokEnvironmentFolderName: string;
  storyblokSpaceId: string;
}

export const estimationsModule = (deps: EstimationsModuleDeps) => {
  return {
    createEstimationFromSheet: (spreadsheetId: string, sheetId: number) =>
      createEstimationFromSheet({
        storyblokReadClient: deps.storyblokReadClient,
        storyblokWriteClient: deps.storyblokWriteClient,
        sheetsClient: deps.sheetsClient,
        spreadsheetId,
        sheetId,
        storyblokEstimationsFolderId: deps.storyblokEstimationsFolderId,
        storyblokEnvironmentFolderName: deps.storyblokEnvironmentFolderName,
        storyblokSpaceId: deps.storyblokSpaceId,
      }),
    listEstimations: (organization: string) =>
      listEstimations({
        storyblokReadClient: deps.storyblokReadClient,
        storyblokEnvironmentFolderName: deps.storyblokEnvironmentFolderName,
        organization,
      }),
  };
};
