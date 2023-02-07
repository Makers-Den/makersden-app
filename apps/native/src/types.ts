export enum Screens {
  // eslint-disable-next-line unused-imports/no-unused-vars
  EstimationGate = "EstimationGate",
  // eslint-disable-next-line unused-imports/no-unused-vars
  EstimationDetails = "EstimationDetails",
}

export type RootStackParamList = {
  [Screens.EstimationGate]: undefined;
  [Screens.EstimationDetails]: { secret: string };
};
