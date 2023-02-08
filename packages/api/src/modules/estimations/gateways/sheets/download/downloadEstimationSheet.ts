import { GaxiosResponse } from "gaxios";
import { sheets_v4 } from "googleapis";

import { EstimationSheetDownloadResult } from "./types";

const BATCH_SIZE = 40;
const BATCH_ARRAY = Object.freeze(new Array(BATCH_SIZE).fill(0));

const isRowEmpty = (
  row: unknown[][] | undefined | null
): row is undefined | null => !row;

export const downloadEstimationSheet = async (
  sheetsClient: sheets_v4.Sheets,
  spreadsheetId: string
): Promise<EstimationSheetDownloadResult> => {
  let hasMoreRows = true;
  const rows: unknown[][] = [];
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

    const batchRows =
      batchSpreadsheetResponse.data.valueRanges?.flatMap(
        (valueRange) => valueRange.values
      ) ?? [];

    const processedBatchRows: unknown[][] = [];

    for (let i = 0; i < batchRows.length; i += 1) {
      const currentBatchRow = batchRows[i];

      if (isRowEmpty(currentBatchRow)) {
        const nextBatchRowIndex = i + 1;
        if (nextBatchRowIndex === batchRows.length) {
          break;
        }

        const nextBatchRow = batchRows[nextBatchRowIndex];
        if (isRowEmpty(nextBatchRow)) {
          break;
        }

        processedBatchRows.push([]);
        continue;
      }

      processedBatchRows.push(currentBatchRow);
    }

    rows.push(...processedBatchRows);

    if (processedBatchRows.length === BATCH_SIZE) {
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
