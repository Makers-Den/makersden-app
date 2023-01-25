import Constants from "expo-constants";
import { z } from "zod";

const validateEnvVars = z.object({
  EXAMPLE_ESTIMATION_SECRET: z.string().min(1),
  API_URL: z.string().url(),
});

export const environment = validateEnvVars.parse(
  Object.freeze({
    API_URL: Constants.manifest?.extra?.API_URL,
    EXAMPLE_ESTIMATION_SECRET:
      Constants.manifest?.extra?.EXAMPLE_ESTIMATION_SECRET,
  })
);
