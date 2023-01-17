import { protectedProcedure, createTRPCRouter } from "../trpc";

export const estimationsRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) =>
    ctx.estimationsModule.listEstimations()
  ),
  createFromSheet: protectedProcedure.mutation(async ({ ctx }) =>
    ctx.estimationsModule.createEstimationFromSheet()
  ),
});
