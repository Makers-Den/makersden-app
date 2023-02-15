import { useArray } from "@md/client-logic";
import { EstimationContent } from "@md/storyblok-types";
import { Box, Divider } from "native-base";
import React, { useMemo, useRef } from "react";
import {
  LayoutAnimation,
  Platform,
  SectionList,
  SectionListRenderItemInfo,
  UIManager,
} from "react-native";
import { ISbStoryData } from "storyblok-js-client";

import { useGallery } from "../../hooks/useGallery";
import {
  SectionRow,
  useMapEstimationData,
} from "../../utils/useMapEstimationData";
import { EstimationRowContent } from "../EstimationRowContent";
import { EstimationRowHeader } from "../EstimationRowHeader";
import { EstimationsSectionHeader } from "../EstimationsSectionHeader";
import { EstimationsTOC, SectionLinkData } from "../EstimationsTOC";
import { ExpandableComponent } from "./ExpandableComponent";
import { ImageGallery } from "./ImageGallery";

export interface EstimationDetailsProps {
  estimation: ISbStoryData<EstimationContent>;
}

export const EstimationDetails = ({ estimation }: EstimationDetailsProps) => {
  const sectionListRef = useRef<SectionList | null>(null);

  const { title, description, sections, sumOfExpectedDays } =
    useMapEstimationData(estimation);
  const expandedKeys = useArray<string>([]);
  const gallery = useGallery();
  const sectionListSections = useMemo(
    () =>
      sections.map((section) => ({
        ...section,
        data: section.rows,
      })),
    [sections]
  );

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

    while (sections[sectionIndex] && index > itemsLengthSum) {
      sectionIndex++;
      itemsLengthSum += sections[sectionIndex].rows.length + 1;
    }

    sectionListRef.current?.scrollToLocation({
      itemIndex: 1,
      sectionIndex: 0,
      viewOffset: Math.abs(averageItemLength * index),
    });

    setTimeout(() => {
      sectionListRef.current?.scrollToLocation({
        itemIndex: 1,
        sectionIndex,
      });
    }, 10);
  };

  return (
    <>
      <SectionList
        ref={sectionListRef}
        sections={sectionListSections}
        onScrollToIndexFailed={handleScrollToIndexFailed}
        keyExtractor={({ key }, index) => key || `${index}`}
        ListHeaderComponent={
          <EstimationsTOC
            title={title}
            description={description}
            sections={sections}
            onSectionLinkClick={sectionLinkHandler}
            sumOfExpectedDays={sumOfExpectedDays}
          />
        }
        stickySectionHeadersEnabled
        renderSectionHeader={({
          section: { title, expectedDays, listIndex },
        }) => (
          <EstimationsSectionHeader
            title={title}
            expectedDays={expectedDays}
            listIndex={listIndex}
          />
        )}
        ItemSeparatorComponent={() => <Divider bg="gray.400" />}
        renderItem={({
          item: {
            task,
            description,
            key: itemKey,
            expectedDays,
            images,
            isIncluded,
            listIndex,
          },
        }: SectionListRenderItemInfo<SectionRow>) => (
          <ExpandableComponent
            isExpanded={expandedKeys.includes(itemKey)}
            onClick={itemClickHandler(itemKey)}
            wrapperProps={{
              px: 4,
              py: 2,
            }}
            headerComponent={
              <EstimationRowHeader
                expectedDays={expectedDays}
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
