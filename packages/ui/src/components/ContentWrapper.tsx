import { Box, useBreakpointValue } from "native-base";
import React, { ReactNode } from "react";

export type ContentWrapperProps = {
  children: ReactNode;
};

export const ContentWrapper = ({ children }: ContentWrapperProps) => {
  const containerStyles = useBreakpointValue({
    base: {},
    lg: {
      maxW: "1300px",
      mx: "auto",
    },
  });

  return (
    <Box minH={"full"} _web={{ minH: "100vh" }} bg="black.200">
      <Box {...containerStyles}>{children}</Box>
    </Box>
  );
};
