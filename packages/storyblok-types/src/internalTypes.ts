import type { ISbRichtext } from "storyblok-js-client";

export interface StoryblockRichTextContent {
  type: string;
  content: Array<{ type: string; content: ISbRichtext[] }>;
}

export interface StoryblockAssetContent {
  id: number;
  alt: string;
  name: string;
  focus: string;
  title: string;
  filename: string;
  copyright: string;
  fieldtype: "asset";
}
