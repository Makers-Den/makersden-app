import { sheets_v4 } from "googleapis";
import StoryblokClient from "storyblok-js-client";

import { AppEnvironment } from "../shared/types";
import { findEstimation } from "./gateways/storyblok/find/findEstimation";
import { createEstimationFromSheet } from "./services/createEstimationFromSheet";
import { notifyEstimationOpened } from "./services/notifyEstimationOpened";

export interface EstimationsModuleDeps {
  appEnvironment: AppEnvironment;
  sheetsClient: sheets_v4.Sheets;
  slackWebhookUrl: string;
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
    notifyEstimationOpened: (secret: string, ipAddress: string | null) => {
      if (deps.appEnvironment === "development") {
        return { isError: false };
      }

      return notifyEstimationOpened({
        appEnvironment: deps.appEnvironment,
        estimationSecret: secret,
        ipAddress,
        slackWebhookUrl: deps.slackWebhookUrl,
        storyblokEnvironmentFolderName: deps.storyblokEnvironmentFolderName,
        storyblokReadClient: deps.storyblokReadClient,
      });
    },
    findEstimation: (secret: string) =>
      findEstimation({
        client: deps.storyblokReadClient,
        environmentFolderName: deps.storyblokEnvironmentFolderName,
        secret,
      }),
  };
};
