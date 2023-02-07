import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "ui/src/components/providers/ThemeProvider";

import { Navigation } from "./Navigation";
import { TRPCProvider } from "./utils/api";

const App = () => (
  <TRPCProvider>
    <ThemeProvider>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </ThemeProvider>
  </TRPCProvider>
)

export default App