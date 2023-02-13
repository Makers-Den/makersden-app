import {
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  View,
  VStack,
} from "native-base";
import React from "react";
import { Platform } from "react-native";

import { Logo } from "../components/Logo";
import { LogoWrapper } from "../components/LogoWrapper";

export interface EstimationGateScreenProps {
  isLoading: boolean;
  isInvalid: boolean;
  estimationSecret: string;
  onEnter: () => void;
  onEstimationSecretChange: (estimationSecret: string) => void;
  onShowExampleEstimation: () => void;
}

export const EstimationGateScreen = ({
  isLoading,
  isInvalid,
  estimationSecret,
  onEnter,
  onEstimationSecretChange,
  onShowExampleEstimation,
}: EstimationGateScreenProps) => {
  return (
    <View justifyContent="center" alignItems="center">
      {Platform.OS === "web" && (
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
      )}

      <VStack
        mt={Platform.OS === "web" ? 32 : 40}
        space={6}
        justifyContent="center"
        alignItems="center"
      >
        <Heading fontSize="3xl">Enter estimation secret</Heading>

        <VStack alignItems="center" space={4}>
          <FormControl isInvalid={isInvalid}>
            <Input
              size="md"
              isInvalid={isInvalid}
              isDisabled={isLoading}
              value={estimationSecret}
              onChangeText={onEstimationSecretChange}
              placeholder="Estimation secret..."
              w={48}
            />

            <HStack justifyContent="center">
              <FormControl.ErrorMessage>
                Invalid secret
              </FormControl.ErrorMessage>
            </HStack>
          </FormControl>

          <Button
            minW={24}
            isDisabled={!estimationSecret}
            isLoading={isLoading}
            onPress={onEnter}
          >
            Enter
          </Button>

          <Button
            variant="Link"
            textDecoration="underline"
            onPress={onShowExampleEstimation}
            isDisabled={isLoading}
          >
            or see example estimation
          </Button>
        </VStack>
      </VStack>
    </View>
  );
};
