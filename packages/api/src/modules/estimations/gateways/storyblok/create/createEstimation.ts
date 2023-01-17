import StoryblokClient from "storyblok-js-client";
import { EstimationContent } from 'storyblok-types';
import { EstimationCreateResult } from "./types";

interface CreateEstimationCommand {
  client: StoryblokClient;
  spaceId: string;
  folderId: string;
  name: string;
  estimation: EstimationContent;
}

export const createEstimation = async (
  command: CreateEstimationCommand
): Promise<EstimationCreateResult> => {
  try {
    await command.client.post(`spaces/${command.spaceId}/stories`, {
      story: {
        name: command.name,
        slug: command.name,
        parent_id: command.folderId,
        content: command.estimation,
      },
    });

    return { isError: false };
  } catch (e) {
    console.error(e);

    return {
      isError: true,
      error: {
        type: "CREATE_ESTIMATION_FAILURE",
      },
    };
  }
};
