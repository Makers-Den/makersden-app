import { EstimationContent } from "@md/storyblok-types";
import { useMemo } from "react";
import * as R from "remeda";
import { ISbStoryData } from "storyblok-js-client";

export const useMapEstimationData = (estimation: ISbStoryData<EstimationContent>) => {
  const { sections, description, title } = estimation.content;

  const sectionsData = useMemo(() => {
    return R.map.indexed(
      sections,
      ({ rows, title, description, _uid }, sectionIndex) => {
        const includedRows = R.filter(rows, (row) => row.isIncluded);
        const nominalDaysSum = R.sumBy(includedRows, ({ nominalDays }) => {
          return nominalDays;
        });
        const optimisticDaysSum = R.sumBy(
          includedRows,
          ({ optimisticDays }) => {
            return optimisticDays;
          }
        );
        const pessimisticDaysSum = R.sumBy(
          includedRows,
          ({ pessimisticDays }) => {
            return pessimisticDays;
          }
        );
        const data = R.map.indexed(
          rows,
          (
            {
              _uid,
              description,
              task,
              nominalDays,
              optimisticDays,
              pessimisticDays,
              images,
              isIncluded,
            },
            itemIndex
          ) => {
            return {
              key: _uid,
              description,
              task,
              nominalDays,
              optimisticDays,
              pessimisticDays,
              isIncluded,
              images: images || [],
              listIndex: `${sectionIndex + 1}.${itemIndex + 1}`,
            };
          }
        );

        const parseSum = (sum: number) => parseFloat(sum.toFixed(1));

        return {
          data,
          title: title.substring(1).trim(),
          description,
          key: _uid,
          nominalDaysSum: parseSum(nominalDaysSum),
          optimisticDaysSum: parseSum(optimisticDaysSum),
          pessimisticDaysSum: parseSum(pessimisticDaysSum),
          listIndex: `${sectionIndex + 1}`,
        };
      }
    );
  }, [sections]);

  return { sectionsData, description, title };
};

export type SectionsData = ReturnType<typeof useMapEstimationData>["sectionsData"];
