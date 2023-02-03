export enum Screens {
  EstimationGate = "EstimationGate",
  EstimationDetails = "EstimationDetails",
}

export type RootStackParamList = {
  [Screens.EstimationGate]: undefined;
  [Screens.EstimationDetails]: { secret: string };
};
