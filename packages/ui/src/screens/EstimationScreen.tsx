import React from "react";
import { ISbStoryData } from "storyblok-js-client";
import { EstimationContent } from "storyblok-types";
import { EstimationDetails } from "../components/EstimationDetails";
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

export const EstimationScreen: React.FC<EstimationScreenProps> = ({
  isLoading,
  isInvalid,
  estimation,
  estimationSecret,
  onEnter,
  onEstimationSecretChange,
  onShowExampleEstimation,
}) => {
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
