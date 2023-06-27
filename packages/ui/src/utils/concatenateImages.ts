import {
  ClipboardImageContent,
  StoryblockAssetContent,
} from "@md/storyblok-types";

export const concatenateImages = (
  clipboardImages: ClipboardImageContent["images"],
  regularImages: StoryblockAssetContent[]
) => {
  const convertedRegularImages: ClipboardImageContent["images"] =
    regularImages.map((image) => ({ alt: image.alt, url: image.filename }));
  return [...convertedRegularImages, ...clipboardImages];
};
