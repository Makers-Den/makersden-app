import { Box, useBreakpointValue } from "native-base";
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";
import React, { ReactNode } from "react";

export interface ContentWrapperProps extends InterfaceBoxProps {
  children: ReactNode;
}

export const ContentWrapper = ({
  children,
  ...wrapperProps
}: ContentWrapperProps) => {
  const containerStyles = useBreakpointValue({
    base: {},
    lg: {
      maxW: "1300px",
      mx: "auto",
    },
  });

  return (
    <Box
      minH={"full"}
      _web={{ minH: "100vh" }}
      bg="black.200"
      {...wrapperProps}
    >
      <Box width="100%" {...containerStyles}>
        {children}
      </Box>
    </Box>
  );
};
