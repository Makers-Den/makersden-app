import { ISbRichtext } from "storyblok-js-client";

import type {
  StoryblockAssetContent,
  StoryblockRichTextContent,
} from "./internalTypes";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BlockComponent = (props: any) => JSX.Element;

/**
 * The types of components/blocks we support.
 * The are usually in the 'body' field of a page.
 */
export type ComponentBlockType = "RichTextContent" | "SOWEstimationSection";

export interface RichTextContentContent {
  _uid?: string;
  text: ISbRichtext;
  component: "RichTextContent";
  _editable?: string;
}

export interface SOWEstimationSectionContent {
  _uid?: string;
  estimation: EstimationSectionContent;
  component: "SOWEstimationSection";
  _editable?: string;
}

export interface EstimationContent {
  _uid?: string;
  title: string;
  organization: string;
  description: StoryblockRichTextContent;
  secret: string;
  sections: EstimationSectionContent[];
  loomVideo?: string;
  component: "Estimation";
}

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
  nominalDays: number;
  optimisticDays: number;
  pessimisticDays: number;
  images?: StoryblockAssetContent[];
  _editable?: string;
}
