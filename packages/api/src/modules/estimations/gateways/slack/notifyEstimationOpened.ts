import { AppEnvironment } from "../../../shared/types";
import { notify } from "./notify";
import { SlackNotifyResult } from "./types";

interface NotifyEstimationOpenedCommand {
  appEnvironment: AppEnvironment;
  estimationOrganization: string;
  estimationSecret: string;
  estimationTitle: string;
  ipAddress: string;
  webhookUrl: string;
}

export const notifyEstimationOpened = async (
  command: NotifyEstimationOpenedCommand
): Promise<SlackNotifyResult> =>
  notify({
    appEnvironment: command.appEnvironment,
    text: `${command.estimationTitle} for ${command.estimationOrganization} (${command.estimationSecret}) has been opened from IP ${command.ipAddress}`,
    webhookUrl: command.webhookUrl,
  });
