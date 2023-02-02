import { ISbStoryData } from "storyblok-js-client";
import { EstimationContent } from "storyblok-types";

export enum Screens {
  Gate = "Gate",
  Details = "Details",
  Link = "Link",
}

export type RootStackParamList = {
  [Screens.Gate]: undefined;
  [Screens.Details]: { estimation: ISbStoryData<EstimationContent> };
  [Screens.Link]: undefined;
};
