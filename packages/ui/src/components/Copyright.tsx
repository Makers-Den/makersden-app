import { Box, Text } from "native-base";
import React from "react";

export const Copyright = () => {
  return (
    <Text
      my={"10"}
      display={"flex"}
      justifyContent={"flex-end"}
      flexDirection={"row"}
    >
      © {new Date().getFullYear()} Makers&apos; Den. All rights reserved
    </Text>
  );
};
