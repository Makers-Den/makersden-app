import { RegularPageStory } from "@md/storyblok-types";

import { BlockComponentRenderer } from "../block-components/BlockComponentRenderer";

interface RegularPageProps {
  story: RegularPageStory;
}

export const RegularPage = ({ story }: RegularPageProps) => {
  const { body = [] } = story.content;

  return (
    <div>
      {body.map((blok) => (
        <BlockComponentRenderer content={blok} key={blok._uid} />
      ))}
    </div>
  );
};
