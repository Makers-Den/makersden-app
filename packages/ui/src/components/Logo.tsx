import React from "react";
import { Image, StyleSheet } from "react-native";

export const Logo = () => {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image style={styles.image} source={require("../../assets/logo.png")} />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 29,
  },
});
