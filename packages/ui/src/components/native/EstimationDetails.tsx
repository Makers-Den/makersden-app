import { useArray } from "client-logic";
import { Divider } from "native-base";
import React, { useRef } from "react";
import {
  LayoutAnimation,
  Platform,
  SectionList,
  UIManager,
} from "react-native";
import { ISbStoryData } from "storyblok-js-client";
import { EstimationContent } from "storyblok-types";

import { useGallery } from "../../hooks/useGallery";
import { useMapEstimationData } from "../../utils/useMapEstimationData";
import { EstimationRowContent } from "../EstimationRowContent";
import { EstimationRowHeader } from "../EstimationRowHeader";
import { EstimationsSectionHeader } from "../EstimationsSectionHeader";
import { EstimationsTOC, SectionLinkData } from "../EstimationsTOC";
import { ExpandableComponent } from "./ExpandableComponent";
import { ImageGallery } from "./ImageGallery";

export interface EstimationDetailsProps {
  estimation: ISbStoryData<EstimationContent>;
}

export const EstimationDetails = ({
  estimation,
}: EstimationDetailsProps) => {
  const sectionListRef = useRef<any>(null);

  const { title, description, sectionsData } = useMapEstimationData(estimation);
  const expandedKeys = useArray<string>([]);
  const gallery = useGallery();

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const itemClickHandler = (itemKey: string) => () => {
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

  const sectionLinkHandler = ({ sectionIndex }: SectionLinkData) => {
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
  };

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
    <>
      <SectionList
        ref={sectionListRef}
        sections={sectionsData}
        onScrollToIndexFailed={handleScrollToIndexFailed}
        keyExtractor={({ key }, index) => key || `${index}`}
        ListHeaderComponent={
          <EstimationsTOC
            title={title}
            description={description}
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
            isIncluded,
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
                isIncluded={isIncluded}
              />
            }
            hideableComponent={
              <EstimationRowContent
                description={description}
                images={images}
                onImageClick={(imageIndex) => {
                  gallery.open(
                    images.map((image) => ({
                      alt: image.alt,
                      id: image.id,
                      url: image.filename,
                    })),
                    imageIndex
                  );
                }}
              />
            }
          />
        )}
      />
      <ImageGallery
        initialImageIndex={gallery.initialImageIndex ?? 0}
        isOpen={gallery.isOpen}
        images={gallery.images.map((image) => ({
          alt: image.alt,
          source: { uri: image.url },
          id: image.id,
        }))}
        onClose={gallery.close}
      />
    </>
  );
};
