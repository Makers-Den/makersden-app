import { AppRouter as ApiAppRouter } from "api";

export { useEstimationScreen } from "./hooks/useEstimationScreen";
export { type Api } from "./types/api";
// App router is exported here, because otherwise it would not be present in index.d.ts Api type generic.
export type AppRouter = ApiAppRouter;
