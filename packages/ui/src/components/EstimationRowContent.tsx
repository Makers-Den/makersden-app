import {
  PastableImageContent,
  StoryblockRichTextContent,
} from "@md/storyblok-types";
import { Box, Stack, Text, useBreakpointValue } from "native-base";
import { IStackProps } from "native-base/lib/typescript/components/primitives/Stack/Stack";
import React from "react";

import { isRichTextEmpty } from "../utils/isRichTextEmpty";
import { EstimationImages } from "./EstimationImages";
import { RichTextResolver } from "./RichTextResolver";

export interface EstimationRowContentProps {
  images?: PastableImageContent["images"];
  description: StoryblockRichTextContent;
  wrapperProps?: IStackProps;
  imageWrapperProps?: IStackProps;
  variant?: "sow" | "details";
  onImageClick?: (imageIndex: number) => void;
}

export const EstimationRowContent = ({
  description,
  images,
  onImageClick,
  variant = "details",
  wrapperProps = {},
  imageWrapperProps = {},
}: EstimationRowContentProps) => {
  const styles = useBreakpointValue({
    base: {
      imageWrapper: imageWrapperProps,
      stack: { direction: "column", pb: 2 },
    },
    lg: {
      imageWrapper: { mr: 2, ...imageWrapperProps },
      stack: { direction: "row", pb: 4 },
    },
  });
  console.log({ images });
  return (
    <Stack space={2} pt={2} {...styles.stack} {...wrapperProps}>
      {images && images.length > 0 && (
        <Box {...styles.imageWrapper}>
          <EstimationImages images={images} onImageClick={onImageClick} />
        </Box>
      )}
      {isRichTextEmpty(description) ? (
        <Text color={variant === "details" ? "white" : "black"}>
          No description available
        </Text>
      ) : (
        <Box flexGrow={1} flexShrink={1}>
          <RichTextResolver
            richText={description}
            textProps={{
              fontSize: "sm",
              color: variant === "details" ? "white" : "black",
            }}
          />
        </Box>
      )}
    </Stack>
  );
};
