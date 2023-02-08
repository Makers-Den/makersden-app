import { sheets_v4 } from "googleapis";
import StoryblokClient from "storyblok-js-client";

import { findEstimation } from "./gateways/storyblok/find/findEstimation";
import { createEstimationFromSheet } from "./services/createEstimationFromSheet";

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
    createEstimationFromSheet: (spreadsheetId: string) =>
      createEstimationFromSheet({
        storyblokReadClient: deps.storyblokReadClient,
        storyblokWriteClient: deps.storyblokWriteClient,
        sheetsClient: deps.sheetsClient,
        spreadsheetId,
        storyblokEstimationsFolderId: deps.storyblokEstimationsFolderId,
        storyblokEnvironmentFolderName: deps.storyblokEnvironmentFolderName,
        storyblokSpaceId: deps.storyblokSpaceId,
      }),
    findEstimation: (secret: string) =>
      findEstimation({
        client: deps.storyblokReadClient,
        environmentFolderName: deps.storyblokEnvironmentFolderName,
        secret,
      }),
  };
};
