import { EnvironmentVariables } from "./validate";
import Constants from "expo-constants";

const getLocalIp = () => {
  const localIpMatch = Constants.experienceUrl.match(
    /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g
  );

  if (!localIpMatch) throw new Error("failed to get local ip");

  return localIpMatch[0];
};

export const developmentEnvironmentVariables: Partial<EnvironmentVariables> = {
  API_URL: `http://${getLocalIp()}:3000/api`,
  EXAMPLE_ESTIMATION_SECRET: "marketing-comp-9z7x",
};
