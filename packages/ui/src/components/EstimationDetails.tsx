import { Box, HStack, SectionList, Text } from "native-base";
import React, { useMemo, useState } from "react";
import { LayoutAnimation, Platform, UIManager } from "react-native";
import { ISbStoryData } from "storyblok-js-client";
import { EstimationContent } from "storyblok-types";
import { ExpandableComponent } from "./ExpandableComponent";
import { RichTextResolver } from "./RichTextResolver";

export interface EstimationDetailsProps {
  estimation: ISbStoryData<EstimationContent>;
}

export const EstimationDetails: React.FC<EstimationDetailsProps> = ({
  estimation,
}) => {
  const { sections } = estimation.content;

  const sectionsData = useMemo(() => {
    return sections.map(({ rows, title, description, _uid }) => {
      const data = rows.map(
        ({
          _uid,
          description,
          task,
          nominalDays,
          optimisticDays,
          pessimisticDays,
        }) => ({
          key: _uid,
          description,
          task,
          nominalDays,
          optimisticDays,
          pessimisticDays,
        })
      );
      return { data, title, description, key: _uid };
    });
  }, [sections]);

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  function itemClickHandler(itemKey: string) {
    return () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpandedKeys((curState) => {
        if (curState.includes(itemKey)) {
          return curState.filter((key) => key !== itemKey);
        }

        return [...curState, itemKey];
      });
    };
  }

  return (
    <SectionList
      sections={sectionsData}
      keyExtractor={({ key }, index) => key || `${index}`}
      stickySectionHeadersEnabled
      renderSectionHeader={({ section: { title } }) => {
        return (
          <Box p={2} bg="blue.100">
            <Text fontSize="md">{title}</Text>
          </Box>
        );
      }}
      renderItem={({
        item: { task, description, key: itemKey, nominalDays },
        section: { key: sectionKey },
      }) => {
        return (
          <ExpandableComponent
            isExpanded={expandedKeys.includes(itemKey!)}
            onClickFunction={itemClickHandler(itemKey!)}
            headerComponent={
              <HStack
                pl={4}
                p={3}
                space={2}
                justifyContent="space-between"
                display="flex"
                bg="gray.200"
              >
                <RichTextResolver richText={task} />
                <Text>{nominalDays}</Text>
              </HStack>
            }
            hideableComponent={
              <Box p={4} bg="amber.200">
                <RichTextResolver richText={description} />
              </Box>
            }
          />
        );
      }}
    />
  );
};
