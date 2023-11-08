import { CardContent } from "@md/storyblok-types";
import { RichTextResolver } from "@md/ui/src/components/RichTextResolver";
import { Box, Flex, Text } from "native-base";
import Image from "next/image";

export const Card = ({ body, title, subTitle, image }: CardContent) => {
  return (
    <Flex width="280px" alignItems="center">
      <Box
        width="150px"
        height="150px"
        borderRadius="full"
        mb="3"
        overflow="hidden"
        position="relative"
      >
        {image && (
          <Image
            src={image.filename}
            alt={image.alt}
            objectFit="cover"
            layout="fill"
          />
        )}
      </Box>

      <Flex alignItems="center" mb="6">
        <Text color="black" fontWeight="bold">
          {title}
        </Text>
        <Text color="gray.400">{subTitle}</Text>
      </Flex>

      <RichTextResolver textProps={{ color: "black" }} richText={body} />
    </Flex>
  );
};
