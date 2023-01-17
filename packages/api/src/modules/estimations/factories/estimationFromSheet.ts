import { EstimationContent } from "storyblok-types";
import { EstimationSheet } from "../gateways/sheets/parse/types";

export const estimationFromSheet = (
  name: string,
  sheet: EstimationSheet
): EstimationContent => ({
  component: "Estimation",
  title: name,
  sections: sheet.sections.map((section) => ({
    component: "EstimationSection",
    title: section.title,
    description: {
      type: "doc",
      content: section.description
        .split("\n")
        .filter((paragraph: string) => !!paragraph)
        .map((paragraph: string) => ({
          type: "paragraph",
          content: [{ text: paragraph, type: "text" }],
        })),
    },
    rows: section.rows.map((row) => ({
      component: "EstimationSectionRow",
      task: {
        type: "doc",
        content: row.task
          .split("\n")
          .filter((paragraph: string) => !!paragraph)
          .map((paragraph: string) => ({
            type: "paragraph",
            content: [{ text: paragraph, type: "text" }],
          })),
      },
      description: {
        type: "doc",
        content: row.description
          .split("\n")
          .filter((paragraph: string) => !!paragraph)
          .map((paragraph: string) => ({
            type: "paragraph",
            content: [{ text: paragraph, type: "text" }],
          })),
      },
      optimisticDays: row.optimisticDays ?? 0,
      nominalDays: row.nominalDays ?? 0,
      pessimisticDays: row.pessimisticDays ?? 0,
    })),
  })),
});
