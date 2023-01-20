import React from "react";
import { ThemeProvider } from "ui/src/components/providers/ThemeProvider";
import { TRPCProvider } from "./utils/api";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { EstimationScreen } from "./screens/EstimationScreen";

export default function () {
  return (
    <TRPCProvider>
      <ThemeProvider>
        <SafeAreaProvider>
          <EstimationScreen />
        </SafeAreaProvider>
      </ThemeProvider>
    </TRPCProvider>
  );
}
