import React from "react";
import { ThemeProvider } from "ui/src/components/providers/ThemeProvider";
import { TRPCProvider } from "./utils/api";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Navigation } from "./Navigation";

export default function () {
  return (
    <TRPCProvider>
      <ThemeProvider>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </ThemeProvider>
    </TRPCProvider>
  );
}
