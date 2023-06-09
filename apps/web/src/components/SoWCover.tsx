import { format } from "date-fns";
import { Box, Heading, Text } from "native-base";

export interface SoWCoverProps {
  author: string;
  date: string;
  subTitle: string;
  title: string;
}

export const SoWCover = ({ author, date, subTitle, title }: SoWCoverProps) => {
  return (
    <Box>
      <Heading size="3xl" color="black" mb="2">
        {title}
      </Heading>
      <Text fontSize="md" color="gray.400">
        {subTitle}
      </Text>

      <Box mt="16">
        <Text color="black">{author}</Text>
        <Text color="black">{format(new Date(date), "dd.MM.y")}</Text>
      </Box>
    </Box>
  );
};
