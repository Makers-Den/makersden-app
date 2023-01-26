import { Box, Heading, HStack, Text, SectionList, Divider } from "native-base";
import React, { useMemo, useRef, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  UIManager,
} from "react-native";
import { ISbStoryData } from "storyblok-js-client";
import { EstimationContent } from "storyblok-types";
import { ExpandableComponent } from "./ExpandableComponent";
import { RichTextResolver } from "./RichTextResolver";
import sectionListGetItemLayout from "react-native-section-list-get-item-layout";

export interface EstimationDetailsProps {
  estimation: ISbStoryData<EstimationContent>;
}

export const EstimationDetails: React.FC<EstimationDetailsProps> = ({
  estimation,
}) => {
  const sectionListRef = useRef<any>(null);
  const { sections, title } = estimation.content;

  const sectionsData = useMemo(() => {
    return sections.map(({ rows, title, description, _uid }, sectionIndex) => {
      let nominalDaysSum: number = 0;
      let optimisticDaysSum: number = 0;
      let pessimisticDaysSum: number = 0;
      const data = rows.map(
        (
          {
            _uid,
            description,
            task,
            nominalDays,
            optimisticDays,
            pessimisticDays,
          },
          itemIndex
        ) => {
          nominalDaysSum += nominalDays;
          optimisticDaysSum += optimisticDays;
          pessimisticDaysSum += pessimisticDays;
          return {
            key: _uid,
            description,
            task,
            nominalDays,
            optimisticDays,
            pessimisticDays,
            listIndex: `${sectionIndex + 1}.${itemIndex + 1}`,
          };
        }
      );

      function parseSum(sum: number) {
        return parseFloat(sum.toFixed(1));
      }

      return {
        data,
        title: title.substring(1),
        description,
        key: _uid,
        nominalDaysSum: parseSum(nominalDaysSum),
        optimisticDaysSum: parseSum(optimisticDaysSum),
        pessimisticDaysSum: parseSum(pessimisticDaysSum),
        listIndex: `${sectionIndex + 1}`,
      };
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

  function sectionLinkHandler(sectionIndex: number) {
    return () => {
      if (sectionListRef.current) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedKeys([]);
        sectionListRef.current.scrollToLocation({
          itemIndex: 0,
          sectionIndex,
          animated: true,
        });
      }
    };
  }

  const getItemLayout = sectionListGetItemLayout({
    // The height of the row with rowData at the given sectionIndex and rowIndex
    getItemHeight: () => 10,
    getSectionHeaderHeight: () => 12, // The height of your section headers
    listHeaderHeight: 16 + sectionsData.length * 10, // The height of your list header
  });

  return (
    <SectionList
      bg="black.200"
      ref={sectionListRef}
      sections={sectionsData}
      //@ts-ignore the data types are not compatable and I cannot change hem in getItemLayout
      getItemLayout={getItemLayout}
      keyExtractor={({ key }, index) => key || `${index}`}
      ListHeaderComponent={
        <Box>
          <HStack
            minH={16}
            px={4}
            space={2}
            py={2}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Heading size={"sm"}>{title}</Heading>
          </HStack>
          <Box px={4} py={2}>
            <Heading size="xs">Table of contents</Heading>
            {sectionsData.map(
              ({ title, nominalDaysSum, listIndex }, sectionIndex) => {
                return (
                  <TouchableOpacity onPress={sectionLinkHandler(sectionIndex)}>
                    <HStack
                      px={2}
                      py={1}
                      minH={6}
                      justifyContent="space-between"
                      alignItems={"center"}
                      my={2}
                    >
                      <Text maxW={"3/4"}>
                        {listIndex} {title}
                      </Text>
                      <Text>{nominalDaysSum} days</Text>
                    </HStack>
                  </TouchableOpacity>
                );
              }
            )}
          </Box>
        </Box>
      }
      stickySectionHeadersEnabled
      renderSectionHeader={({
        section: { title, nominalDaysSum, listIndex },
      }) => {
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
          >
            <Text fontSize="md" maxW={"3/4"}>
              {listIndex} {title}
            </Text>
            <Text fontSize="md">{nominalDaysSum} days</Text>
          </HStack>
        );
      }}
      ItemSeparatorComponent={() => <Divider bg="gray.400" />}
      renderItem={({
        item: { task, description, key: itemKey, nominalDays, listIndex },
      }) => {
        return (
          <ExpandableComponent
            isExpanded={expandedKeys.includes(itemKey!)}
            onClickFunction={itemClickHandler(itemKey!)}
            wrapperProps={{
              px: 4,
              py: 2,
            }}
            headerComponent={
              <HStack
                minH={10}
                space={2}
                py={2}
                justifyContent="space-between"
                alignItems={"center"}
              >
                <HStack space={2} maxW="3/4">
                  <Text>{listIndex}</Text>
                  <RichTextResolver richText={task} />
                </HStack>
                <Text>{nominalDays} days</Text>
              </HStack>
            }
            hideableComponent={
              <Box py={2}>
                <RichTextResolver richText={description} />
              </Box>
            }
          />
        );
      }}
    />
  );
};
