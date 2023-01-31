import React from "react";
import { VStack, Text } from "native-base";
import { IVStackProps } from "native-base/lib/typescript/components/primitives/Stack/VStack";
import { EstimationImages } from "./EstimationImages";
import {
  StoryblockAssetContent,
  StoryblockRichTextContent,
} from "storyblok-types";
import { isRichTextEmpty } from "../utils/isRichTextEmpty";
import { RichTextResolver } from "./RichTextResolver";

export interface EstimationRowContentProps {
  images: StoryblockAssetContent[];
  description: StoryblockRichTextContent;
  wrapperProps?: IVStackProps;
}

export const EstimationRowContent: React.FC<EstimationRowContentProps> = ({
  description,
  images,
  wrapperProps = {},
}) => {
  return (
    <VStack space={2} py={2} {...wrapperProps}>
      {images.length > 0 && <EstimationImages images={images} />}
      {isRichTextEmpty(description) ? (
        <Text>No description available</Text>
      ) : (
        <RichTextResolver richText={description} />
      )}
    </VStack>
  );
};
