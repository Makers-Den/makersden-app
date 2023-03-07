import StoryblokClient from "storyblok-js-client";

import { AppEnvironment } from "../../shared/types";
import { notifyEstimationOpened as slackNotifyEstimationOpened } from "../gateways/slack/notifyEstimationOpened";
import { findEstimation as findStoryblokEstimation } from "../gateways/storyblok/find/findEstimation";

interface NotifyEstimationOpenedCommand {
  appEnvironment: AppEnvironment;
  estimationSecret: string;
  ipAddress: string | null;
  storyblokReadClient: StoryblokClient;
  storyblokEnvironmentFolderName: string;
  slackWebhookUrl: string;
}

export const notifyEstimationOpened = async (
  command: NotifyEstimationOpenedCommand
) => {
  const findEstimationResult = await findStoryblokEstimation({
    client: command.storyblokReadClient,
    environmentFolderName: command.storyblokEnvironmentFolderName,
    secret: command.estimationSecret,
  });

  if (findEstimationResult.isError) {
    return findEstimationResult;
  }

  const notifyEstimationOpenedResult = slackNotifyEstimationOpened({
    appEnvironment: command.appEnvironment,
    estimationTitle:
      findEstimationResult.estimation?.content.title || "MISSING_TITLE",
    estimationOrganization:
      findEstimationResult.estimation?.content.organization ||
      "MISSING_ORGANIZATION",
    estimationSecret:
      findEstimationResult.estimation?.content.secret || "MISSING_SECRET",
    ipAddress: command.ipAddress || "MISSING_IP_ADDRESS",
    webhookUrl: command.slackWebhookUrl,
  });

  return notifyEstimationOpenedResult;
};
