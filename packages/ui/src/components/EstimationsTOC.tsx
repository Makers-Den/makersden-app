import { Box, Heading, HStack, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { SectionsData } from "../utils/mapEstimationData";

export type SectionLinkData = { sectionIndex: number; key?: string };

export type EstimationsTOCProps = {
  title: string;
  sectionsData: SectionsData;
  onSectionLinkClick: (args: SectionLinkData) => void;
};

export function EstimationsTOC({
  title,
  sectionsData,
  onSectionLinkClick,
}: EstimationsTOCProps) {
  function sectionLinkHandler(args: SectionLinkData) {
    return () => onSectionLinkClick(args);
  }
  return (
    <Box>
      <HStack
        minH={16}
        px={4}
        space={2}
        py={2}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Heading size={"xs"}>{title}</Heading>
      </HStack>
      <HStack
        px={3}
        minH={12}
        bg="darkBlue.400"
        py={2}
        justifyContent="flex-start"
        alignItems={"center"}
        borderWidth="0.5"
        borderColor={"gray.400"}
        borderRadius="sm"
      >
        <Text fontSize="md" color="green.400">
          TABLE OF CONTENTS
        </Text>
      </HStack>
      <Box px={4} py={2}>
        {sectionsData.map(
          ({ title, nominalDaysSum, listIndex, key }, sectionIndex) => {
            return (
              <TouchableOpacity
                key={key}
                onPress={sectionLinkHandler({ sectionIndex, key })}
              >
                <HStack
                  px={2}
                  py={1}
                  minH={6}
                  justifyContent="space-between"
                  alignItems={"center"}
                  my={2}
                >
                  <HStack flexBasis={"70%"}>
                    <Text color={"green.400"}>{listIndex}. </Text>
                    <Text color={"green.400"} underline>
                      {title}
                    </Text>
                  </HStack>
                  <Text flexBasis={"auto"}>{nominalDaysSum} days</Text>
                </HStack>
              </TouchableOpacity>
            );
          }
        )}
      </Box>
    </Box>
  );
}
