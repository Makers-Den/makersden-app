import { z } from "zod";
import { protectedProcedure, createTRPCRouter } from "../trpc";

export const estimationsRouter = createTRPCRouter({
  list: protectedProcedure
    .input(z.object({ organization: z.string().trim().min(1) }))
    .query(async ({ ctx, input }) =>
      ctx.estimationsModule.listEstimations(input.organization)
    ),
  createFromSheet: protectedProcedure.mutation(async ({ ctx }) =>
    ctx.estimationsModule.createEstimationFromSheet()
  ),
});
