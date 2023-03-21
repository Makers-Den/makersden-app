import { PageStory } from "@md/storyblok-types";
import { ISbStoriesParams } from "storyblok-js-client";

import { serverEnvironment } from "../utils/serverEnvironment";
import { storyblokClient } from "./storyblokClient";

type FindStoryArgs = {
  slug: string;
  locale?: string;
  isPreview?: boolean;
  /** E.g. SoWEstimationSection.estimation, otherwise it'll just be an array of uids */
  resolveRelations?: string;
};

/**
 * Get the data for a single story, usually a page
 *
 * @throws if no story with this slug or some other connection error
 * @returns story data
 */
export const findStory = async <StoryType = PageStory>({
  slug,
  locale,
  isPreview,
  resolveRelations,
}: FindStoryArgs) => {
  const storiesParams: ISbStoriesParams = {
    version: "published",
    language: locale,
    resolve_relations: resolveRelations,
  };

  if (isPreview) {
    // set the version to draft in the preview mode
    storiesParams.version = "draft";
  }

  if (isPreview || serverEnvironment.APP_ENVIRONMENT === "development") {
    // Forces the latest content version
    storiesParams.cv = Date.now();
  }

  const response = await storyblokClient.get(
    `cdn/stories/${slug}`,
    storiesParams
  );

  const data = response.data as { story?: StoryType } | null;

  if (!data || !data.story) {
    throw new Error(`No story data received from Storyblok for slug ${slug}`);
  }

  return data;
};
