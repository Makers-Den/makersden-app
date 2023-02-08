const { withNativebase } = require("@native-base/next-adapter");
const withFonts = require("next-fonts");
const withImages = require("next-images");
const { withExpo } = require("@expo/next-adapter");

module.exports = withNativebase({
  dependencies: ["@expo/next-adapter", "@md/ui"],
  plugins: [
    withFonts,
    [withExpo, { projectRoot: __dirname }],
    [withImages, { projectRoot: __dirname }],
  ],
  nextConfig: {
    projectRoot: __dirname,
    reactStrictMode: true,
    webpack5: true,
    images: {
      disableStaticImages: true,
    },
  },
});
