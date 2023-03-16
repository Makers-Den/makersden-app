import { useArray } from "@md/client-logic";
import { EstimationContent } from "@md/storyblok-types";
import { storyblokEditable } from "@storyblok/react";
import { Divider, useBreakpointValue } from "native-base";
import React, { useMemo } from "react";
import * as R from "remeda";
import { ISbStoryData } from "storyblok-js-client";

import { useGallery } from "../../hooks/useGallery";
import { useMapEstimationData } from "../../utils/useMapEstimationData";
import { Copyright } from "../Copyright";
import { EstimationRowContent } from "../EstimationRowContent";
import { EstimationRowHeader } from "../EstimationRowHeader";
import { EstimationsHeader, SectionLinkData } from "../EstimationsHeader";
import { EstimationsSectionHeader } from "../EstimationsSectionHeader";
import { Logo } from "../Logo";
import { LogoWrapper } from "../LogoWrapper";
import { ExpandableComponent } from "./ExpandableComponent";
import { ImageGallery } from "./ImageGallery";
import { LoomSection } from "./LoomSection";

export interface EstimationDetailsProps {
  estimation: ISbStoryData<EstimationContent>;
  loomVideoHtml: string | null;
  isLoomVideoHtmlLoading: boolean;
}

export const EstimationDetails = ({
  estimation,
  loomVideoHtml,
  isLoomVideoHtmlLoading,
}: EstimationDetailsProps) => {
  const { title, description, sections, sumOfExpectedDays } =
    useMapEstimationData(estimation);

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

  const sectionLinkHandler = ({ key }: SectionLinkData) => {
    if (key) {
      const element = document.getElementById(key);

      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const estimationContent = estimation.content;
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <div {...storyblokEditable(estimationContent as any)}>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>

      <EstimationsHeader
        title={title}
        description={description}
        sections={sections}
        onSectionLinkClick={sectionLinkHandler}
        sumOfExpectedDays={sumOfExpectedDays}
        loomSection={
          isLoomVideoHtmlLoading || loomVideoHtml ? (
            <LoomSection
              isLoomVideoHtmlLoading={isLoomVideoHtmlLoading}
              loomVideoHtml={loomVideoHtml}
            />
          ) : null
        }
      />
      {sections.map((section) => {
        const { rows, expectedDays, title, listIndex, key } = section;
        return (
          <div key={key} id={key} {...storyblokEditable(section)}>
            <EstimationsSectionHeader
              title={title}
              listIndex={listIndex}
              expectedDays={expectedDays}
              position={"sticky"}
              zIndex={10}
              top={0}
            />
            {rows.map((row) => {
              const {
                task,
                description,
                key: itemKey,
                expectedDays,
                images,
                isIncluded,
                listIndex,
              } = row;
              return (
                <div key={itemKey} {...storyblokEditable(row)}>
                  <ExpandableComponent
                    isExpanded={expandedKeys.includes(itemKey)}
                    onClick={() => expandedKeys.toggle(itemKey)}
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
                </div>
              );
            })}
          </div>
        );
      })}
      <Copyright />
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
