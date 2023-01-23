import React from "react";
import { EstimationScreen as UiEstimationScreen } from "ui";

import { useEstimationScreen } from "client-logic";
import { api } from "../utils/api";

export function EstimationScreen() {
  const {
    estimation,
    estimationSecret,
    isEstimationLoading,
    isSecretInvalid,
    handleEnter,
    handleEstimationSecretChange,
  } = useEstimationScreen({ api });

  return (
    <UiEstimationScreen
      estimation={estimation}
      estimationSecret={estimationSecret}
      isInvalid={isSecretInvalid}
      isLoading={isEstimationLoading}
      onEnter={handleEnter}
      onEstimationSecretChange={handleEstimationSecretChange}
    />
  );
}
