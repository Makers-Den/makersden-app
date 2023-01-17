import StoryblokClient from "storyblok-js-client";
import { findManyEstimations } from "../gateways/storyblok/findMany/findManyEstimations";

export interface ListEstimationsQuery {
  storyblokReadClient: StoryblokClient;
  storyblokEnvironmentFolderName: string;
}

export const listEstimations = async (query: ListEstimationsQuery) => {
  return findManyEstimations({
    client: query.storyblokReadClient,
    environmentFolderName: query.storyblokEnvironmentFolderName,
    version: "published",
  });
};
