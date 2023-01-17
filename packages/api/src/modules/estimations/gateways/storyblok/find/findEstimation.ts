import StoryblokClient, { ISbStoryData } from "storyblok-js-client";
import { EstimationContent } from "storyblok-types";
import { EstimationFindResult } from "./types";

interface FindEstimationQuery {
  client: StoryblokClient;
  environmentFolderName: string;
  name: string;
}

interface GetEstimationResponseData {
  story: ISbStoryData<EstimationContent>;
}

export const findEstimation = async (
  query: FindEstimationQuery
): Promise<EstimationFindResult> => {
  try {
    const estimationResponse = await query.client.get(
      `cdn/stories/${query.environmentFolderName}/estimations/${query.name}`,
      {
        version: "draft",
      }
    );

    const data: GetEstimationResponseData = estimationResponse.data;

    return { isError: false, estimation: data.story };
  } catch (e) {
    console.error(e);

    return {
      isError: true,
      error: {
        type: "FIND_ESTIMATION_FAILURE",
      },
    };
  }
};
