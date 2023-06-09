import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const estimationsRouter = createTRPCRouter({
  findOne: protectedProcedure
    .input(
      z.object({
        secret: z.string().trim().min(1),
        preview: z.boolean().optional(),
      })
    )
    .query(({ ctx, input }) =>
      ctx.estimations.findEstimation(input.secret, input.preview ?? false)
    ),
  notifyOpened: protectedProcedure
    .input(
      z.object({
        secret: z.string().trim().min(1),
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.estimations.notifyEstimationOpened(input.secret, ctx.ipAddress)
    ),
});
