export type EstimationSheetDownloadResult =
  | EstimationSheetDownloadErrorResult
  | EstimationSheetDownloadSuccessResult;

export interface EstimationSheetDownloadErrorResult {
  isError: true;
  error: EstimationSheetDownloadError;
}

export interface EstimationSheetDownloadSuccessResult {
  isError: false;
  rows: unknown[][];
}

export type EstimationSheetDownloadError =
  | EstimationSheetDownloadFetchRowsFailureError
  | EstimationSheetDownloadFetchSheetFailureError
  | EstimationSheetDownloadSheetNotFoundError;

export interface EstimationSheetDownloadFetchRowsFailureError {
  type: "FETCH_ROWS_FAILURE";
}

export interface EstimationSheetDownloadFetchSheetFailureError {
  type: "FETCH_SHEET_FAILURE";
}

export interface EstimationSheetDownloadSheetNotFoundError {
  type: "SHEET_NOT_FOUND";
}
