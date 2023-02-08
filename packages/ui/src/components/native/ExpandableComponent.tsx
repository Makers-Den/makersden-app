import { Box } from "native-base";
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";
import React, { ReactNode } from "react";
import { TouchableOpacity } from "react-native";

export type ExpandableComponentProps = {
  isExpanded: boolean;
  onClick: () => void;
  headerComponent: ReactNode;
  hideableComponent: ReactNode;
  wrapperProps?: InterfaceBoxProps;
};

export const ExpandableComponent = ({
  isExpanded,
  onClick,
  headerComponent,
  hideableComponent,
  wrapperProps,
}: ExpandableComponentProps) => (
  <Box {...wrapperProps}>
    <TouchableOpacity activeOpacity={0.8} onPress={onClick}>
      {headerComponent}
    </TouchableOpacity>
    <Box height={isExpanded ? undefined : 0} overflow="hidden">
      {hideableComponent}
    </Box>
  </Box>
);
