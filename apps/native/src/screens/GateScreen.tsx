import React from "react";
import { EstimationGate } from "ui/src/components/EstimationGate";
import { useEstimationScreen } from "client-logic";
import { api } from "../utils/api";
import { environment } from "../utils/environment";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Screens } from "../types";
import { ContentWrapper } from "ui/src/components/ContentWrapper";

export type GateScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.Gate
>;

export function GateScreen({ navigation }: GateScreenProps) {
  const {
    estimationSecret,
    isEstimationLoading,
    isSecretInvalid,
    handleEnter,
    handleEstimationSecretChange,
    handleShowExampleEstimation,
  } = useEstimationScreen({
    api,
    exampleEstimationSecret: environment.EXAMPLE_ESTIMATION_SECRET,
    onSuccess: (data) => {
      navigation.push(Screens.Details, { estimation: data });
    },
  });

  return (
    <ContentWrapper>
      <EstimationGate
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
