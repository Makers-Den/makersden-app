import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEstimationDetailsScreen } from "client-logic";
import { ContentWrapper } from "ui/src/components/ContentWrapper";
import { EstimationDetailsScreen as UiEstimationDetailsScreen } from "ui/src/screens/native/EstimationDetailsScreen";

import { RootStackParamList, Screens } from "../types";
import { api } from "../utils/api";


export type EstimationDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.EstimationDetails
>;

export const EstimationDetailsScreen = ({
  route,
}: EstimationDetailsScreenProps) => {
  const { estimation, isEstimationLoading } = useEstimationDetailsScreen({
    api,
    estimationSecret: route.params.secret,
  });

  return (
    <ContentWrapper>
      <UiEstimationDetailsScreen
        estimation={estimation}
        isLoading={isEstimationLoading}
      />
    </ContentWrapper>
  );
};
