import { z } from "zod";

export type EnvironmentVariables = z.infer<typeof validateEnvVars>;

export const validateEnvVars = z.object({
  /**
   * Base API URL
   */
  API_URL: z.string().url(),
  /**
   * Estimation secret that will be used when user clicks "See example estimation"
   */
  EXAMPLE_ESTIMATION_SECRET: z.string().min(1),
  /**
   * Base app URL used for the deep linking https://reactnavigation.org/docs/deep-linking/#setup-with-expo-projects
   */
  WEB_LINKING_URL: z.string().url(),
});
