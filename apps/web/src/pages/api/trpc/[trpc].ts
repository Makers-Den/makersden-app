import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter, createTRPCContext } from "api";

import { apiModules } from "../../../utils/apiModules";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: () => createTRPCContext(apiModules),
});
