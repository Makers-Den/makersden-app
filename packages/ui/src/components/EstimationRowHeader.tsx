import { StoryblockRichTextContent } from "@md/storyblok-types";
import { HStack, Text, useBreakpointValue } from "native-base";
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import React from "react";

import { RichTextResolver } from "./RichTextResolver";

export interface EstimationRowHeaderProps {
  nominalDays: number;
  order: string | number;
  text: StoryblockRichTextContent;
  isIncluded: boolean;
  isHighlighted?: boolean;
  wrapperProps?: IHStackProps;
}

export const EstimationRowHeader: React.FC<EstimationRowHeaderProps> = ({
  nominalDays,
  order,
  text,
  isIncluded,
  isHighlighted = false,
  wrapperProps = {},
}) => {
  const textStyles = useBreakpointValue({
    base: {
      fontSize: "sm",
    },
    lg: {
      fontSize: "md",
    },
  });

  return (
    <HStack
      minH={10}
      space={3}
      py={2}
      justifyContent="space-between"
      alignItems={"center"}
      bg={isHighlighted ? "black.100" : undefined}
      {...wrapperProps}
    >
      <HStack space={2} flexBasis={"60%"}>
        <Text {...textStyles}>{order}.</Text>
        <RichTextResolver richText={text} textProps={textStyles} />
      </HStack>
      <Text flexBasis={"auto"} strikeThrough={!isIncluded} {...textStyles}>
        {nominalDays} days
      </Text>
    </HStack>
  );
};
