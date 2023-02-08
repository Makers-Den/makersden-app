import { Flex } from "native-base";
import React, { PropsWithChildren } from "react";

export const LogoWrapper = ({ children }: PropsWithChildren) => {
  return (
    <Flex w="full" direction="row" justifyContent="center" my={8}>
      {children}
    </Flex>
  );
};
