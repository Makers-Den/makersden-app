import type { createTRPCNext } from "@trpc/next";
import type { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "api";

export type Api =
  | ReturnType<typeof createTRPCNext<AppRouter>>
  | ReturnType<typeof createTRPCReact<AppRouter>>;
