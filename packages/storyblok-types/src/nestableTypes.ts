import type {
  StoryblockAssetContent,
  StoryblockRichTextContent,
} from "./internalTypes";

export interface EstimationSectionContent {
  _uid?: string;
  rows: EstimationRowContent[];
  title: string;
  description: StoryblockRichTextContent;
  component: "EstimationSection";
  _editable?:string;
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
  images?: StoryblockAssetContent[];
  _editable?:string;
}
