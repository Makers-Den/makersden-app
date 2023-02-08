import { Divider, useBreakpointValue } from "native-base";
import * as R from "remeda";
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
  const { title, description, sections } = mapEstimationData(estimation);

  const itemKeys = useMemo(
    () =>
      R.pipe(
        sections,
        R.flatMap((section) => section.rows),
        R.filter((item) => !!item.key),
        R.map((item) => item.key as string)
      ),
    [sections]
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
        sections={sections}
        onSectionLinkClick={sectionLinkHandler}
      />
      {sections.map(({ rows, expectedDays, title, listIndex, key }) => {
        return (
          <div key={key} id={key}>
            <EstimationsSectionHeader
              title={title}
              listIndex={listIndex}
              expectedDays={expectedDays}
              position={"sticky"}
              zIndex={10}
              top={0}
            />
            {rows.map(
              ({
                task,
                description,
                key: itemKey,
                expectedDays,
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
                        expectedDays={expectedDays}
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
