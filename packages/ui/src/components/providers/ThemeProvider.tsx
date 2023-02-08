import { NativeBaseProvider } from "native-base";
import React from "react";

import { theme } from "../../theme/theme";

export type ThemeProviderProps = {
  children?: React.ReactNode;
  isSSR?: boolean;
};

export const ThemeProvider = ({ children, isSSR }: ThemeProviderProps) => (
  <NativeBaseProvider theme={theme} isSSR={isSSR}>
    {children}
  </NativeBaseProvider>
);
