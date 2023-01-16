import {
  estimatedRowToEstimationSheetRow,
  notEstimatedRowToEstimationSheetRow,
  sectionHeaderRowToEstimationSheetSection,
} from "./mappers";
import {
  estimatedRowSchema,
  notEstimatedRowSchema,
  sectionHeaderRowSchema,
} from "./schemas";
import { EstimationSheetParseResult, EstimationSheetSection } from "./types";

type FiveColumnRow = [unknown, unknown, unknown, unknown, unknown];

export const parseEstimationSheet = (
  rows: unknown[][]
): EstimationSheetParseResult => {
  const rowsWithoutMetaRows = rows.slice(1, -1);
  if (rowsWithoutMetaRows.length === 0) {
    return { isError: true, error: { type: "EMPTY_SHEET" } };
  }

  const fiveColumnRows: FiveColumnRow[] = rowsWithoutMetaRows.map(
    (row) =>
      [
        ...row,
        ...new Array(Math.max(5 - row.length, 0)).fill(null),
      ] as FiveColumnRow
  );

  const firstRow = fiveColumnRows[0];
  const parsedFirstRow = sectionHeaderRowSchema.safeParse(firstRow);
  if (!parsedFirstRow.success) {
    return {
      isError: true,
      error: { type: "FIRST_ROW_IS_NOT_SECTION_HEADER" },
    };
  }

  const firstSection = sectionHeaderRowToEstimationSheetSection(
    parsedFirstRow.data
  );

  const sections: EstimationSheetSection[] = [firstSection];
  let currentSection = firstSection;

  for (let i = 1; i < fiveColumnRows.length; i += 1) {
    const row = fiveColumnRows[i];

    const sectionHeaderRowParseResult = sectionHeaderRowSchema.safeParse(row);
    if (sectionHeaderRowParseResult.success) {
      const estimationSheetSection = sectionHeaderRowToEstimationSheetSection(
        sectionHeaderRowParseResult.data
      );
      sections.push(estimationSheetSection);
      currentSection = estimationSheetSection;
      continue;
    }

    const estimatedRowParseResult = estimatedRowSchema.safeParse(row);
    if (estimatedRowParseResult.success) {
      const estimationSheetRow = estimatedRowToEstimationSheetRow(
        estimatedRowParseResult.data
      );
      currentSection.rows.push(estimationSheetRow);
      continue;
    }

    const notEstimatedRowParseResult = notEstimatedRowSchema.safeParse(row);
    if (notEstimatedRowParseResult.success) {
      const estimationSheetRow = notEstimatedRowToEstimationSheetRow(
        notEstimatedRowParseResult.data
      );
      currentSection.rows.push(estimationSheetRow);
      continue;
    }

    return {
      isError: true,
      error: { type: "ROW_PARSE_FAILURE", row },
    };
  }

  return { isError: false, estimationSheet: { sections } };
};
