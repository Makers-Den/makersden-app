import Constants from "expo-constants";

// @TODO validate envs (zod?) and move them somewhere
export const environment = Object.freeze({
  API_URL: Constants.manifest?.extra?.API_URL,
  EXAMPLE_ESTIMATION_SECRET: Constants.manifest?.extra?.EXAMPLE_ESTIMATION_SECRET,
});
