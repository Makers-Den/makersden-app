import { EstimationContent } from "@md/storyblok-types";
import React from "react";
import { ISbStoryData } from "storyblok-js-client";

import { EstimationLoader } from "../../components/EstimationLoader";
import { EstimationNotFound } from "../../components/EstimationNotFound";
import { EstimationDetails } from "../../components/web/EstimationDetails";

export interface EstimationDetailsScreenProps {
  estimation: ISbStoryData<EstimationContent> | null;
  isLoading: boolean;
}

export const EstimationDetailsScreen: React.FC<
  EstimationDetailsScreenProps
> = ({ estimation, isLoading }) => {
  if (isLoading) {
    return <EstimationLoader />;
  }

  if (!estimation) {
    return <EstimationNotFound />;
  }

  return <EstimationDetails estimation={estimation} />;
};
