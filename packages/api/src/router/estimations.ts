import { protectedProcedure, createTRPCRouter } from "../trpc";

export const estimationsRouter = createTRPCRouter({
  createFromSheet: protectedProcedure.mutation(async ({ ctx }) =>
    ctx.estimationsModule.createEstimationFromSheet()
  ),
});
