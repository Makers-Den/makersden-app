import { ISbStoryData } from "storyblok-js-client";
import { EstimationContent, EstimationRowContent } from "storyblok-types";
import { useMemo } from "react";
import * as R from "remeda";

const ROUND_PLACES_AFTER_COMMA = 1;

const calculateExpectedDays = (row: EstimationRowContent) =>
  (row.optimisticDays + 4 * row.nominalDays + row.pessimisticDays) / 6;

const roundDays = (days: number) =>
  Math.round(days * 10 * ROUND_PLACES_AFTER_COMMA) /
  (10 * ROUND_PLACES_AFTER_COMMA);

const mapRow =
  (sectionIndex: number) => (row: EstimationRowContent, rowIndex: number) => ({
    key: row._uid,
    description: row.description,
    task: row.task,
    nominalDays: row.nominalDays,
    optimisticDays: row.optimisticDays,
    pessimisticDays: row.pessimisticDays,
    expectedDays: roundDays(calculateExpectedDays(row)),
    isIncluded: row.isIncluded,
    images: row.images || [],
    listIndex: `${sectionIndex + 1}.${rowIndex + 1}`,
  });

export const mapEstimationData = (
  estimation: ISbStoryData<EstimationContent>
) => {
  const { sections: initialSections, description, title } = estimation.content;

  const sections = useMemo(
    () =>
      R.map.indexed(
        initialSections,
        ({ rows: initialRows, title, description, _uid }, sectionIndex) => {
          const rows = R.map.indexed(initialRows, mapRow(sectionIndex));

          return {
            rows,
            title: title.substring(1).trim(),
            description,
            key: _uid,
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

  return { sections, description, title };
};

export type Sections = ReturnType<typeof mapEstimationData>["sections"];
