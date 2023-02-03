import { ISbStoryData } from "storyblok-js-client";
import { EstimationContent } from "storyblok-types";
import { useMemo } from "react";
import * as R from "remeda";

export function mapEstimationData(estimation: ISbStoryData<EstimationContent>) {
  const { sections, title } = estimation.content;

  const sectionsData = useMemo(() => {
    return R.map.indexed(
      sections,
      ({ rows, title, description, _uid }, sectionIndex) => {
        const nominalDaysSum = R.sumBy(rows, ({ nominalDays }) => {
          return nominalDays;
        });
        const optimisticDaysSum = R.sumBy(rows, ({ optimisticDays }) => {
          return optimisticDays;
        });
        const pessimisticDaysSum = R.sumBy(rows, ({ pessimisticDays }) => {
          return pessimisticDays;
        });
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
              images: images || [],
              listIndex: `${sectionIndex + 1}.${itemIndex + 1}`,
            };
          }
        );

        function parseSum(sum: number) {
          return parseFloat(sum.toFixed(1));
        }

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

  return { sectionsData, title };
}

export type SectionsData = ReturnType<typeof mapEstimationData>["sectionsData"];
