import { HStack, Spinner, Heading } from "native-base";
import React from "react";

export const EstimationDetails = () => {
  return (
    <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading posts" />
      <Heading color="primary.500" fontSize="md">
        @TODO Add estimation details view
      </Heading>
    </HStack>
  );
};
