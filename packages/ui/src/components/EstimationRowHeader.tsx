import { StoryblockRichTextContent } from "@md/storyblok-types";
import { HStack, Text, useBreakpointValue } from "native-base";
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import React from "react";

import { RichTextResolver } from "./RichTextResolver";

export interface EstimationRowHeaderProps {
  expectedDays: number;
  order: string | number;
  text: StoryblockRichTextContent;
  isIncluded: boolean;
  isHighlighted?: boolean;
  wrapperProps?: IHStackProps;
  variant?: "sow" | "details";
}

export const EstimationRowHeader = ({
  expectedDays,
  order,
  text,
  isIncluded,
  isHighlighted = false,
  wrapperProps = {},
  variant = "details",
}: EstimationRowHeaderProps) => {
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
        <Text color={variant === "details" ? "white" : "black"} {...textStyles}>
          {order}.
        </Text>
        <RichTextResolver
          richText={text}
          textProps={{
            ...textStyles,
            color: variant === "details" ? "white" : "black",
          }}
        />
      </HStack>

      <Text
        color={variant === "details" ? "white" : "black"}
        flexBasis={"auto"}
        strikeThrough={!isIncluded}
        {...textStyles}
      >
        {expectedDays} days
      </Text>
    </HStack>
  );
};
