import * as Updates from "expo-updates";

import { developmentEnvironmentVariables } from "./development";
import { productionEnvironmentVariables } from "./production";
import { stagingEnvironmentVariables } from "./staging";
import { validateEnvVars } from "./validate";

const getEnvironment = () => {
  const channel = Updates.channel;

  if (channel === "production") {
    return validateEnvVars.parse(productionEnvironmentVariables());
  }

  if (channel === "staging" || channel === "staging-store") {
    return validateEnvVars.parse(stagingEnvironmentVariables());
  }

  return validateEnvVars.parse(developmentEnvironmentVariables());
};

export const environment = getEnvironment();
