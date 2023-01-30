import { Box } from "native-base";
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";
import React, { ReactNode, useEffect, useState } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

export type ExpandableComponentProps = {
  isExpanded: boolean;
  onClickFunction: () => void;
  headerComponent: ReactNode;
  headerWrapperStyle?: StyleProp<ViewStyle>;
  hideableComponent: ReactNode;
  wrapperProps?: InterfaceBoxProps;
};

export function ExpandableComponent({
  isExpanded,
  onClickFunction,
  headerComponent,
  headerWrapperStyle,
  hideableComponent,
  wrapperProps,
}: ExpandableComponentProps) {
  return (
    <Box {...wrapperProps}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={headerWrapperStyle}
      >
        {headerComponent}
      </TouchableOpacity>
      <Box height={isExpanded ? undefined : 0} overflow="hidden">
        {hideableComponent}
      </Box>
    </Box>
  );
}
