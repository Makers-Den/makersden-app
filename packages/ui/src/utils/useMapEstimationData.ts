import { EstimationContent, EstimationRowContent } from "@md/storyblok-types";
import { useMemo } from "react";
import * as R from "remeda";
import { ISbStoryData } from "storyblok-js-client";

const ROUND_PLACES_AFTER_COMMA = 1;

const calculateExpectedDays = (row: EstimationRowContent) =>
  (row.optimisticDays + 4 * row.nominalDays + row.pessimisticDays) / 6;

const roundDays = (days: number) =>
  Math.round(days * 10 * ROUND_PLACES_AFTER_COMMA) /
  (10 * ROUND_PLACES_AFTER_COMMA);

const mapRow =
  (sectionIndex: number) => (row: EstimationRowContent, rowIndex: number) => ({
    key: row._uid ?? "",
    description: row.description,
    task: row.task,
    nominalDays: row.nominalDays,
    optimisticDays: row.optimisticDays,
    pessimisticDays: row.pessimisticDays,
    expectedDays: roundDays(calculateExpectedDays(row)),
    isIncluded: row.isIncluded,
    images: row.images || [],
    listIndex: `${sectionIndex + 1}.${rowIndex + 1}`,
    _editable: row._editable,
  });
  
export const useMapEstimationData = (
  estimation: ISbStoryData<EstimationContent>
) => {
  const {
    sections: initialSections,
    description,
    title,
    loomVideo,
  } = estimation.content;

  const sections = useMemo(
    () =>
      R.map.indexed(
        initialSections,
        ({ rows: initialRows, title, description, _uid, _editable}, sectionIndex) => {
          const rows = R.map.indexed(initialRows, mapRow(sectionIndex));

          return {
            rows,
            title: title.substring(1).trim(),
            description,
            key: _uid,
            _editable,
            expectedDays: roundDays(
              R.pipe(
                initialRows,
                R.filter((row) => row.isIncluded),
                R.sumBy((row) => calculateExpectedDays(row))
              )
            ),
            listIndex: `${sectionIndex + 1}`,
          };
        }
      ),
    [initialSections]
  );

  const sumOfExpectedDays = useMemo(
    () => roundDays(R.sumBy(sections, (section) => section.expectedDays)),
    [sections]
  );

  return { sections, description, title, sumOfExpectedDays, loomVideo };
};

export type Sections = ReturnType<typeof useMapEstimationData>["sections"];

export type SectionRow = ReturnType<
  typeof useMapEstimationData
>["sections"][0]["rows"][0];
