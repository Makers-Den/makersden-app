export type EstimationSheetParseResult =
  | EstimationSheetParseErrorResult
  | EstimationSheetParseSuccessResult;

export interface EstimationSheetParseErrorResult {
  isError: true;
  error: EstimationSheetParseError;
}

export interface EstimationSheetParseSuccessResult {
  isError: false;
  estimationSheet: EstimationSheet;
}

export type EstimationSheetParseError =
  | EstimationSheetParseEmptySheetError
  | EstimationSheetParseFirstRowIsNotSectionHeaderError
  | EstimationSheetParseRowParseFailureError;

export interface EstimationSheetParseEmptySheetError {
  type: "EMPTY_SHEET";
}

export interface EstimationSheetParseFirstRowIsNotSectionHeaderError {
  type: "FIRST_ROW_IS_NOT_SECTION_HEADER";
}

export interface EstimationSheetParseRowParseFailureError {
  type: "ROW_PARSE_FAILURE";
  row: unknown[];
}

export interface EstimationSheet {
  sections: EstimationSheetSection[];
}

export interface EstimationSheetSection {
  title: string;
  description: string;
  rows: EstimationSheetRow[];
}

export interface EstimationSheetRow {
  task: string;
  description: string;
  nominalDays: number | null;
  optimisticDays: number | null;
  pessimisticDays: number | null;
}
