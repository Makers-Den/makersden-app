import { z } from "zod";

export type EnvironmentVariables = z.infer<typeof validateEnvVars>;

export const validateEnvVars = z.object({
  /**
   * @TODO Add env description
   * lan IP (for example 192.168.1.20) must be used instead of localhost
   * probably some config must be added before using on ios https://stackoverflow.com/questions/38418998/react-native-fetch-network-request-failed
   */
  EXAMPLE_ESTIMATION_SECRET: z.string().min(1),
  /**
   * @TODO Add env description
   */
  API_URL: z.string().url(),
});
