export type EstimationSheetDownloadResult =
  | EstimationSheetDownloadErrorResult
  | EstimationSheetDownloadSuccessResult;

export interface EstimationSheetDownloadErrorResult {
  isError: true;
  error: EstimationSheetDownloadFetchRowsFailureError;
}

export interface EstimationSheetDownloadSuccessResult {
  isError: false;
  rows: unknown[][];
}

export type EstimationSheetDownloadError =
  EstimationSheetDownloadFetchRowsFailureError;

export interface EstimationSheetDownloadFetchRowsFailureError {
  type: "FETCH_ROWS_FAILURE";
}
