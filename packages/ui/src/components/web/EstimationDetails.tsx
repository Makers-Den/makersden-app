import { Divider, useBreakpointValue } from "native-base";
import React, { useMemo } from "react";
import { ISbStoryData } from "storyblok-js-client";
import { EstimationContent } from "storyblok-types";
import { mapEstimationData } from "../../utils/mapEstimationData";
import { ExpandableComponent } from "./ExpandableComponent";
import { EstimationsTOC, SectionLinkData } from "../EstimationsTOC";
import { EstimationsSectionHeader } from "../EstimationsSectionHeader";
import { EstimationRowHeader } from "../EstimationRowHeader";
import { EstimationRowContent } from "../EstimationRowContent";
import { useArray } from "client-logic";
import { useGallery } from "../../hooks/useGallery";
import { ImageGallery } from "./ImageGallery";

export interface EstimationDetailsProps {
  estimation: ISbStoryData<EstimationContent>;
}

export const EstimationDetails: React.FC<EstimationDetailsProps> = ({
  estimation,
}) => {
  const { title, description, sectionsData } = mapEstimationData(estimation);
  const itemKeys = useMemo(
    () =>
      sectionsData
        .flatMap((sectionData) => sectionData.data)
        .filter((item) => item.key)
        .map((item) => item.key as string),
    [sectionsData]
  );
  const initiallyExpandedKeys = useBreakpointValue({ base: [], lg: itemKeys });
  const expandedKeys = useArray<string>(initiallyExpandedKeys);
  const gallery = useGallery();

  function sectionLinkHandler({ key }: SectionLinkData) {
    if (key) {
      const element = document.getElementById(key);

      element?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div>
      <EstimationsTOC
        title={title}
        description={description}
        sectionsData={sectionsData}
        onSectionLinkClick={sectionLinkHandler}
      />
      {sectionsData.map(({ data, nominalDaysSum, title, listIndex, key }) => {
        return (
          <div key={key} id={key}>
            <EstimationsSectionHeader
              title={title}
              listIndex={listIndex}
              nominalDaysSum={nominalDaysSum}
              position={"sticky"}
              zIndex={10}
              top={0}
            />
            {data.map(
              ({
                task,
                description,
                key: itemKey,
                nominalDays,
                images,
                isIncluded,
                listIndex,
              }) => (
                <React.Fragment key={itemKey}>
                  <ExpandableComponent
                    isExpanded={expandedKeys.includes(itemKey!)}
                    onClick={() => expandedKeys.toggle(itemKey!)}
                    headerComponent={({ isHovered, isPressed }) => (
                      <EstimationRowHeader
                        nominalDays={nominalDays}
                        order={listIndex}
                        text={task}
                        isHighlighted={isHovered || isPressed}
                        isIncluded={isIncluded}
                        wrapperProps={{
                          px: 4,
                        }}
                      />
                    )}
                    hideableComponent={
                      <EstimationRowContent
                        description={description}
                        images={images}
                        wrapperProps={{ px: 4 }}
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
                  <Divider bg="gray.400" />
                </React.Fragment>
              )
            )}
          </div>
        );
      })}

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
    </div>
  );
};
