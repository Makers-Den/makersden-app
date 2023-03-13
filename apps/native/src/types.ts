export enum Screens {
  EstimationGate = "EstimationGate",
  EstimationDetails = "EstimationDetails",
  SentryErrors = "SentryErrors",
}

export type RootStackParamList = {
  [Screens.EstimationGate]: undefined;
  [Screens.EstimationDetails]: { secret: string };
  [Screens.SentryErrors]: undefined;
};
