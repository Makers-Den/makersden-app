import { Box, Heading, HStack, Text, useBreakpointValue } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { StoryblockRichTextContent } from "storyblok-types";
import { Sections } from "../utils/mapEstimationData";
import { RichTextResolver } from "./RichTextResolver";

export type SectionLinkData = { sectionIndex: number; key?: string };

export type EstimationsTOCProps = {
  title: string;
  description: StoryblockRichTextContent;
  sections: Sections;
  onSectionLinkClick: (args: SectionLinkData) => void;
};

export function EstimationsTOC({
  title,
  description,
  sections,
  onSectionLinkClick,
}: EstimationsTOCProps) {
  const styles = useBreakpointValue({
    base: {
      description: {
        fontSize: "sm",
      },
      heading: {
        fontSize: "md",
      },
      item: {
        fontSize: "sm",
      },
      mainHeading: {
        fontSize: "md",
      },
    },
    lg: {
      description: {
        fontSize: "sm",
      },
      heading: {
        fontSize: "md",
      },
      item: {
        fontSize: "md",
      },
      mainHeading: {
        fontSize: "lg",
      },
    },
  });

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
        <Heading {...styles.heading}>{title}</Heading>
      </HStack>
      {description && (
        <Box px={4} mb={4}>
          <RichTextResolver
            richText={description}
            textProps={styles.description}
          />
        </Box>
      )}
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
        <Text color="green.400" {...styles.mainHeading}>
          TABLE OF CONTENTS
        </Text>
      </HStack>
      <Box px={4} py={2}>
        {sections.map(
          ({ title, expectedDays, listIndex, key }, sectionIndex) => {
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
                    <Text color={"green.400"} {...styles.item}>
                      {listIndex}.{" "}
                    </Text>
                    <Text color={"green.400"} underline {...styles.item}>
                      {title}
                    </Text>
                  </HStack>
                  <Text flexBasis={"auto"} {...styles.item}>
                    {expectedDays} days
                  </Text>
                </HStack>
              </TouchableOpacity>
            );
          }
        )}
      </Box>
    </Box>
  );
}
