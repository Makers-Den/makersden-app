import { EstimationSheetRow, EstimationSheetSection } from "./types";
import { EstimatedRow, NotEstimatedRow, SectionHeaderRow } from "./schemas";

export const sectionHeaderRowToEstimationSheetSection = (
  row: SectionHeaderRow
): EstimationSheetSection => ({
  title: row[0],
  description: row[1] || "",
  rows: [],
});

export const estimatedRowToEstimationSheetRow = (
  row: EstimatedRow
): EstimationSheetRow => ({
  task: row[0],
  description: row[1] || "",
  isIncluded: row[2] === "x",
  optimisticDays: row[3],
  nominalDays: row[4],
  pessimisticDays: row[5],
});

export const notEstimatedRowToEstimationSheetRow = (
  row: NotEstimatedRow
): EstimationSheetRow => ({
  task: row[0],
  description: row[1] || "",
  isIncluded: row[2] === "x",
  optimisticDays: null,
  nominalDays: null,
  pessimisticDays: null,
});
