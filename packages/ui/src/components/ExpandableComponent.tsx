import { Box } from "native-base";
import React, { ReactNode, useEffect, useState } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

export type ExpandableComponentProps = {
  isExpanded: boolean;
  onClickFunction: () => void;
  headerComponent: ReactNode;
  headerWrapperStyle?: StyleProp<ViewStyle>;
  hideableComponent: ReactNode;
};

export function ExpandableComponent({
  isExpanded,
  onClickFunction,
  headerComponent,
  headerWrapperStyle,
  hideableComponent,
}: ExpandableComponentProps) {
  const [layoutHeight, setLayoutHeight] = useState<undefined | 0>(0);

  useEffect(() => {
    if (isExpanded) {
      setLayoutHeight(undefined);
    } else {
      setLayoutHeight(0);
    }
  }, [isExpanded]);

  return (
    <Box>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={headerWrapperStyle}
      >
        {headerComponent}
      </TouchableOpacity>
      <Box height={layoutHeight} overflow="hidden">
        {hideableComponent}
      </Box>
    </Box>
  );
}
