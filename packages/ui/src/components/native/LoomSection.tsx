import { Box, Flex, Heading, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

export interface LoomSectionProps {
  onOpenVideo?: VoidFunction;
}

export const LoomSection = ({ onOpenVideo }: LoomSectionProps) => {
  return (
    <Box>
      <Heading fontSize="lg" mb="4">
        Video Presentation
      </Heading>
      <Flex justifyItems="flex-start" direction="row">
        <TouchableOpacity activeOpacity={0.8} onPress={onOpenVideo}>
          <Text color={"green.400"} underline>
            Open video
          </Text>
        </TouchableOpacity>
      </Flex>
    </Box>
  );
};
