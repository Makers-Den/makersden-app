import React, { useMemo, useRef, useState } from "react";
import { Box, Heading, HStack, Text, Flex } from "native-base";
import {
  LayoutAnimation,
  Platform,
  SectionList,
  TouchableOpacity,
  UIManager,
} from "react-native";
import { ISbStoryData } from "storyblok-js-client";
import { EstimationContent } from "storyblok-types";
import { EstimationImages } from "./EstimationImages";
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
    return sections.map(({ rows, title, description, _uid }) => {
      let nominalDaysSum: number = 0;
      let optimisticDaysSum: number = 0;
      let pessimisticDaysSum: number = 0;
      const data = rows.map(
        ({
          _uid,
          description,
          task,
          nominalDays,
          optimisticDays,
          pessimisticDays,
          images,
        }) => {
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
            images: images || [],
          };
        }
      );

      function parseSum(sum: number) {
        return parseFloat(sum.toFixed(1));
      }

      return {
        data,
        title,
        description,
        key: _uid,
        nominalDaysSum: parseSum(nominalDaysSum),
        optimisticDaysSum: parseSum(optimisticDaysSum),
        pessimisticDaysSum: parseSum(pessimisticDaysSum),
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
    getItemHeight: () => 8,
    getSectionHeaderHeight: () => 10, // The height of your section headers
    listHeaderHeight: 12 + sectionsData.length * 8, // The height of your list header
  });

  return (
    <SectionList
      ref={sectionListRef}
      sections={sectionsData}
      //@ts-ignore the data types are not compatable and I cannot change hem in getItemLayout
      getItemLayout={getItemLayout}
      keyExtractor={({ key }, index) => key || `${index}`}
      ListHeaderComponent={
        <Box>
          <HStack
            minH={12}
            pl={4}
            space={2}
            py={2}
            bg="blue.100"
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Heading size={"sm"}>{title}</Heading>
          </HStack>
          {sectionsData.map(({ title, nominalDaysSum, key }, sectionIndex) => {
            return (
              <TouchableOpacity
                key={key}
                onPress={sectionLinkHandler(sectionIndex)}
              >
                <HStack
                  pl={4}
                  bg="amber.200"
                  minH={8}
                  py={2}
                  justifyContent="space-between"
                  alignItems={"center"}
                >
                  <Text maxW={"3/4"}>{title}</Text>
                  <Text>{nominalDaysSum} days</Text>
                </HStack>
              </TouchableOpacity>
            );
          })}
        </Box>
      }
      stickySectionHeadersEnabled
      renderSectionHeader={({ section: { title, nominalDaysSum } }) => {
        return (
          <HStack
            pl={4}
            minH={10}
            bg="blue.100"
            justifyContent="space-between"
            space={2}
            py={2}
            alignItems={"center"}
          >
            <Text fontSize="md" maxW={"3/4"}>
              {title}
            </Text>
            <Text fontSize="md">{nominalDaysSum} days</Text>
          </HStack>
        );
      }}
      renderItem={({
        item: { task, description, key: itemKey, nominalDays, images },
      }) => {
        return (
          <ExpandableComponent
            isExpanded={expandedKeys.includes(itemKey!)}
            onClickFunction={itemClickHandler(itemKey!)}
            headerComponent={
              <HStack
                pl={4}
                minH={8}
                space={2}
                py={2}
                justifyContent="space-between"
                alignItems={"center"}
                bg="gray.200"
              >
                <Box maxW="3/4">
                  <RichTextResolver richText={task} />
                </Box>
                <Text>{nominalDays} days</Text>
              </HStack>
            }
            hideableComponent={
              <Flex p={4} bg="amber.200" direction="column">
                {images.length > 0 && <EstimationImages images={images} />}
                <Box flexShrink={1}>
                  <RichTextResolver richText={description} />
                </Box>
              </Flex>
            }
          />
        );
      }}
    />
  );
};
