import React from "react";
import { Image, StyleSheet } from "react-native";

export interface LogoProps {
  isDark: boolean;
}

export const Logo = ({ isDark }: LogoProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      style={styles.image}
      source={
        isDark
          ? require("../../assets/logo-dark.png")
          : require("../../assets/logo.png")
      }
      accessibilityLabel={"Logo"}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 29,
  },
});
