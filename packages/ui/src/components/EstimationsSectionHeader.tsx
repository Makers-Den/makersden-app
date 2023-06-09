import { Flex, Heading, HStack, Text, useBreakpointValue } from "native-base";
import { InterfaceHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import React, { useState } from "react";

export type EstimationsSectionHeaderProps = {
  listIndex: string;
  title: string;
  optimisticDays: number;
  nominalDays: number;
  pessimisticDays: number;
  expectedDays: number;
  variant?: "sow" | "details";
} & InterfaceHStackProps;

export const EstimationsSectionHeader = ({
  listIndex,
  title,
  expectedDays,
  nominalDays,
  optimisticDays,
  pessimisticDays,
  variant = "details",
  ...wrapperProps
}: EstimationsSectionHeaderProps) => {
  const styles = useBreakpointValue({
    base: { days: { fontSize: "md" }, heading: { fontSize: "lg" } },
    lg: { days: { fontSize: "md" }, heading: { fontSize: "xl" } },
  });

  return (
    <HStack
      px={3}
      minH={12}
      bg={variant === "details" ? "darkBlue.400" : "white"}
      justifyContent="space-between"
      space={2}
      py={2}
      alignItems={"center"}
      borderWidth={variant === "details" ? 0.5 : 0}
      borderColor={"gray.400"}
      borderRadius="sm"
      {...wrapperProps}
    >
      <Heading
        bold
        color={variant === "details" ? "green.400" : "black"}
        flexBasis={"70%"}
        mt={0.5}
        {...styles.heading}
      >
        {listIndex}. {title.toUpperCase()}
      </Heading>

      <Flex direction="row" alignItems="flex-start">
        {variant === "sow" && (
          <HStack space="1" mr="2">
            <Flex alignItems="center">
              <Text fontSize="xs" color={"black"}>
                O: {optimisticDays}, N: {nominalDays}, P: {pessimisticDays}
              </Text>
            </Flex>
          </HStack>
        )}

        <Text
          flexBasis={"auto"}
          mt={-1}
          color={variant === "details" ? "white" : "black"}
          {...styles.days}
        >
          {expectedDays} days
        </Text>
      </Flex>
    </HStack>
  );
};
