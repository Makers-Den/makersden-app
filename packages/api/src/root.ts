import { createTRPCRouter } from "./trpc";
import { estimationsRouter } from "./router/estimations";

export const appRouter = createTRPCRouter({
  estimations: estimationsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
