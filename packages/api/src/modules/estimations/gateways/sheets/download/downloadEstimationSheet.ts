import { GaxiosResponse } from "gaxios";
import { sheets_v4 } from "googleapis";
import { EstimationSheetDownloadResult } from "./types";

const BATCH_SIZE = 40;
const BATCH_ARRAY = Object.freeze(new Array(BATCH_SIZE).fill(0));
const DESCRIPTION_ROW_INDEX = 2;

const isRowEmpty = (
  row: unknown[][] | undefined | null
): row is undefined | null => !row;

export const downloadEstimationSheet = async (
  sheetsClient: sheets_v4.Sheets,
  spreadsheetId: string
): Promise<EstimationSheetDownloadResult> => {
  let hasMoreRows = true;
  let rows: unknown[][] = [];
  let rangeStart = 1;
  let emptySpreadsheetRowIndex: number | null = null;

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

    const batchRows = batchSpreadsheetResponse.data.valueRanges!.flatMap(
      (valueRange) => valueRange.values
    );

    const processedBatchRows: unknown[][] = [];

    for (
      let loopRowIndex = 0;
      loopRowIndex < batchRows.length;
      loopRowIndex += 1
    ) {
      const spreadsheetRowIndex = rangeStart + loopRowIndex;
      const currentBatchRow = batchRows[loopRowIndex];

      if (!isRowEmpty(currentBatchRow)) {
        processedBatchRows.push(currentBatchRow);
        continue;
      }

      const isDescriptionRow = spreadsheetRowIndex === DESCRIPTION_ROW_INDEX;
      if (isDescriptionRow) {
        processedBatchRows.push([]);
        continue;
      }

      const wasPreviousRowEmpty =
        emptySpreadsheetRowIndex === spreadsheetRowIndex - 1;
      if (wasPreviousRowEmpty) {
        hasMoreRows = false;
        break;
      }

      emptySpreadsheetRowIndex = spreadsheetRowIndex;
    }

    rows.push(...processedBatchRows);

    if (hasMoreRows) {
      rangeStart += BATCH_SIZE;
    }
  }

  return {
    isError: false,
    rows,
  };
};
