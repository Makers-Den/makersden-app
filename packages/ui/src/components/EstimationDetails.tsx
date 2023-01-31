import { Box, Heading, HStack, Text, Divider } from "native-base";
import React, { useMemo, useRef, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  UIManager,
  SectionList,
} from "react-native";
import { ISbStoryData } from "storyblok-js-client";
import { EstimationContent } from "storyblok-types";
import { useMapEstimationData } from "../hooks/useMapEstimationData";
import { isRichTextEmpty } from "../utils/isRichTextEmpty";
import { EstimationImages } from "./EstimationImages";
import { ExpandableComponent } from "./ExpandableComponent";
import { RichTextResolver } from "./RichTextResolver";

export interface EstimationDetailsProps {
  estimation: ISbStoryData<EstimationContent>;
}

export const EstimationDetails: React.FC<EstimationDetailsProps> = ({
  estimation,
}) => {
  const sectionListRef = useRef<any>(null);

  const { title, sectionsData } = useMapEstimationData(estimation);

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  function itemClickHandler(itemKey: string) {
    return () => {
      LayoutAnimation.configureNext({
        duration: 150,
        create: {
          type: "easeOut",
          duration: 150,
          property: "opacity",
          delay: 0,
        },
        update: {
          type: "easeOut",
          duration: 150,
          delay: 0,
        },
      });
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
        setExpandedKeys([]);
        sectionListRef.current.scrollToLocation({
          itemIndex: 1,
          sectionIndex,
          animated: true,
          viewOffset: 0,
          viewPosition: 0,
        });
      }
    };
  }

  const handleScrollToIndexFailed = ({
    index,
    averageItemLength,
  }: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => {
    let sectionIndex = 0;
    let itemsLengthSum = 0;

    while (sectionsData[sectionIndex] && index > itemsLengthSum) {
      sectionIndex++;
      itemsLengthSum += sectionsData[sectionIndex].data.length + 1;
    }

    sectionListRef.current.scrollToLocation({
      itemIndex: 1,
      sectionIndex: 0,
      viewOffset: Math.abs(averageItemLength * index),
    });

    setTimeout(() => {
      sectionListRef.current.scrollToLocation({
        itemIndex: 1,
        sectionIndex,
      });
    }, 10);
  };

  return (
    <SectionList
      ref={sectionListRef}
      sections={sectionsData}
      onScrollToIndexFailed={handleScrollToIndexFailed}
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
                    onPress={sectionLinkHandler(sectionIndex)}
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
                        <Text color={"green.400"}>{listIndex}</Text>
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
            <Text fontSize="md" bold color={"green.400"} flexBasis={"70%"}>
              {listIndex} {title.toUpperCase()}
            </Text>
            <Text flexBasis={"auto"} fontSize="md">
              {nominalDaysSum} days
            </Text>
          </HStack>
        );
      }}
      ItemSeparatorComponent={() => <Divider bg="gray.400" />}
      renderItem={({
        item: {
          task,
          description,
          key: itemKey,
          nominalDays,
          images,
          listIndex,
        },
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
                space={3}
                py={2}
                justifyContent="space-between"
                alignItems={"center"}
              >
                <HStack space={2} flexBasis={"60%"}>
                  <Text>{listIndex}</Text>
                  <RichTextResolver richText={task} />
                </HStack>
                <Text flexBasis={"auto"}>{nominalDays} days</Text>
              </HStack>
            }
            hideableComponent={
              <Box py={2}>
                {images.length > 0 && <EstimationImages images={images} />}
                {isRichTextEmpty(description) ? (
                  <Text>No description available</Text>
                ) : (
                  <RichTextResolver richText={description} />
                )}
              </Box>
            }
          />
        );
      }}
    />
  );
};
