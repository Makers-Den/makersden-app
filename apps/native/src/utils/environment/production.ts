import { EnvironmentVariables } from "./validate";

export const productionEnvironmentVariables = (): EnvironmentVariables => ({
  API_URL: "https://app.makersden.io/api",
  EXAMPLE_ESTIMATION_SECRET: "marketing-comp-ttpp",
  SENTRY_DSN: 'https://1aba48f8b248459d862e97fbd80ac9a7@o4504763276066816.ingest.sentry.io/4504763751661568',
  WEB_LINKING_URL: "https://app.makersden.io",
});
