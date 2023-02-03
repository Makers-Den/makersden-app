import React from "react";
import { EstimationGateScreen as UiEstimationGateScreen } from "ui/src/screens/EstimationGateScreen";
import { useEstimationGateScreen } from "client-logic";
import { api } from "../utils/api";
import { environment } from "../utils/environment";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Screens } from "../types";
import { ContentWrapper } from "ui/src/components/ContentWrapper";

export type EstimationGateScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.EstimationGate
>;

export function EstimationGateScreen({
  navigation,
}: EstimationGateScreenProps) {
  const {
    estimationSecret,
    isEstimationLoading,
    isSecretInvalid,
    handleEnter,
    handleEstimationSecretChange,
    handleShowExampleEstimation,
  } = useEstimationGateScreen({
    api,
    exampleEstimationSecret: environment.EXAMPLE_ESTIMATION_SECRET,
    onSuccess: (secret) => {
      navigation.push(Screens.EstimationDetails, { secret });
    },
  });

  return (
    <ContentWrapper>
      <UiEstimationGateScreen
        estimationSecret={estimationSecret}
        isInvalid={isSecretInvalid}
        isLoading={isEstimationLoading}
        onEnter={handleEnter}
        onEstimationSecretChange={handleEstimationSecretChange}
        onShowExampleEstimation={handleShowExampleEstimation}
      />
    </ContentWrapper>
  );
}
