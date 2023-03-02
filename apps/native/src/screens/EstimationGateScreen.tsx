import { useEstimationGateScreen } from "@md/client-logic";
import { ContentWrapper } from "@md/ui/src/components/ContentWrapper";
import { EstimationGateScreen as UiEstimationGateScreen } from "@md/ui/src/screens/EstimationGateScreen";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button } from "react-native";
import * as Sentry from "sentry-expo";

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
      <Button
        title="Test thrown error"
        onPress={() => {
          throw new Error("Test thrown error");
        }}
      />

      <Button
        title="Test captured exception"
        onPress={() => {
          Sentry.Native.captureException(new Error("Test captured exception"));
        }}
      />

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
