import { z } from "zod";

import { createTRPCRouter,protectedProcedure } from "../trpc";

export const estimationsRouter = createTRPCRouter({
  findOne: protectedProcedure
    .input(z.object({ secret: z.string().trim().min(1) }))
    .query(async ({ ctx, input }) =>
      ctx.estimations.findEstimation(input.secret)
    ),
});
