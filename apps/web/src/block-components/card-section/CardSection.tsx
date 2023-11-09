import { CardContent, CardSectionContent } from "@md/storyblok-types";
import { Box, HStack, VStack } from "native-base";

import { Card } from "../card/Card";

export const CardSection = ({ cards }: CardSectionContent) => {
  const createRows = (contents: CardContent[]): CardContent[][] => {
    const rows: CardContent[][] = [];

    for (let i = 0; i < contents.length; i += 2) {
      const row: CardContent[] = [];
      row.push(contents[i]);

      if (i + 1 < contents.length) {
        row.push(contents[i + 1]);
      }

      rows.push(row);
    }

    return rows;
  };

  const rows = createRows(cards);

  return (
    <VStack>
      {rows.map((row) => (
        <HStack direction="row" mt="6" mb="-6" mr="-6" justifyContent="center">
          {row.map((card) => (
            <Box key={card._uid} mr="6" mb="12">
              <Card {...card} />
            </Box>
          ))}
        </HStack>
      ))}
    </VStack>
  );
};
