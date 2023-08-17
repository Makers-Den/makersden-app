import {
  RichTextContentContent,
  SoWEstimationSectionContent,
  SowPageStory,
} from "@md/storyblok-types";
import { ContentWrapper } from "@md/ui/src/components/ContentWrapper";
import { Logo } from "@md/ui/src/components/Logo";
import { LogoWrapper } from "@md/ui/src/components/LogoWrapper";
import { useMapEstimationData } from "@md/ui/src/utils/useMapEstimationData";
import { Box, Button, Flex } from "native-base";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef } from "react";
import * as R from "remeda";
import { ISbRichtext } from "storyblok-js-client";

import { BlockComponentRenderer } from "../block-components/BlockComponentRenderer";
import { SoWCover } from "../components/SoWCover";
import { SowToC, SoWToCEntry } from "../components/SowToC";
import styles from "./SoWPage.module.css";

interface SoWPageProps {
  story: SowPageStory;
}

export const SoWPage = ({ story }: SoWPageProps) => {
  const { author, date, subTitle, title, body = [] } = story.content;

  const buttonRef = useRef<HTMLButtonElement>(null);

  const {
    query: { p },
  } = useRouter();

  // TODO change default in preview mode
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pricePerHour = typeof p === "string" ? parseInt(p, 16) : undefined;

  const estimation = (
    body.filter((blok) => blok.component === "SoWEstimationSection")[0] as
      | SoWEstimationSectionContent
      | undefined
  ).estimation;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { sumOfExpectedDays: workDays } = useMapEstimationData(estimation);

  const computeField = (content: string) => {
    try {
      return eval(content);
    } catch {
      // TODO replace with "content" (?)
      return "Error occurred";
    }
  };

  const processTextWithComputedField = (text: string): string => {
    const regex = /{(.*?)}/g;
    return text.replace(regex, (match, fieldName) => {
      return computeField(fieldName.trim());
    });
  };

  const allowedBlockTypes = [
    "paragraph",
    "heading",
    "bullet_list",
    "ordered_list",
    "list_item",
  ];

  const processBody = (
    body: (RichTextContentContent | SoWEstimationSectionContent)[]
  ) =>
    body.map((blok) => {
      if (blok.component !== "RichTextContent") {
        return blok;
      }

      const processBlock = (contentBlock: ISbRichtext) => {
        if (
          !allowedBlockTypes.includes(contentBlock.type) ||
          !contentBlock.content
        ) {
          return contentBlock;
        }

        return {
          ...contentBlock,
          content: contentBlock.content.map((content) => {
            if (allowedBlockTypes.includes(content.type)) {
              return processBlock(content);
            } else if (content.type === "text") {
              return {
                ...content,
                text: processTextWithComputedField(content.text),
              };
            } else if (content.type === "list_item") {
              return processBlock(content);
            } else {
              return content;
            }
          }),
        };
      };

      const textContent = blok.text?.content.map(processBlock);

      return {
        ...blok,
        text: {
          ...blok.text,
          content: textContent,
        },
      };
    });

  const processedBody = processBody(
    body as (RichTextContentContent | SoWEstimationSectionContent)[]
  );

  const tocEntries: SoWToCEntry[] = R.pipe(
    body as RichTextContentContent[],
    R.filter((blok) => blok.component === "RichTextContent"),
    R.flatMap((blok) =>
      blok.text?.content.filter(
        (content) =>
          content.type === "heading" &&
          (content.attrs.level === 2 || content.attrs.level === 3)
      )
    ),
    R.map((heading) => ({
      level: heading?.attrs.level,
      text: heading?.content?.map((text) => text.text).join(""),
    })),
    R.filter((heading) => heading.text !== undefined && heading.text !== "")
  );

  const handlePrint = async () => {
    buttonRef.current && buttonRef.current.style.setProperty("display", "none");

    const imageGalleries = document.querySelectorAll(
      '[data-testid="image-gallery"]'
    );

    imageGalleries.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.setProperty("display", "none");
        console.log(el);
      }
    });

    window.print();

    buttonRef.current &&
      buttonRef.current.style.setProperty("display", "block");

    imageGalleries.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.setProperty("display", "block");
      }
    });
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Button
        ref={buttonRef}
        onPress={handlePrint}
        bottom={10}
        right={20}
        position={"fixed"}
        zIndex={10}
      >
        Print
      </Button>
      <ContentWrapper bg="white" color="black.200" maxWidth="800px" mx="auto">
        <div className={styles.content}>
          <LogoWrapper>
            <Flex flexDir={"row"} alignItems={"center"}>
              <Logo isDark />
            </Flex>
          </LogoWrapper>

          <Box px="4" pt="4" pb="8">
            <Box mt="30vh" mb="calc(70vh - 300px)">
              <SoWCover
                author={author}
                date={date}
                subTitle={subTitle}
                title={title}
              />
            </Box>

            <Box mb="20">
              <SowToC entries={tocEntries} />
            </Box>

            {processedBody.map((blok) => (
              <BlockComponentRenderer content={blok} key={blok._uid} />
            ))}
          </Box>
        </div>
      </ContentWrapper>
    </>
  );
};
