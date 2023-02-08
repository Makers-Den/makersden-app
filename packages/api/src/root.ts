import { estimationsRouter } from "./router/estimations";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  estimations: estimationsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
