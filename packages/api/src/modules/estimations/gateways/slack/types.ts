export type SlackNotifyResult =
  | SlackNotifyResultErrorResult
  | SlackNotifyResultSuccessResult;

export interface SlackNotifyResultErrorResult {
  isError: true;
  error: SlackNotifyResultError;
}

export interface SlackNotifyResultSuccessResult {
  isError: false;
}

export type SlackNotifyResultError = SlackNotifyFailureFailureError;

export interface SlackNotifyFailureFailureError {
  type: "SLACK_NOTIFY_FAILURE";
}
