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
  optimisticDays: row[2],
  nominalDays: row[3],
  pessimisticDays: row[4],
});

export const notEstimatedRowToEstimationSheetRow = (
  row: NotEstimatedRow
): EstimationSheetRow => ({
  task: row[0],
  description: row[1] || "",
  optimisticDays: null,
  nominalDays: null,
  pessimisticDays: null,
});
