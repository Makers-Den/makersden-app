import React from "react";
import { EstimationScreen as UiEstimationScreen } from "ui";

import { useEstimationScreen } from "client-logic";
import { api } from "../utils/api";
import { environment } from "../utils/environment";

export function EstimationScreen() {
  const {
    estimation,
    estimationSecret,
    isEstimationLoading,
    isSecretInvalid,
    handleEnter,
    handleEstimationSecretChange,
    handleShowExampleEstimation,
  } = useEstimationScreen({
    api,
    exampleEstimationSecret: environment.EXAMPLE_ESTIMATION_SECRET,
  });

  return (
    <UiEstimationScreen
      estimation={estimation}
      estimationSecret={estimationSecret}
      isInvalid={isSecretInvalid}
      isLoading={isEstimationLoading}
      onEnter={handleEnter}
      onEstimationSecretChange={handleEstimationSecretChange}
      onShowExampleEstimation={handleShowExampleEstimation}
    />
  );
}
