import {
  estimatedRowToEstimationSheetRow,
  notEstimatedRowToEstimationSheetRow,
  sectionHeaderRowToEstimationSheetSection,
} from "./mappers";
import {
  estimatedRowSchema,
  notEstimatedRowSchema,
  primaryHeaderRowSchema,
  secondaryHeaderRowSchema,
  sectionHeaderRowSchema,
} from "./schemas";
import { EstimationSheetParseResult, EstimationSheetSection } from "./types";

const COLUMN_COUNT = 6;
type NColumnRow = [unknown, unknown, unknown, unknown, unknown];

export const parseEstimationSheet = (
  rows: unknown[][]
): EstimationSheetParseResult => {
  const nColumnRows: NColumnRow[] = rows.map(
    (row) =>
      [
        ...row,
        ...new Array(Math.max(COLUMN_COUNT - row.length, 0)).fill(null),
      ] as NColumnRow
  );

  const primaryHeaderRow = nColumnRows[0];
  const parsedPrimaryHeaderRow =
    primaryHeaderRowSchema.safeParse(primaryHeaderRow);
  if (!parsedPrimaryHeaderRow.success) {
    return {
      isError: true,
      error: { type: "ROW_PARSE_FAILURE", row: primaryHeaderRow },
    };
  }

  const secondaryHeaderRow = nColumnRows[1];
  const parsedSecondaryHeaderRow =
    secondaryHeaderRowSchema.safeParse(secondaryHeaderRow);
  if (!parsedSecondaryHeaderRow.success) {
    return {
      isError: true,
      error: { type: "ROW_PARSE_FAILURE", row: secondaryHeaderRow },
    };
  }

  const firstSectionRow = nColumnRows[3];
  const parsedFirstSectionRow =
    sectionHeaderRowSchema.safeParse(firstSectionRow);
  if (!parsedFirstSectionRow.success) {
    return {
      isError: true,
      error: { type: "ROW_PARSE_FAILURE", row: firstSectionRow },
    };
  }

  const firstSection = sectionHeaderRowToEstimationSheetSection(
    parsedFirstSectionRow.data
  );

  const sections: EstimationSheetSection[] = [firstSection];
  let currentSection = firstSection;

  for (let i = 4; i < nColumnRows.length - 1; i += 1) {
    const row = nColumnRows[i];

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

  return {
    isError: false,
    estimationSheet: {
      sections,
      description: parsedSecondaryHeaderRow.data[0] || "",
      organization: parsedPrimaryHeaderRow.data[1],
      title: parsedPrimaryHeaderRow.data[0],
    },
  };
};
