import { useEstimationDetailsScreen } from "@md/client-logic";
import { ContentWrapper } from "@md/ui/src/components/ContentWrapper";
import { EstimationDetailsScreen as UiEstimationDetailsScreen } from "@md/ui/src/screens/native/EstimationDetailsScreen";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

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
