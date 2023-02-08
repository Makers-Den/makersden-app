import { EstimationContent } from "@md/storyblok-types";
import { ISbStoryData } from "storyblok-js-client";

export type EstimationFindResult =
  | EstimationFindErrorResult
  | EstimationFindSuccessResult;

export interface EstimationFindErrorResult {
  isError: true;
  error: EstimationFindError;
}

export interface EstimationFindSuccessResult {
  isError: false;
  estimation: ISbStoryData<EstimationContent> | null;
}

export type EstimationFindError = EstimationFindFailureError;

export interface EstimationFindFailureError {
  type: "FIND_ESTIMATIONS_FAILURE";
}
