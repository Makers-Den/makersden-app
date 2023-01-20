import StoryblokClient from "storyblok-js-client";
import { EstimationContent } from "storyblok-types";
import { EstimationCreateResult } from "./types";

interface CreateEstimationCommand {
  client: StoryblokClient;
  spaceId: string;
  folderId: string;
  estimation: EstimationContent;
}

export const createEstimation = async (
  command: CreateEstimationCommand
): Promise<EstimationCreateResult> => {
  try {
    await command.client.post(`spaces/${command.spaceId}/stories`, {
      story: {
        name: `${command.estimation.organization} - ${command.estimation.title}`,
        slug: command.estimation.secret,
        parent_id: command.folderId,
        content: command.estimation,
      },
      publish: 1
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
