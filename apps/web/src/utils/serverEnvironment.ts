import { z } from "zod";

const validateEnvVars = z.object({
  APP_ENVIRONMENT: z.enum(["development", "staging", "production"]),
  GOOGLE_SHEETS_API_KEY: z.string().min(1),
  SLACK_WEBHOOK_URL: z.string().url(),
  STORYBLOK_ACCESS_TOKEN: z.string().min(1),
  STORYBLOK_ENVIRONMENT_FOLDER_NAME: z.string().min(1),
  STORYBLOK_ESTIMATIONS_FOLDER_ID: z.string().min(1),
  STORYBLOK_OAUTH_TOKEN: z.string().min(1),
  STORYBLOK_PREVIEW_SECRET: z.string().min(1),
  STORYBLOK_SPACE_ID: z.string().min(1),
});

export const serverEnvironment = validateEnvVars.parse(
  Object.freeze({
    APP_ENVIRONMENT: process.env.APP_ENVIRONMENT,
    GOOGLE_SHEETS_API_KEY: process.env.GOOGLE_SHEETS_API_KEY,
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
    STORYBLOK_ACCESS_TOKEN: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
    STORYBLOK_ENVIRONMENT_FOLDER_NAME:
      process.env.STORYBLOK_ENVIRONMENT_FOLDER_NAME,
    STORYBLOK_ESTIMATIONS_FOLDER_ID:
      process.env.STORYBLOK_ESTIMATIONS_FOLDER_ID,
    STORYBLOK_OAUTH_TOKEN: process.env.STORYBLOK_OAUTH_TOKEN,
    STORYBLOK_PREVIEW_SECRET: process.env.STORYBLOK_PREVIEW_SECRET,
    STORYBLOK_SPACE_ID: process.env.STORYBLOK_SPACE_ID,
  })
);
