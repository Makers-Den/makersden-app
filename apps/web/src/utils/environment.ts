import { z } from "zod";

const validateEnvVars = z.object({
  EXAMPLE_ESTIMATION_SECRET: z.string().min(1),
  GOOGLE_SHEETS_API_KEY: z.string().min(1),
  STORYBLOK_ACCESS_TOKEN: z.string().min(1),
  STORYBLOK_ENVIRONMENT_FOLDER_NAME: z.string().min(1),
  STORYBLOK_ESTIMATIONS_FOLDER_ID: z.string().min(1),
  STORYBLOK_OAUTH_TOKEN: z.string().min(1),
  STORYBLOK_SPACE_ID: z.string().min(1),
});

export const environment = validateEnvVars.parse(
  Object.freeze({
    EXAMPLE_ESTIMATION_SECRET:
      process.env.NEXT_PUBLIC_EXAMPLE_ESTIMATION_SECRET,
    GOOGLE_SHEETS_API_KEY: process.env.GOOGLE_SHEETS_API_KEY,
    STORYBLOK_ACCESS_TOKEN: process.env.STORYBLOK_ACCESS_TOKEN,
    STORYBLOK_ENVIRONMENT_FOLDER_NAME:
      process.env.STORYBLOK_ENVIRONMENT_FOLDER_NAME,
    STORYBLOK_ESTIMATIONS_FOLDER_ID:
      process.env.STORYBLOK_ESTIMATIONS_FOLDER_ID,
    STORYBLOK_OAUTH_TOKEN: process.env.STORYBLOK_OAUTH_TOKEN,
    STORYBLOK_SPACE_ID: process.env.STORYBLOK_SPACE_ID,
  })
);
