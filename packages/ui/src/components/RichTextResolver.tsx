import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_LINK,
  MARK_STRIKE,
  MARK_STYLED,
  MARK_UNDERLINE,
  NODE_BR,
  NODE_CODEBLOCK,
  NODE_HEADING,
  NODE_HR,
  NODE_IMAGE,
  NODE_LI,
  NODE_OL,
  NODE_PARAGRAPH,
  NODE_QUOTE,
  NODE_UL,
  render,
  RenderOptions,
} from "storyblok-rich-text-react-renderer";
import { StoryblockRichTextContent } from "storyblok-types";

import React from "react";
import { Heading, Link, Text, Image, VStack, Divider } from "native-base";
import { ThemeComponentSizeType } from "native-base/lib/typescript/components/types";

export type RichTextResolverProps = {
  richText: StoryblockRichTextContent;
};

const defaultRenderOptions: RenderOptions = {
  markResolvers: {
    [MARK_BOLD]: (children) => (
      <Text bold display={"inline"}>
        {children}
      </Text>
    ),
    [MARK_ITALIC]: (children) => (
      <Text italic display={"inline"}>
        {children}
      </Text>
    ),
    [MARK_STRIKE]: (children) => (
      <Text strikeThrough display={"inline"}>
        {children}
      </Text>
    ),
    [MARK_UNDERLINE]: (children) => (
      <Text underline display={"inline"}>
        {children}
      </Text>
    ),
    [MARK_CODE]: (children) => <Text display={"inline"}>{children}</Text>,
    [MARK_STYLED]: (children) => <Text display={"inline"}>{children}</Text>,
    [MARK_LINK]: (children, { href, target }) => (
      <Link href={href} isExternal={target === "_blank"} display={"inline"}>
        {children}
      </Link>
    ),
  },

  nodeResolvers: {
    [NODE_HEADING]: (children, { level }) => {
      const sizeMap: Record<typeof level, ThemeComponentSizeType<"Heading">> = {
        1: "3xl",
        2: "2xl",
        3: "xl",
        4: "lg",
        5: "md",
        6: "sm",
      };
      return <Heading size={sizeMap[level]}>{children}</Heading>;
    },
    [NODE_CODEBLOCK]: (children) => {
      return <Text>{children}</Text>;
    },
    [NODE_IMAGE]: (children, { src, alt }) => {
      return <Image src={src} alt={alt} />;
    },
    [NODE_PARAGRAPH]: (children) => {
      return <Text>{children}</Text>;
    },
    [NODE_QUOTE]: (children) => {
      return <Text italic>"{children}"</Text>;
    },
    [NODE_OL]: (children) => {
      return <VStack>{children}</VStack>;
    },
    [NODE_UL]: (children) => {
      return <VStack>{children}</VStack>;
    },
    [NODE_LI]: (children) => {
      return <Text>{children}</Text>;
    },
    [NODE_HR]: () => {
      return <Divider />;
    },
    [NODE_BR]: () => {
      return <>{"\n"}</>;
    },
  },
};

export function RichTextResolver({ richText }: RichTextResolverProps) {
  return <>{render(richText, defaultRenderOptions)}</>;
}
