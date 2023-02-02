import React from "react";
import { ISbStoryData } from "storyblok-js-client";
import { EstimationContent } from "storyblok-types";
import { EstimationDetails } from "../components/web/EstimationDetails";
import { EstimationGate } from "../components/EstimationGate";

export interface EstimationScreenProps {
  isLoading: boolean;
  isInvalid: boolean;
  estimation: ISbStoryData<EstimationContent> | null;
  estimationSecret: string;
  onEnter: () => void;
  onEstimationSecretChange: (estimationSecret: string) => void;
  onShowExampleEstimation: () => void;
}

export const EstimationScreen = ({
  isLoading,
  isInvalid,
  estimation,
  estimationSecret,
  onEnter,
  onEstimationSecretChange,
  onShowExampleEstimation,
}: EstimationScreenProps) => {
  if (!estimation) {
    return (
      <EstimationGate
        estimationSecret={estimationSecret}
        isInvalid={isInvalid}
        isLoading={isLoading}
        onEnter={onEnter}
        onEstimationSecretChange={onEstimationSecretChange}
        onShowExampleEstimation={onShowExampleEstimation}
      />
    );
  }

  return <EstimationDetails estimation={estimation} />;
};
