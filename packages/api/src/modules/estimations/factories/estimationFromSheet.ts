import { EstimationContent, StoryblockRichTextContent } from "storyblok-types";
import { EstimationSheet } from "../gateways/sheets/parse/types";

const richTextFromString = (s: string): StoryblockRichTextContent => ({
  type: "doc",
  content: s
    .split("\n")
    .filter((paragraph: string) => !!paragraph)
    .map((paragraph: string) => ({
      type: "paragraph",
      content: [{ text: paragraph, type: "text" }],
    })),
});

export const estimationFromSheet = (
  sheet: EstimationSheet,
  secret: string
): EstimationContent => ({
  component: "Estimation",
  title: sheet.title,
  description: richTextFromString(sheet.description),
  organization: sheet.organization,
  secret: secret,
  sections: sheet.sections.map((section) => ({
    component: "EstimationSection",
    title: section.title,
    description: richTextFromString(section.description),
    rows: section.rows.map((row) => ({
      component: "EstimationRow",
      task: richTextFromString(row.task),
      description: richTextFromString(row.description),
      isIncluded: row.isIncluded,
      optimisticDays: row.optimisticDays ?? 0,
      nominalDays: row.nominalDays ?? 0,
      pessimisticDays: row.pessimisticDays ?? 0,
      images: []
    })),
  })),
});
