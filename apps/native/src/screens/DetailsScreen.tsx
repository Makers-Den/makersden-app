import { EstimationDetails } from "ui/src/components/native/EstimationDetails";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Screens } from "../types";
import { ContentWrapper } from "ui/src/components/ContentWrapper";

export type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.Details
>;

export function DetailsScreen({ route }: DetailsScreenProps) {
  const { estimation } = route.params;

  return (
    <ContentWrapper>
      <EstimationDetails estimation={estimation} />
    </ContentWrapper>
  );
}
