import { z } from "zod";

export type EnvironmentVariables = z.infer<typeof validateEnvVars>;

export const validateEnvVars = z.object({
  /**
   * @TODO Add env description
   */
  API_URL: z.string().url(),
  /**
   * @TODO Add env description
   */
  EXAMPLE_ESTIMATION_SECRET: z.string().min(1),
  /**
   * @TODO Add env description
   */
  SENTRY_DSN: z.string().min(1).optional(),
  /**
   * @TODO Add env description
   */
  WEB_LINKING_URL: z.string().url(),
});
