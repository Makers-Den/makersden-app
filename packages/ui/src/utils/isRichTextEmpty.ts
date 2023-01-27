import { StoryblockRichTextContent } from "storyblok-types";

export function isRichTextEmpty(richText: StoryblockRichTextContent) {
  return richText.content.length <= 0;
}
