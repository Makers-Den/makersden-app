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
}

export const EstimationGate: React.FC<EstimationGateProps> = ({
  isLoading,
  isInvalid,
  estimationSecret,
  onEnter,
  onEstimationSecretChange,
}) => {
  return (
    <View pt={48} justifyContent="center" alignItems="center">
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
        </VStack>
      </VStack>
    </View>
  );
};
