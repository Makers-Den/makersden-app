import { ApiModules, estimationsModule } from "api";
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
    sheetsClient: sheetsClient,
    storyblokEnvironmentFolderName:
      serverEnvironment.STORYBLOK_ENVIRONMENT_FOLDER_NAME,
    storyblokEstimationsFolderId:
      serverEnvironment.STORYBLOK_ESTIMATIONS_FOLDER_ID,
    storyblokReadClient: StoryblockReadClient,
    storyblokWriteClient: StoryblokWriteClient,
    storyblokSpaceId: serverEnvironment.STORYBLOK_SPACE_ID,
  }),
};
