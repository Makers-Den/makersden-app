import { ImageContent, StoryblockAssetContent } from "@md/storyblok-types";

export const concatenateImages = (
  clipboardImages: ImageContent[],
  regularImages: StoryblockAssetContent[]
) => {
  const convertedRegularImages: ImageContent[] = regularImages.map((image) => ({
    alt: image.alt,
    url: image.filename,
  }));
  return [...convertedRegularImages, ...clipboardImages];
};
