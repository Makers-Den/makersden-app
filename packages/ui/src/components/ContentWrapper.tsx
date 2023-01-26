import { Box } from "native-base";
import React, { ReactNode } from "react";

export type ContentWrapperProps = {
  children: ReactNode;
};

export function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <Box minH={"full"} bg="black.200">
      {children}
    </Box>
  );
}
