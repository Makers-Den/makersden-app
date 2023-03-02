import { ThemeProvider } from "@md/ui/src/components/providers/ThemeProvider";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Sentry from "sentry-expo";

import { fonts } from "./fonts";
import { Navigation } from "./Navigation";
import { TRPCProvider } from "./utils/api";
import { environment } from "./utils/environment";

SplashScreen.preventAutoHideAsync();

if (environment.SENTRY_DSN) {
  Sentry.init({ dsn: environment.SENTRY_DSN });
}

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
