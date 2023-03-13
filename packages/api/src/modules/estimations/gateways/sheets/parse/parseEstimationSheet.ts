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
const ROW_START_INDEX = 1;

export const parseEstimationSheet = (
  rows: unknown[][]
): EstimationSheetParseResult => {
  const filledRows = rows.map((row) => [
    ...row,
    ...new Array(Math.max(COLUMN_COUNT - row.length, 0)).fill(null),
  ]);

  const primaryHeaderRow = filledRows[0];
  const parsedPrimaryHeaderRow =
    primaryHeaderRowSchema.safeParse(primaryHeaderRow);
  if (!parsedPrimaryHeaderRow.success) {
    return {
      isError: true,
      error: {
        type: "ROW_PARSE_FAILURE",
        row: primaryHeaderRow,
        rowIndex: ROW_START_INDEX + 0,
        zodError: parsedPrimaryHeaderRow.error,
        message: "The estimation name/estimation company row is invalid",
      },
    };
  }

  const secondaryHeaderRow = filledRows[1];
  const parsedSecondaryHeaderRow =
    secondaryHeaderRowSchema.safeParse(secondaryHeaderRow);
  if (!parsedSecondaryHeaderRow.success) {
    return {
      isError: true,
      error: {
        type: "ROW_PARSE_FAILURE",
        row: secondaryHeaderRow,
        rowIndex: ROW_START_INDEX + 1,
        zodError: parsedSecondaryHeaderRow.error,
        message: "The estimation description row is invalid",
      },
    };
  }

  const firstSectionRow = filledRows[3];
  const parsedFirstSectionRow =
    sectionHeaderRowSchema.safeParse(firstSectionRow);
  if (!parsedFirstSectionRow.success) {
    return {
      isError: true,
      error: {
        type: "ROW_PARSE_FAILURE",
        row: firstSectionRow,
        rowIndex: ROW_START_INDEX + 3,
        zodError: parsedFirstSectionRow.error,
        message: "The first section row is invalid",
      },
    };
  }

  const firstSection = sectionHeaderRowToEstimationSheetSection(
    parsedFirstSectionRow.data
  );

  const sections: EstimationSheetSection[] = [firstSection];
  let currentSection = firstSection;

  for (let i = 4; i < filledRows.length - 1; i += 1) {
    const row = filledRows[i];

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
      error: {
        type: "ROW_PARSE_FAILURE",
        row,
        rowIndex: ROW_START_INDEX + i,
        message: "Row doesn't match any of the currently supported row schemas",
      },
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
