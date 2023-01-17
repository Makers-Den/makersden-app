import { google } from "googleapis";
import StoryblokClient from "storyblok-js-client";
import { appRouter, createTRPCContext } from "api";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { environment } from "../../../utils/environment";

const sheetsClient = google.sheets({
  version: "v4",
  auth: environment.GOOGLE_SHEETS_API_KEY,
});

// @TODO Figure out if we can somehow merge write/read clients
const StoryblokWriteClient = new StoryblokClient({
  oauthToken: environment.STORYBLOK_OAUTH_TOKEN,
});

const StoryblockReadClient = new StoryblokClient({
  accessToken: environment.STORYBLOK_ACCESS_TOKEN,
});

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: () =>
    createTRPCContext({
      estimations: {
        sheetsClient: sheetsClient,
        sheetId: environment.GOOGLE_SHEETS_SPREADSHEET_ID,
        storyblokEnvironmentFolderName:
          environment.STORYBLOK_ENVIRONMENT_FOLDER_NAME,
        storyblokEstimationsFolderId:
          environment.STORYBLOK_ESTIMATIONS_FOLDER_ID,
        storyblokReadClient: StoryblockReadClient,
        storyblokWriteClient: StoryblokWriteClient,
        storyblokSpaceId: environment.STORYBLOK_SPACE_ID,
      },
    }),
});
