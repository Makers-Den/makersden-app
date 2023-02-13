import { Box, Pressable } from "native-base";
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";
import React, { ReactNode } from "react";

export type ExpandableComponentProps = {
  isExpanded: boolean;
  onClick: () => void;
  headerComponent: (state: {
    isPressed: boolean;
    isHovered: boolean;
    isFocused: boolean;
  }) => React.ReactNode;
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
    <Pressable onPress={onClick}>{headerComponent}</Pressable>
    <div
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
