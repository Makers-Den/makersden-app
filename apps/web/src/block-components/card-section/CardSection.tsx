import { CardSectionContent } from "@md/storyblok-types";
import { Box, Flex } from "native-base";

import { Card } from "../card/Card";

export const CardSection = ({ cards }: CardSectionContent) => {
  return (
    <Flex direction="row" mt="6" mb="-6" mr="-6" justifyContent="center">
      {cards.map((card) => (
        <Box key={card._uid} mr="6" mb="12">
          <Card {...card} />
        </Box>
      ))}
    </Flex>
  );
};
