import { AppRouter as ApiAppRouter } from "@md/api";

export { useEstimationDetailsScreen } from "./hooks/screens/useEstimationDetailsScreen";
export { useEstimationGateScreen } from "./hooks/screens/useEstimationGateScreen";
export { useArray } from "./hooks/useArray";
export { type Api } from "./types/api";
export { getStringFromReactNode } from "./utils/getStringFromReactNode";
export { sentenceToId } from "./utils/sentenceToId";
// App router is exported here, because otherwise it would not be present in index.d.ts Api type generic.
export type AppRouter = ApiAppRouter;
