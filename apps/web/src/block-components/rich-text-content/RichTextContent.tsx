import { RichTextContentContent } from "@md/storyblok-types";
import { RichTextResolver } from "@md/ui/src/components/RichTextResolver";
import { Box, Flex, Text } from "native-base";
import { ReactNode, useMemo } from "react";
import {
  NODE_IMAGE,
  NODE_LI,
  NODE_PARAGRAPH,
  NODE_UL,
} from "storyblok-rich-text-react-renderer";

import { CardSection } from "../card-section/CardSection";

interface ImageNodeResolverProps {
  alt?: string;
  title?: string;
  src?: string;
}

const ImageNodeResolver = (
  children: ReactNode,
  props: ImageNodeResolverProps
) => {
  return (
    <Box>
      <img
        style={{ width: "100%", height: "auto" }}
        src={props.src}
        alt={props.alt}
        title={props.title}
      />

      {props.alt && (
        <Flex
          mt="1"
          direction="row"
          justifyContent="center"
          fontSize="xs"
          color="gray.400"
        >
          <Text>{props.title}</Text>
        </Flex>
      )}
    </Box>
  );
};

const UlNodeResolver = (children: ReactNode) => {
  return <ol style={{ listStyleType: "disc", margin: 0 }}>{children}</ol>;
};

const LiNodeResolver = (children: ReactNode) => {
  return <li>{children}</li>;
};

const blokResolvers = {
  CardSection: (props) => <CardSection {...props} />,
};

const nodeResolvers = {
  [NODE_IMAGE]: ImageNodeResolver,
  [NODE_UL]: UlNodeResolver,
  [NODE_LI]: LiNodeResolver,
};

export const RichTextContent = (props: RichTextContentContent) => {
  return (
    <Box>
      <RichTextResolver
        richText={props.text}
        textProps={{ color: "black" }}
        granularTextProps={{ [NODE_PARAGRAPH]: { fontSize: "md", my: "3" } }}
        nodeResolvers={nodeResolvers}
        blokResolvers={blokResolvers}
      />
    </Box>
  );
};
