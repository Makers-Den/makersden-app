import { StoryblockRichTextContent } from "@md/storyblok-types";

export const isRichTextEmpty = (richText: StoryblockRichTextContent) =>
  richText.content ? richText.content.length <= 0 : true;
