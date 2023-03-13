import StoryblokClient from "storyblok-js-client";

import { EstimationFindResult } from "./types";

interface FindEstimationQuery {
  client: StoryblokClient;
  environmentFolderName: string;
  secret: string;
  preview?:boolean;
}

export const findEstimation = async (
  query: FindEstimationQuery,
): Promise<EstimationFindResult> => {
  try {
    const estimations = await query.client.getAll(`cdn/stories`, {
      version: query.preview ? "draft" : "published",
      per_page: 1,
      starts_with: `${query.environmentFolderName}/estimations`,
      page: 1,
      cv: Date.now(),
      filter_query: {
        secret: { in: query.secret },
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { isError: false, estimation: (estimations as any)?.[0] || null };
  } catch (e) {
    console.error(e);

    return {
      isError: true,
      error: {
        type: "FIND_ESTIMATIONS_FAILURE",
      },
    };
  }
};
