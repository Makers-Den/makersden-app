import { CardContent } from "@md/storyblok-types";
import { RichTextResolver } from "@md/ui/src/components/RichTextResolver";
import { Flex, Image, Text } from "native-base";

export const Card = ({ body, title, subTitle, image }: CardContent) => {
  return (
    <Flex width="320px" alignItems="center">
      {image && (
        <Image
          source={{ uri: image.filename }}
          alt={image.alt}
          width="150px"
          height="150px"
          resizeMode="cover"
          borderRadius="full"
          mb="3"
        />
      )}

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
