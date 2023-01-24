export default {
  expo: {
    name: "makers-den-app",
    slug: "makers-den-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#131825",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: false,
      bundleIdentifier: "io.makersden.app",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#131825",
      },
      package: "io.makersden.app",
    },
    extra: {
      API_URL: process.env.API_URL,
      EXAMPLE_ESTIMATION_SECRET: process.env.EXAMPLE_ESTIMATION_SECRET,
      eas: {
        projectId: "83d2d396-105f-48c9-aa90-973cb4170235",
      },
    },
    owner: "makers-den",
  },
};
