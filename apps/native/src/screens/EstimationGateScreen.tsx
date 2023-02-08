import { useEstimationGateScreen } from "@md/client-logic";
import { ContentWrapper } from "@md/ui/src/components/ContentWrapper";
import { EstimationGateScreen as UiEstimationGateScreen } from "@md/ui/src/screens/EstimationGateScreen";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";

import { RootStackParamList, Screens } from "../types";
import { api } from "../utils/api";
import { environment } from "../utils/environment";

export type EstimationGateScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.EstimationGate
>;


export const EstimationGateScreen = ({
  navigation,
}: EstimationGateScreenProps) => {
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
};
