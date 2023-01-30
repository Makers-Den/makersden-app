import { Box, HStack, Text, Divider } from "native-base";
import React, { useRef, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  UIManager,
  SectionList,
} from "react-native";
import { ISbStoryData } from "storyblok-js-client";
import { EstimationContent } from "storyblok-types";
import { useMapEstimationData } from "../../hooks/useMapEstimationData";
import { isRichTextEmpty } from "../../utils/isRichTextEmpty";
import { EstimationImages } from "../EstimationImages";
import { ExpandableComponent } from "./ExpandableComponent";
import { RichTextResolver } from "../RichTextResolver";
import { EstimationsTOC, SectionLinkData } from "../EstimationsTOC";
import { EstimationsSectionHeader } from "../EstimationsSectionHeader";

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

  function sectionLinkHandler({ sectionIndex }: SectionLinkData) {
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
        <EstimationsTOC
          title={title}
          sectionsData={sectionsData}
          onSectionLinkClick={sectionLinkHandler}
        />
      }
      stickySectionHeadersEnabled
      renderSectionHeader={({
        section: { title, nominalDaysSum, listIndex },
      }) => {
        return (
          <EstimationsSectionHeader
            title={title}
            nominalDaysSum={nominalDaysSum}
            listIndex={listIndex}
          />
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
