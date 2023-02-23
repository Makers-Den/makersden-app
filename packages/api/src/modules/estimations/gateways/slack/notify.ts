import { AppEnvironment } from "../../../shared/types";
import { SlackNotifyResult } from "./types";

interface NotifyCommand {
  appEnvironment: AppEnvironment;
  text: string;
  webhookUrl: string;
}

export const notify = async (
  command: NotifyCommand
): Promise<SlackNotifyResult> => {
  const finalText = `[${command.appEnvironment}]\n\n${command.text}`;

  try {
    const response = await fetch(command.webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: finalText }),
    });

    if (response.status !== 200) {
      return { isError: true, error: { type: "SLACK_NOTIFY_FAILURE" } };
    }

    return { isError: false };
  } catch (e) {
    console.error(e);

    return { isError: true, error: { type: "SLACK_NOTIFY_FAILURE" } };
  }
};
