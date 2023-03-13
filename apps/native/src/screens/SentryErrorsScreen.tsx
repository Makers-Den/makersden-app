import { ContentWrapper } from "@md/ui/src/components/ContentWrapper";
import React from "react";
import { Button } from "react-native";
import * as Sentry from "sentry-expo";

export const SentryErrorsScreen = () => {
  return (
    <ContentWrapper>
      <Button
        title="Test thrown error"
        onPress={() => {
          throw new Error("Test thrown error");
        }}
      />

      <Button
        title="Test captured exception"
        onPress={() => {
          Sentry.Native.captureException(new Error("Test captured exception"));
        }}
      />
    </ContentWrapper>
  );
};
