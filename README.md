# Makers' Den App

## Main features

- [Generates estimations for a project based on google sheets data](https://github.com/Makers-Den/makersden-app/blob/development/docs/features/generate-estimation-based-on-google-sheet-data.md)

## Apps and Packages

- `native`: a [react-native](https://reactnative.dev/) app built with [expo](https://docs.expo.dev/)
- `web`: a [Next.js](https://nextjs.org/) app built with [react-native-web](https://necolas.github.io/react-native-web/)
- `ui`: a stub [react-native](https://reactnative.dev/) component library shared by both `web` and `native` applications
- `api`: re-usable backend code shared by both `web` and `native` applications
- `client-logic`: re-usable client logic shared by both `web` and `native` applications
- `storyblok-types`: types for our [Storyblok](https://www.storyblok.com/) content
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `eslint-config-custom`: custom [eslint](https://eslint.org/) config used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Running the app locally

1. Copy the `.env` file to `.env.local` and fill in the values in `web` directory. You can find secrets in our company Bitwarden vault.
2. Run the following command to install dependencies:
   ```sh
   yarn
   ```
3. Run the following command to start the NextJS app:
   ```sh
   yarn dev
   ```
4. Install Expo CLI by running:

   ```sh
   npm i -g expo-cli@6.0.8
   ```

5. Run the following command to start the Expo app (we keep this separate from the NextJS app so that we can leverage the Expo interactive CLI tools and choose simulator platform):
   ```sh
   yarn dev:ios
   ```
   or
   ```sh
   yarn dev:android
   ```
6. To lint the codebase, run:
   ```sh
   yarn lint:fix
   ```

## Useful URLs

### Common

- [Github](https://github.com/Makers-Den/makersden-app)
- [Expo](https://expo.dev/accounts/makers-den/projects/makers-den-app)
- [Google Play Console](https://play.google.com/console/u/0/developers/6345751192958164007/app/4972300878448480167/app-dashboard)
- [App Store Connect](https://appstoreconnect.apple.com/apps/1662830466/appstore/ios/version/deliverable)

### Production

- [Web](https://app.makersden.io/)
- [Google Play Store](https://play.google.com/store/apps/details?id=io.makersden.app)
- [Apple Store](https://apps.apple.com/us/app/makers-den-app/id1662830466)

### Staging

- [Web](https://staging.app.makersden.io/)
- [Google Play Store](https://play.google.com/apps/test/io.makersden.app/55) (remember to adjust the version code in the URL)
- [Apple Store](https://appstoreconnect.apple.com/apps/1662830466/testflight/groups/54f472ec-0213-42b1-8022-333a7342f30f)
