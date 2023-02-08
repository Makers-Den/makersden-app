import type { AppRouter } from "@md/api";
import type { createTRPCNext } from "@trpc/next";
import type { createTRPCReact } from "@trpc/react-query";

export type Api =
  | ReturnType<typeof createTRPCNext<AppRouter>>
  | ReturnType<typeof createTRPCReact<AppRouter>>;
