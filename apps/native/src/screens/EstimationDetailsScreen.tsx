import { EstimationDetailsScreen as UiEstimationDetailsScreen } from "ui/src/screens/native/EstimationDetailsScreen";
import { useEstimationDetailsScreen } from "client-logic";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Screens } from "../types";
import { ContentWrapper } from "ui/src/components/ContentWrapper";
import { api } from "../utils/api";

export type EstimationDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.EstimationDetails
>;

export function EstimationDetailsScreen({
  route,
}: EstimationDetailsScreenProps) {
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
}
