import { EnvironmentVariables } from "./validate";

export const stagingEnvironmentVariables = (): EnvironmentVariables => ({
  API_URL: "https://staging.app.makersden.io/api",
  EXAMPLE_ESTIMATION_SECRET: "marketing-comp-ntt8",
  SENTRY_DSN:
    "https://7455d421a86f4e7ba4267adbaf8b955d@o4504763276066816.ingest.sentry.io/4504763735736320",
  WEB_LINKING_URL: "https://staging.app.makersden.io",
});
