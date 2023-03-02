import { ThemeProvider } from "@md/ui/src/components/providers/ThemeProvider";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient,QueryClientProvider } from "react-query";

import { fonts } from "./fonts";
import { Navigation } from "./Navigation";
import { TRPCProvider } from "./utils/api";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [fontsLoaded] = useFonts(fonts);

  const handleLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TRPCProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider onLayout={handleLayoutRootView}>
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </TRPCProvider>
  );
};

export default App;
