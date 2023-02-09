# Makers' Den App

## Main features

- generates estimations for a project based on google sheets data

## Apps and Packages

- `native`: a [react-native](https://reactnative.dev/) app built with [expo](https://docs.expo.dev/)
- `web`: a [Next.js](https://nextjs.org/) app built with [react-native-web](https://necolas.github.io/react-native-web/)
- `ui`: a stub [react-native](https://reactnative.dev/) component library shared by both `web` and `native` applications
- `api`: re-usable backend code shared by both `expo` and `native` applications
- `client-logic`: re-usable client logic shared by both `expo` and `native` applications
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
4. Run the following command to start the Expo app (we keep this separate from the NextJS app so that we can leverage the Expo interactive CLI tools and choose simulator platform):
   ```sh
   yarn dev:ios
   ```
   or
   ```sh
   yarn dev:android
   ```
5. To lint the codebase, run:
   ```sh
   yarn lint:fix
   ```
