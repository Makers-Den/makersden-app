import { z } from "zod";
import { protectedProcedure, createTRPCRouter } from "../trpc";

export const estimationsRouter = createTRPCRouter({
  list: protectedProcedure
    .input(z.object({ organization: z.string().trim().min(1) }))
    .query(async ({ ctx, input }) =>
      ctx.estimations.listEstimations(input.organization)
    ),
});
