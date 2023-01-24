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
  EstimationSheetParseRowParseFailureError;

export interface EstimationSheetParseRowParseFailureError {
  type: "ROW_PARSE_FAILURE";
  row: unknown[];
}

export interface EstimationSheet {
  title: string;
  description: string;
  organization: string;
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
  isIncluded: boolean;
  nominalDays: number | null;
  optimisticDays: number | null;
  pessimisticDays: number | null;
}
