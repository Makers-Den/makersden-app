import { ISbStoryData } from "storyblok-js-client";
import { EstimationContent } from "storyblok-types";

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
