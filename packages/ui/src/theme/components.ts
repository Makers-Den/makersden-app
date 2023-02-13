export const components = {
  Input: {
    baseStyle: {
      borderRadius: "sm",
      bg: "black.200",
      color: "white",
      borderColor: "green.400",
      _focus: {
        bg: "darkBlue.400",
        borderColor: "green.800",
      },
    },
  },
  Button: {
    defaultProps: {
      colorScheme: "green",
      variant: "solid",
      size: "md",
    },
    variants: {
      // for some reason the color does not affect the font color
      link: ({ colorScheme }: { colorScheme: string }) => ({
        backgroundColor: "transparent",
        color: `${colorScheme}.400`,
      }),

      solid: ({ colorScheme }: { colorScheme: string }) => ({
        backgroundColor: `${colorScheme}.400`,
        color: "black.200",
      }),
    },
  },
  Text: {
    baseStyle: {
      color: "white",
    },
  },
  Heading: {
    baseStyle: {
      color: "white",
      fontFamily: 'heading'
    },
  },
};
