import { HStack, Text } from "native-base";
import React from "react";
import { StoryblockRichTextContent } from "storyblok-types";
import { RichTextResolver } from "./RichTextResolver";
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";

export interface EstimationRowHeaderProps {
  nominalDays: number;
  order: string | number;
  text: StoryblockRichTextContent;
  isHighlighted?: boolean;
  wrapperProps?: IHStackProps;
}

export const EstimationRowHeader: React.FC<EstimationRowHeaderProps> = ({
  nominalDays,
  order,
  text,
  isHighlighted = false,
  wrapperProps = {},
}) => {
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
        <Text>{order}</Text>
        <RichTextResolver richText={text} />
      </HStack>
      <Text flexBasis={"auto"}>{nominalDays} days</Text>
    </HStack>
  );
};
