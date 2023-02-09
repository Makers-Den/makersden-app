import { Heading, HStack, Text, useBreakpointValue } from "native-base";
import { InterfaceHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import React from "react";

export type EstimationsSectionHeaderProps = {
  listIndex: string;
  title: string;
  nominalDaysSum: number;
} & InterfaceHStackProps;

export const EstimationsSectionHeader = ({
  listIndex,
  title,
  nominalDaysSum,
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
      <Heading
        bold
        color={"green.400"}
        flexBasis={"70%"}
        mt={0.5}
        {...styles.heading}
      >
        {listIndex}. {title.toUpperCase()}
      </Heading>
      <Text flexBasis={"auto"} mt={-1} {...styles.days}>
        {nominalDaysSum} days
      </Text>
    </HStack>
  );
};
