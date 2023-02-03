import { HStack, Text } from "native-base";
import { InterfaceHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import React from "react";

export type EstimationsSectionHeaderProps = {
  listIndex: string;
  title: string;
  nominalDaysSum: number;
} & InterfaceHStackProps;

export function EstimationsSectionHeader({
  listIndex,
  title,
  nominalDaysSum,
  ...wrapperProps
}: EstimationsSectionHeaderProps) {
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
      <Text fontSize="md" bold color={"green.400"} flexBasis={"70%"}>
        {listIndex}. {title.toUpperCase()}
      </Text>
      <Text flexBasis={"auto"} fontSize="md">
        {nominalDaysSum} days
      </Text>
    </HStack>
  );
}
