import type { StoryblockRichTextContent } from "./internalTypes";

export interface EstimationSectionContent {
  _uid?: string;
  rows: EstimationRowContent[];
  title: string;
  description: StoryblockRichTextContent;
  component: "EstimationSection";
}

export interface EstimationRowContent {
  _uid?: string;
  task: StoryblockRichTextContent;
  component: "EstimationRow";
  description: StoryblockRichTextContent;
  isIncluded: boolean;
  nominalDays: number;
  optimisticDays: number;
  pessimisticDays: number;
}
