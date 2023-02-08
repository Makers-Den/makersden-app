import { Box,Stack, Text, useBreakpointValue } from "native-base";
import { IStackProps } from "native-base/lib/typescript/components/primitives/Stack/Stack";
import React from "react";
import {
  StoryblockAssetContent,
  StoryblockRichTextContent,
} from "@md/storyblok-types";

import { isRichTextEmpty } from "../utils/isRichTextEmpty";
import { EstimationImages } from "./EstimationImages";
import { RichTextResolver } from "./RichTextResolver";

export interface EstimationRowContentProps {
  images: StoryblockAssetContent[];
  description: StoryblockRichTextContent;
  wrapperProps?: IStackProps;
  onImageClick?: (imageIndex: number) => void;
}

export const EstimationRowContent: React.FC<EstimationRowContentProps> = ({
  description,
  images,
  onImageClick,
  wrapperProps = {},
}) => {
  const styles = useBreakpointValue({
    base: {
      imageWrapper: {},
      stack: { direction: "column", pb: 2 },
    },
    lg: {
      imageWrapper: { mr: 2 },
      stack: { direction: "row", pb: 4 },
    },
  });

  return (
    <Stack space={2} pt={2} {...styles.stack} {...wrapperProps}>
      {images.length > 0 && (
        <Box {...styles.imageWrapper}>
          <EstimationImages images={images} onImageClick={onImageClick} />
        </Box>
      )}
      {isRichTextEmpty(description) ? (
        <Text>No description available</Text>
      ) : (
        <RichTextResolver richText={description} />
      )}
    </Stack>
  );
};
