import { ContentWrapper } from "@md/ui/src/components/ContentWrapper";
import React from "react";
import { Button } from "react-native";
import * as Sentry from "sentry-expo";

export const SentryErrorsScreen = () => {
  return (
    <ContentWrapper>
      <Button
        title="Test thrown error 2"
        onPress={() => {
          throw new Error("Test thrown error 2");
        }}
      />

      <Button
        title="Test captured exception 2"
        onPress={() => {
          Sentry.Native.captureException(new Error("Test captured exception 2"));
        }}
      />
    </ContentWrapper>
  );
};
