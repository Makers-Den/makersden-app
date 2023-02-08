import { HStack, Text, useBreakpointValue } from "native-base";
import { InterfaceHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import React from "react";

export type EstimationsSectionHeaderProps = {
  listIndex: string;
  title: string;
  expectedDays: number;
} & InterfaceHStackProps;

export const EstimationsSectionHeader = ({
  listIndex,
  title,
  expectedDays,
  ...wrapperProps
}: EstimationsSectionHeaderProps) => {
  const textStyles = useBreakpointValue({
    base: { fontSize: "md" },
    lg: { fontSize: "lg" },
  });

  return (
    <HStack
      px={3}
      minH={12}
      bg="darkBlue.400"
      justifyContent="space-between"
      space={2}
      py={2}
      alignItems={"center"}
      borderWidth="0.5"
      borderColor={"gray.400"}
      borderRadius="sm"
      {...wrapperProps}
    >
      <Text bold color={"green.400"} flexBasis={"70%"} {...textStyles}>
        {listIndex}. {title.toUpperCase()}
      </Text>
      <Text flexBasis={"auto"} {...textStyles}>
        {expectedDays} days
      </Text>
    </HStack>
  );
};
