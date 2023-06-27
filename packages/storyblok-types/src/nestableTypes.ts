import { ISbRichtext, ISbStoryData } from "storyblok-js-client";

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
export type ComponentBlockType = "RichTextContent" | "SoWEstimationSection";

export interface RichTextContentContent {
  _uid?: string;
  text: ISbRichtext;
  component: "RichTextContent";
  _editable?: string;
}

export interface SoWEstimationSectionContent {
  _uid?: string;
  estimation: ISbStoryData<EstimationContent>;
  component: "SoWEstimationSection";
  _editable?: string;
}

export interface CardContent {
  _uid?: string;
  title: string;
  subTitle: string;
  image?: StoryblockAssetContent;
  body: ISbRichtext;
  component: "Card";
  _editable?: string;
}

export interface CardSectionContent {
  _uid?: string;
  cards: CardContent[];
  component: "CardSection";
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
  //fields of type 'Number' in storyblok are returned as string anyway
  nominalDays: number | string;
  optimisticDays: number | string;
  pessimisticDays: number | string;
  images?: StoryblockAssetContent[];
  clipboardImages?: ClipboardImageContent;
  _editable?: string;
}

export interface ClipboardImageContent {
  _uid: string;
  images: {
    alt: string;
    url: string;
  }[];
}
