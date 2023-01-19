import { ApiModules, estimationsModule } from "api";
import { google } from "googleapis";
import StoryblokClient from "storyblok-js-client";
import { environment } from "./environment";

const sheetsClient = google.sheets({
  version: "v4",
  auth: environment.GOOGLE_SHEETS_API_KEY,
});

const StoryblokWriteClient = new StoryblokClient({
  oauthToken: environment.STORYBLOK_OAUTH_TOKEN,
});

const StoryblockReadClient = new StoryblokClient({
  accessToken: environment.STORYBLOK_ACCESS_TOKEN,
});

export const apiModules: ApiModules = {
  estimations: estimationsModule({
    sheetsClient: sheetsClient,
    storyblokEnvironmentFolderName:
      environment.STORYBLOK_ENVIRONMENT_FOLDER_NAME,
    storyblokEstimationsFolderId: environment.STORYBLOK_ESTIMATIONS_FOLDER_ID,
    storyblokReadClient: StoryblockReadClient,
    storyblokWriteClient: StoryblokWriteClient,
    storyblokSpaceId: environment.STORYBLOK_SPACE_ID,
  }),
};
