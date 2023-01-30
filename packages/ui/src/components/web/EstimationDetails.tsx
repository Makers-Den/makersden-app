import { Box, Divider, HStack, Text } from "native-base";
import React, { useState } from "react";
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
  const { title, sectionsData } = useMapEstimationData(estimation);

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  function itemClickHandler(itemKey: string) {
    return () => {
      setExpandedKeys((curState) => {
        if (curState.includes(itemKey)) {
          return curState.filter((key) => key !== itemKey);
        }

        return [...curState, itemKey];
      });
    };
  }

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
        sectionsData={sectionsData}
        onSectionLinkClick={sectionLinkHandler}
      />
      {sectionsData.map(({ data, nominalDaysSum, title, listIndex, key }) => {
        return (
          <div id={key}>
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
                listIndex,
              }) => {
                return (
                  <>
                    <ExpandableComponent
                      isExpanded={expandedKeys.includes(itemKey!)}
                      onClickFunction={itemClickHandler(itemKey!)}
                      headerComponent={({ isHovered, isPressed }) => (
                        <HStack
                          minH={10}
                          space={3}
                          py={2}
                          px={4}
                          justifyContent="space-between"
                          alignItems={"center"}
                          bg={isHovered || isPressed ? "black.100" : undefined}
                        >
                          <HStack space={2} flexBasis={"60%"}>
                            <Text>{listIndex}</Text>
                            <RichTextResolver richText={task} />
                          </HStack>
                          <Text flexBasis={"auto"}>{nominalDays} days</Text>
                        </HStack>
                      )}
                      hideableComponent={
                        <Box py={2} px={4}>
                          {images.length > 0 && (
                            <EstimationImages images={images} />
                          )}
                          {isRichTextEmpty(description) ? (
                            <Text>No description available</Text>
                          ) : (
                            <RichTextResolver richText={description} />
                          )}
                        </Box>
                      }
                    />
                    <Divider bg="gray.400" />
                  </>
                );
              }
            )}
          </div>
        );
      })}
    </div>
  );
};
