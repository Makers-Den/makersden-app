import { NativeBaseProvider } from "native-base";
import React from "react";

export type ThemeProviderProps = {
  children?: React.ReactNode;
  isSSR?: boolean;
};

export function ThemeProvider({ children, isSSR }: ThemeProviderProps) {
  return <NativeBaseProvider isSSR={isSSR}>{children}</NativeBaseProvider>;
}
