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
  _editable?: string;
}

export interface EstimationRowContent {
  _uid?: string;
  task: StoryblockRichTextContent;
  component: "EstimationRow";
  description: StoryblockRichTextContent;
  isIncluded: boolean;
  //fields of type 'Number' in storyblok are returned as string anyway
  nominalDays: number | string;
  optimisticDays: number | string;
  pessimisticDays: number | string;
  images?: StoryblockAssetContent[];
  _editable?: string;
}
