import { GaxiosResponse } from "gaxios";
import { sheets_v4 } from "googleapis";
import { EstimationSheetDownloadResult } from "./types";

const BATCH_SIZE = 40;
const BATCH_ARRAY = Object.freeze(new Array(BATCH_SIZE).fill(0));

export const downloadEstimationSheet = async (
  sheetsClient: sheets_v4.Sheets,
  spreadsheetId: string
): Promise<EstimationSheetDownloadResult> => {
  let hasMoreRows = true;
  let rows: unknown[][] = [];
  let rangeStart = 1;

  while (hasMoreRows) {
    const ranges = BATCH_ARRAY.map((_, index) => rangeStart + index).map(
      (rowIndex) => `A${rowIndex}:F${rowIndex}`
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
