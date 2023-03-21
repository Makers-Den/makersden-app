import { RichTextContentContent, SowPageStory } from "@md/storyblok-types";
import { ContentWrapper } from "@md/ui/src/components/ContentWrapper";
import { Logo } from "@md/ui/src/components/Logo";
import { LogoWrapper } from "@md/ui/src/components/LogoWrapper";
import { Box } from "native-base";
import Head from "next/head";
import * as R from "remeda";

import { BlockComponentRenderer } from "../block-components/BlockComponentRenderer";
import { SoWCover } from "../components/SoWCover";
import { SowToC, SoWToCEntry } from "../components/SowToC";

interface SoWPageProps {
  story: SowPageStory;
}

export const SoWPage = ({ story }: SoWPageProps) => {
  const { author, date, subTitle, title, body = [] } = story.content;

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

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ContentWrapper bg="white" color="black.200" maxWidth="800px" mx="auto">
        <LogoWrapper>
          <Logo isDark />
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

          {body.map((blok) => (
            <BlockComponentRenderer content={blok} key={blok._uid} />
          ))}
        </Box>
      </ContentWrapper>
    </>
  );
};
