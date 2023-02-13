import { ThemeProvider } from "@md/ui/src/components/providers/ThemeProvider";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { fonts } from "./fonts";
import { Navigation } from "./Navigation";
import { TRPCProvider } from "./utils/api";

SplashScreen.preventAutoHideAsync();

const App = () => {
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
      <SafeAreaProvider onLayout={handleLayoutRootView}>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </SafeAreaProvider>
    </TRPCProvider>
  );
};

export default App;
