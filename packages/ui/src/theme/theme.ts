import { extendTheme } from "native-base";

import { colors } from "./colors";
import { components } from "./components";
import { fontConfig } from "./fontConfig";
import { fonts } from "./fonts";

export const theme = extendTheme({
  colors,
  components,
  fontConfig,
  fonts,
});
