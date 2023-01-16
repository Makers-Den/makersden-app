import { publicProcedure, createTRPCRouter } from "../trpc";

export const estimationsRouter = createTRPCRouter({
  testQuery: publicProcedure.query(() => {
    console.log("HITTING TEST QUERY")
    return { data: "Some query result" };
  }),
  generate: publicProcedure.mutation(() => {
    console.log("HITTING TEST MUTATION")

    return { data: "Some mutation result" };
  }),
});
