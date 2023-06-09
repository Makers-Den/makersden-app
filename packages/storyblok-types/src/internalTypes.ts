import type { ISbRichtext } from "storyblok-js-client";

export type StoryblockRichTextContent = ISbRichtext;

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
