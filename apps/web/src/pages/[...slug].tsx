import { PageStory } from "@md/storyblok-types";
import { AxiosError } from "axios";
import { GetStaticProps, GetStaticPropsResult } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { RegularPage } from "../page-components/RegularPage";
import { SoWPage } from "../page-components/SoWPage";
import { findStory } from "../storyblok/storyblokRepository";
import { useStoryblok } from "../storyblok/useStoryblok";
import { STORYBLOK_RESOLVED_RELATIONS } from "../utils/consts";
import { createNamedLoggerFromFilename } from "../utils/log";
const log = createNamedLoggerFromFilename(__filename);

/**
 * Resolves Storyblok blocks to our block-components
 */
const typeToPageComponent = {
  Page: RegularPage,
  SoW: SoWPage,
};

export type PageType = keyof typeof typeToPageComponent;

interface StoryblokPageProps {
  preview: boolean;
  story: PageStory;
}

const StoryblokPage = (props: StoryblokPageProps) => {
  const pageType = props.story.content.component as PageType;
  const PageComponent = typeToPageComponent[pageType];
  const liveStory = useStoryblok(props.story, props.preview);

  // TODO perhaps move it to page component
  const {
    query: { p },
  } = useRouter();

  // TODO change default in preview mode
  const pricePerHour = typeof p === "string" ? Number(p) : undefined;
  return (
    <PageComponent
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      story={liveStory}
      pricePerHour={pricePerHour}
    />
  );
};

export default dynamic(() => Promise.resolve(StoryblokPage), {
  ssr: false,
});

export const getStaticProps: GetStaticProps<StoryblokPageProps> = async (
  args
): Promise<GetStaticPropsResult<StoryblokPageProps>> => {
  const { params, preview: isPreview, locale } = args;

  const { slug: slugFromParams } = params || {};

  let slug: string;

  if (typeof slugFromParams === "string") {
    slug = slugFromParams;
  }

  if (Array.isArray(slugFromParams)) {
    slug = slugFromParams.join("/");
  }

  try {
    const pageData = await findStory({
      slug,
      locale,
      isPreview,
      resolveRelations: STORYBLOK_RESOLVED_RELATIONS,
    });

    if (!pageData || !pageData.story) {
      throw new Error(`No data or data didn't contain story for ${slug}`);
    }

    const pageType = pageData.story.content?.component as PageType | undefined;

    if (!pageType || !typeToPageComponent[pageType]) {
      throw new Error(`Undefined or unknown pageType: ${pageType}`);
    }

    const props = {
      story: pageData.story,
      preview: !!isPreview,
    };

    return {
      props,
      revalidate: 1,
    };
  } catch (err) {
    const axiosErr = err as AxiosError;

    // No story exists for this slug
    if (axiosErr.response?.status === 404) {
      return {
        notFound: true,
      };
    }

    const statusText = axiosErr?.response?.statusText as string;
    log.error(
      `Unexpected error during StoryblokPage generation for slug ${slug}: ${String(
        err
      )}, ${statusText}`,
      err
    );

    throw err;
  }
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
