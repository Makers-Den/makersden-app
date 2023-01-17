import { ISbStoryData } from "storyblok-js-client";
import { EstimationContent } from "storyblok-types";

export type EstimationFindManyResult =
  | EstimationFindManyErrorResult
  | EstimationFindManySuccessResult;

export interface EstimationFindManyErrorResult {
  isError: true;
  error: EstimationFindManyError;
}

export interface EstimationFindManySuccessResult {
  isError: false;
  estimations: ISbStoryData<EstimationContent>[];
}

export type EstimationFindManyError = EstimationFindManyFailureError;

export interface EstimationFindManyFailureError {
  type: "FIND_MANY_ESTIMATIONS_FAILURE";
}
