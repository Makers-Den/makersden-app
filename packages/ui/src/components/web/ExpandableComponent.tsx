import { Box, Pressable, VStack } from "native-base";
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { StyleProp, ViewStyle } from "react-native";

export type ExpandableComponentProps = {
  isExpanded: boolean;
  onClickFunction: () => void;
  headerComponent: (state: {
    isPressed: boolean;
    isHovered: boolean;
    isFocused: boolean;
  }) => React.ReactNode;
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
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <Box {...wrapperProps}>
      <Pressable onPress={onClickFunction} style={headerWrapperStyle}>
        {headerComponent}
      </Pressable>
      <div
        ref={divRef}
        style={{
          maxHeight: isExpanded ? "500px" : "0px",
          transition: "max-height 0.8s ease-out",
          overflow: "hidden",
        }}
      >
        {hideableComponent}
      </div>
    </Box>
  );
}
