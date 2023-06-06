import { getStringFromReactNode, sentenceToId } from "@md/client-logic";
import { StoryblockRichTextContent } from "@md/storyblok-types";
import {
  Divider,
  Heading,
  Image,
  ITextProps,
  Link,
  Text,
  VStack,
} from "native-base";
import { ThemeComponentSizeType } from "native-base/lib/typescript/components/types";
import React, { useCallback, useMemo } from "react";
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

export type MarkKey =
  | typeof MARK_BOLD
  | typeof MARK_CODE
  | typeof MARK_ITALIC
  | typeof MARK_LINK
  | typeof MARK_STRIKE
  | typeof MARK_STYLED
  | typeof MARK_UNDERLINE;

export type NodeKey =
  | typeof NODE_BR
  | typeof NODE_CODEBLOCK
  | typeof NODE_HEADING
  | typeof NODE_HR
  | typeof NODE_IMAGE
  | typeof NODE_LI
  | typeof NODE_OL
  | typeof NODE_PARAGRAPH
  | typeof NODE_QUOTE
  | typeof NODE_UL;

export type GranularTextOverrideKey = MarkKey | NodeKey;

export type RichTextResolverProps = {
  richText: StoryblockRichTextContent;
  blokResolvers?: RenderOptions["blokResolvers"];
  nodeResolvers?: RenderOptions["nodeResolvers"];
  textProps?: ITextProps;
  granularTextProps?: Partial<Record<GranularTextOverrideKey, ITextProps>>;
};

export const RichTextResolver = ({
  richText,
  blokResolvers = {},
  nodeResolvers = {},
  textProps = {},
  granularTextProps = {},
}: RichTextResolverProps) => {
  const combinedTextProps = useCallback(
    (key: GranularTextOverrideKey) => ({
      ...textProps,
      ...(granularTextProps[key] || {}),
    }),
    [textProps, granularTextProps]
  );

  const defaultRenderOptions: RenderOptions = useMemo(
    () => ({
      blokResolvers,
      markResolvers: {
        [MARK_BOLD]: (children) => (
          <Text bold display={"inline"} {...combinedTextProps(MARK_BOLD)}>
            {children}
          </Text>
        ),
        [MARK_ITALIC]: (children) => (
          <Text italic display={"inline"} {...combinedTextProps(MARK_ITALIC)}>
            {children}
          </Text>
        ),
        [MARK_STRIKE]: (children) => (
          <Text
            strikeThrough
            display={"inline"}
            {...combinedTextProps(MARK_STRIKE)}
          >
            {children}
          </Text>
        ),
        [MARK_UNDERLINE]: (children) => (
          <Text
            underline
            display={"inline"}
            {...combinedTextProps(MARK_UNDERLINE)}
          >
            {children}
          </Text>
        ),
        [MARK_CODE]: (children) => (
          <Text display={"inline"} {...combinedTextProps(MARK_CODE)}>
            {children}
          </Text>
        ),
        [MARK_STYLED]: (children) => (
          <Text display={"inline"} {...combinedTextProps(MARK_STYLED)}>
            {children}
          </Text>
        ),
        [MARK_LINK]: (children, { href, target }) => (
          <Link href={href} isExternal={target === "_blank"} display={"inline"}>
            {children}
          </Link>
        ),
      },
      nodeResolvers: {
        [NODE_HEADING]: (children, { level }) => {
          const sizeMap: Record<
            typeof level,
            ThemeComponentSizeType<"Heading">
          > = {
            1: "xl",
            2: "lg",
            3: "md",
            4: "sm",
            5: "xs",
            6: "xs",
          };

          const marginTopMap: Record<typeof level, string> = {
            1: "6",
            2: "6",
            3: "6",
            4: "6",
            5: "6",
            6: "6",
          };

          return (
            <Heading
              nativeID={sentenceToId(getStringFromReactNode(children))}
              size={sizeMap[level]}
              mt={marginTopMap[level]}
              {...combinedTextProps(NODE_HEADING)}
            >
              {children}
            </Heading>
          );
        },
        [NODE_CODEBLOCK]: (children) => {
          return <Text {...combinedTextProps(NODE_CODEBLOCK)}>{children}</Text>;
        },
        [NODE_IMAGE]: (children, { src, alt }) => {
          return <Image src={src} alt={alt} />;
        },
        [NODE_PARAGRAPH]: (children) => {
          return <Text {...combinedTextProps(NODE_PARAGRAPH)}>{children}</Text>;
        },
        [NODE_QUOTE]: (children) => {
          return (
            <Text italic {...combinedTextProps(NODE_QUOTE)}>
              `&quot;`{children}`&quot;`
            </Text>
          );
        },
        [NODE_OL]: (children) => {
          return <VStack>{children}</VStack>;
        },
        [NODE_UL]: (children) => {
          return <VStack>{children}</VStack>;
        },
        [NODE_LI]: (children) => {
          return <Text {...combinedTextProps(NODE_LI)}>{children}</Text>;
        },
        [NODE_HR]: () => {
          return <Divider />;
        },
        [NODE_BR]: () => {
          return <>{"\n"}</>;
        },
        ...nodeResolvers,
      },
    }),
    [combinedTextProps, nodeResolvers, blokResolvers]
  );

  return <>{render(richText, defaultRenderOptions)}</>;
};
