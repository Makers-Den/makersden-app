import { useArray } from "@md/client-logic";
import { EstimationContent } from "@md/storyblok-types";
import { concatenateImages } from "@md/ui/src/utils/concatenateImages";
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
        <Logo isDark={false} />
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
      {sections.map((section) => (
        <div key={section.key} id={section.key} {...storyblokEditable(section)}>
          <EstimationsSectionHeader
            title={section.title}
            listIndex={section.listIndex}
            expectedDays={section.expectedDays}
            nominalDays={section.nominalDays}
            optimisticDays={section.optimisticDays}
            pessimisticDays={section.pessimisticDays}
            position={"sticky"}
            zIndex={10}
            top={0}
          />

          {section.rows.map((row) => (
            <div key={row.key} {...storyblokEditable(row)}>
              <ExpandableComponent
                isExpanded={expandedKeys.includes(row.key)}
                onClick={() => expandedKeys.toggle(row.key)}
                headerComponent={({ isHovered, isPressed }) => (
                  <EstimationRowHeader
                    expectedDays={row.expectedDays}
                    order={row.listIndex}
                    text={row.task}
                    isHighlighted={isHovered || isPressed}
                    isIncluded={row.isIncluded}
                    wrapperProps={{
                      px: 4,
                    }}
                  />
                )}
                hideableComponent={
                  <EstimationRowContent
                    description={row.description}
                    images={concatenateImages(
                      row.clipboardImages.images,
                      row.images
                    )}
                    wrapperProps={{ px: 4 }}
                    onImageClick={(imageIndex) => {
                      gallery.open(
                        concatenateImages(
                          row.clipboardImages.images,
                          row.images
                        ).map((image) => ({
                          ...image,
                          id: image.url,
                        })),
                        imageIndex
                      );
                    }}
                  />
                }
              />
              <Divider bg="gray.400" />
            </div>
          ))}
        </div>
      ))}
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
