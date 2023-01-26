import React from "react";
import { ThemeProvider } from "ui/src/components/providers/ThemeProvider";
import { ContentWrapper } from "ui/src/components/ContentWrapper";
import { TRPCProvider } from "./utils/api";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { EstimationScreen } from "./screens/EstimationScreen";

export default function () {
  return (
    <TRPCProvider>
      <ThemeProvider>
        <SafeAreaProvider>
          <SafeAreaView>
            <ContentWrapper>
              <EstimationScreen />
            </ContentWrapper>
          </SafeAreaView>
        </SafeAreaProvider>
      </ThemeProvider>
    </TRPCProvider>
  );
}
