import type { ISbRichtext } from "storyblok-js-client";

export interface StoryblockRichTextContent {
  type: string;
  content: Array<{ type: string; content: ISbRichtext[] }>;
}
