import { NativeBaseProvider } from "native-base";
import React from "react";
import { theme } from "../../theme/theme";

export type ThemeProviderProps = {
  children?: React.ReactNode;
  isSSR?: boolean;
};

export function ThemeProvider({ children, isSSR }: ThemeProviderProps) {
  return (
    <NativeBaseProvider theme={theme} isSSR={isSSR}>
      {children}
    </NativeBaseProvider>
  );
}
