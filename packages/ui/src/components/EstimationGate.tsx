import {
  HStack,
  Heading,
  Input,
  Button,
  VStack,
  View,
  FormControl,
} from "native-base";
import React from "react";

export interface EstimationGateProps {
  isLoading: boolean;
  isInvalid: boolean;
  estimationSecret: string;
  onEnter: () => void;
  onEstimationSecretChange: (estimationSecret: string) => void;
  onShowExampleEstimation: () => void;
}

export const EstimationGate: React.FC<EstimationGateProps> = ({
  isLoading,
  isInvalid,
  estimationSecret,
  onEnter,
  onEstimationSecretChange,
  onShowExampleEstimation,
}) => {
  return (
    <View pt={40} justifyContent="center" alignItems="center">
      <VStack space={6} justifyContent="center" alignItems="center">
        <Heading>Enter estimation secret</Heading>

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
