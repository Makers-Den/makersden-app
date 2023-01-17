import StoryblokClient from "storyblok-js-client";
import { EstimationFindManyResult } from "./types";

interface FindManyEstimationsQuery {
  client: StoryblokClient;
  environmentFolderName: string;
  version: "draft" | "published";
}

export const findManyEstimations = async (
  query: FindManyEstimationsQuery
): Promise<EstimationFindManyResult> => {
  try {
    const estimations = await query.client.getAll(`cdn/stories`, {
      version: query.version,
      per_page: 50,
      starts_with: `${query.environmentFolderName}/estimations`,
      page: 1,
    });

    return { isError: false, estimations: estimations as any };
  } catch (e) {
    console.error(e);

    return {
      isError: true,
      error: {
        type: "FIND_MANY_ESTIMATIONS_FAILURE",
      },
    };
  }
};
