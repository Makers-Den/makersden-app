import { Divider } from "native-base";
import React, { useRef } from "react";
import {
  LayoutAnimation,
  Platform,
  UIManager,
  SectionList,
} from "react-native";
import { ISbStoryData } from "storyblok-js-client";
import { EstimationContent } from "storyblok-types";
import { useArray } from "client-logic";
import { mapEstimationData } from "../../utils/mapEstimationData";
import { ExpandableComponent } from "./ExpandableComponent";
import { EstimationsTOC, SectionLinkData } from "../EstimationsTOC";
import { EstimationsSectionHeader } from "../EstimationsSectionHeader";
import { EstimationRowHeader } from "../EstimationRowHeader";
import { EstimationRowContent } from "../EstimationRowContent";

export interface EstimationDetailsProps {
  estimation: ISbStoryData<EstimationContent>;
}

export const EstimationDetails: React.FC<EstimationDetailsProps> = ({
  estimation,
}) => {
  const sectionListRef = useRef<any>(null);

  const { title, sectionsData } = mapEstimationData(estimation);
  const expandedKeys = useArray<string>([]);

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

      expandedKeys.toggle(itemKey);
    };
  }

  function sectionLinkHandler({ sectionIndex }: SectionLinkData) {
    if (sectionListRef.current) {
      expandedKeys.clear();
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
      }) => (
        <EstimationsSectionHeader
          title={title}
          nominalDaysSum={nominalDaysSum}
          listIndex={listIndex}
        />
      )}
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
      }) => (
        <ExpandableComponent
          isExpanded={expandedKeys.includes(itemKey!)}
          onClick={itemClickHandler(itemKey!)}
          wrapperProps={{
            px: 4,
            py: 2,
          }}
          headerComponent={
            <EstimationRowHeader
              nominalDays={nominalDays}
              order={listIndex}
              text={task}
            />
          }
          hideableComponent={
            <EstimationRowContent description={description} images={images} />
          }
        />
      )}
    />
  );
};