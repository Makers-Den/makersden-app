import Constants from "expo-constants";
import { z } from "zod";

// @TODO validate envs (zod?) and move them somewhere
export const environment = Object.freeze({
  API_URL: Constants.manifest?.extra?.API_URL,
  EXAMPLE_ESTIMATION_SECRET:
    Constants.manifest?.extra?.EXAMPLE_ESTIMATION_SECRET,
});

const validateEnvVars = z.object({
  EXAMPLE_ESTIMATION_SECRET: z.string().min(1),
  API_URL: z.string().url(),
});

validateEnvVars.parse(environment);
