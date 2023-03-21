import { RegularPageStory } from "@md/storyblok-types";
import { ContentWrapper } from "@md/ui/src/components/ContentWrapper";
import { Logo } from "@md/ui/src/components/Logo";
import { LogoWrapper } from "@md/ui/src/components/LogoWrapper";
import { Box } from "native-base";

import { BlockComponentRenderer } from "../block-components/BlockComponentRenderer";

interface RegularPageProps {
  story: RegularPageStory;
}

export const RegularPage = ({ story }: RegularPageProps) => {
  const { body = [] } = story.content;

  return (
    <ContentWrapper bg="white" color="black.200">
      <LogoWrapper>
        <Logo isDark />
      </LogoWrapper>
      <Box px="4" pb="4">
        {body.map((blok) => (
          <BlockComponentRenderer content={blok} key={blok._uid} />
        ))}
      </Box>
    </ContentWrapper>
  );
};
