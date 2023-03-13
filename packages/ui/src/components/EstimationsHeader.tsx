import { StoryblockRichTextContent } from "@md/storyblok-types";
import { Box, Heading, HStack, Text, useBreakpointValue } from "native-base";
import React, { ReactNode } from "react";
import { TouchableOpacity } from "react-native";

import { Sections } from "../utils/useMapEstimationData";
import { RichTextResolver } from "./RichTextResolver";

export type SectionLinkData = { sectionIndex: number; key?: string };

export type EstimationsHeaderProps = {
  description: StoryblockRichTextContent;
  onSectionLinkClick: (args: SectionLinkData) => void;
  sections: Sections;
  sumOfExpectedDays: number;
  title: string;
  loomSection?: ReactNode;
};

export const EstimationsHeader = ({
  title,
  description,
  sections,
  onSectionLinkClick,
  sumOfExpectedDays,
  loomSection,
}: EstimationsHeaderProps) => {
  const styles = useBreakpointValue({
    base: {
      description: {
        fontSize: "sm",
      },
      heading: {
        fontSize: "xl",
      },
      item: {
        fontSize: "sm",
      },
      mainHeading: {
        fontSize: "xl",
      },
    },
    lg: {
      description: {
        fontSize: "sm",
      },
      heading: {
        fontSize: "xl",
      },
      item: {
        fontSize: "md",
      },
      mainHeading: {
        fontSize: "xl",
      },
    },
  });

  const sectionLinkHandler = (args: SectionLinkData) => () =>
    onSectionLinkClick(args);

  return (
    <>
      <Box px={4} mb={loomSection ? 8 : 4}>
        <HStack
          minH={16}
          space={2}
          py={2}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Heading {...styles.heading}>{title}</Heading>
        </HStack>
        {description && (
          <Box mb={loomSection ? 8 : 0}>
            <RichTextResolver
              richText={description}
              textProps={styles.description}
            />
          </Box>
        )}
        {loomSection}
      </Box>

      <HStack
        px={3}
        minH={12}
        bg="darkBlue.400"
        py={2}
        justifyContent="space-between"
        alignItems={"center"}
        borderWidth="0.5"
        borderColor={"gray.400"}
        borderRadius="sm"
      >
        <Heading color="green.400" mt={0.5} {...styles.mainHeading}>
          TABLE OF CONTENTS
        </Heading>
        <Text color={"green.400"}>Estimated sum: {sumOfExpectedDays} days</Text>
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
    </>
  );
};
