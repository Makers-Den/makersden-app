import { Box } from "native-base";
import React, { ReactNode } from "react";

export type ContentWrapperProps = {
  children: ReactNode;
};

export function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <Box minH={"full"} _web={{ minH: "100vh" }} bg="black.200">
      <Box maxW={"1300px"} mx={"auto"}>
        {children}
      </Box>
    </Box>
  );
}
