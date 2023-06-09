import { ApiModules, estimationsModule } from "@md/api";
import { google } from "googleapis";
import StoryblokClient from "storyblok-js-client";

import { serverEnvironment } from "./serverEnvironment";

const sheetsClient = google.sheets({
  version: "v4",
  auth: serverEnvironment.GOOGLE_SHEETS_API_KEY,
});

const StoryblokWriteClient = new StoryblokClient({
  oauthToken: serverEnvironment.STORYBLOK_OAUTH_TOKEN,
});

const StoryblockReadClient = new StoryblokClient({
  accessToken: serverEnvironment.STORYBLOK_ACCESS_TOKEN,
});

export const apiModules: ApiModules = {
  estimations: estimationsModule({
    appEnvironment: serverEnvironment.APP_ENVIRONMENT,
    sheetsClient: sheetsClient,
    slackWebhookUrl: serverEnvironment.SLACK_WEBHOOK_URL,
    storyblokEstimationsFolderId:
      serverEnvironment.STORYBLOK_ESTIMATIONS_FOLDER_ID,
    storyblokReadClient: StoryblockReadClient,
    storyblokWriteClient: StoryblokWriteClient,
    storyblokSpaceId: serverEnvironment.STORYBLOK_SPACE_ID,
  }),
};
