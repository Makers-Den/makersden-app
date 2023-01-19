import { GaxiosResponse } from "gaxios";
import { sheets_v4 } from "googleapis";
import { EstimationSheetDownloadResult } from "./types";

const BATCH_SIZE = 40;
const BATCH_ARRAY = Object.freeze(new Array(BATCH_SIZE).fill(0));

const getSheetTitle = async (
  sheetsClient: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetId: number
) => {
  try {
    const spreadsheet = await sheetsClient.spreadsheets.get({
      spreadsheetId: spreadsheetId,
    });

    const sheet = spreadsheet.data.sheets?.find(
      (sheet) => sheet?.properties?.sheetId === sheetId
    );

    if (!sheet) {
      return {
        isError: true,
        error: {
          type: "SHEET_NOT_FOUND",
        },
      } as const;
    }

    return {
      isError: false,
      sheetTitle: sheet.properties?.title || "",
    } as const;
  } catch (e) {
    return {
      isError: true,
      error: {
        type: "FETCH_SHEET_FAILURE",
      },
    } as const;
  }
};

export const downloadEstimationSheet = async (
  sheetsClient: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetId: number
): Promise<EstimationSheetDownloadResult> => {
  const getSheetTitleResult = await getSheetTitle(
    sheetsClient,
    spreadsheetId,
    sheetId
  );

  if (getSheetTitleResult.isError === true) {
    return getSheetTitleResult;
  }

  let hasMoreRows = true;
  let rows: unknown[][] = [];
  let rangeStart = 1;

  while (hasMoreRows) {
    const ranges = BATCH_ARRAY.map((_, index) => rangeStart + index).map(
      (rowIndex) =>
        `${getSheetTitleResult.sheetTitle}!A${rowIndex}:E${rowIndex}`
    );

    let batchSpreadsheetResponse: GaxiosResponse<sheets_v4.Schema$BatchGetValuesResponse>;

    try {
      batchSpreadsheetResponse =
        await sheetsClient.spreadsheets.values.batchGet({
          spreadsheetId,
          ranges,
          valueRenderOption: "UNFORMATTED_VALUE",
        });
    } catch (e) {
      console.error(e);

      return {
        isError: true,
        error: {
          type: "FETCH_ROWS_FAILURE",
        },
      };
    }

    const batchRows = batchSpreadsheetResponse.data.valueRanges
      .flatMap((valueRange) => valueRange.values)
      .filter((batchRow) => batchRow !== undefined);

    rows.push(...batchRows);

    if (batchRows.length === BATCH_SIZE) {
      rangeStart += BATCH_SIZE;
    } else {
      hasMoreRows = false;
    }
  }

  return {
    isError: false,
    rows,
  };
};
