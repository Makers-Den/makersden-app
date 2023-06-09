import Image from "next/image";
import React from "react";

export interface LogoProps {
  isDark: boolean;
}

export const Logo = ({ isDark }: LogoProps) => {
  return (
    <Image
      width={200}
      height={29}
      alt="Logo"
      src={
        isDark
          ? require("../../assets/logo-dark.png")
          : require("../../assets/logo.png")
      }
    />
  );
};
