import { Divider } from "native-base";
import React from "react";
import { ISbStoryData } from "storyblok-js-client";
import { EstimationContent } from "storyblok-types";
import { mapEstimationData } from "../../utils/mapEstimationData";
import { ExpandableComponent } from "./ExpandableComponent";
import { EstimationsTOC, SectionLinkData } from "../EstimationsTOC";
import { EstimationsSectionHeader } from "../EstimationsSectionHeader";
import { EstimationRowHeader } from "../EstimationRowHeader";
import { EstimationRowContent } from "../EstimationRowContent";
import { useArray } from "client-logic";

export interface EstimationDetailsProps {
  estimation: ISbStoryData<EstimationContent>;
}

export const EstimationDetails: React.FC<EstimationDetailsProps> = ({
  estimation,
}) => {
  const { title, sectionsData } = mapEstimationData(estimation);
  const expandedKeys = useArray<string>([]);

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
              }) => (
                <>
                  <ExpandableComponent
                    isExpanded={expandedKeys.includes(itemKey!)}
                    onClick={() => expandedKeys.toggle(itemKey!)}
                    headerComponent={({ isHovered, isPressed }) => (
                      <EstimationRowHeader
                        nominalDays={nominalDays}
                        order={listIndex}
                        text={task}
                        isHighlighted={isHovered || isPressed}
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
                      />
                    }
                  />
                  <Divider bg="gray.400" />
                </>
              )
            )}
          </div>
        );
      })}
    </div>
  );
};
