export type EstimationCreateResult =
  | EstimationCreateErrorResult
  | EstimationCreateSuccessResult;

export interface EstimationCreateErrorResult {
  isError: true;
  error: EstimationCreateError;
}

export interface EstimationCreateSuccessResult {
  isError: false;
}

export type EstimationCreateError = EstimationCreateFailureError;

export interface EstimationCreateFailureError {
  type: "CREATE_ESTIMATION_FAILURE";
}
