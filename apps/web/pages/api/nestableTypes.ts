import type { StoryblockRichTextContent } from "./internalTypes";

export interface EstimationSectionContent {
  _uid: string;
  rows: EstimationSectionRowContent[];
  title: string;
  component: "EstimationSection";
}

export interface EstimationSectionRowContent {
  _uid: string;
  task: StoryblockRichTextContent;
  component: "EstimationSectionRow";
  description: StoryblockRichTextContent;
  nominalDays: string;
  optimisticDays: string;
  pessimisticDays: string;
}
