import { useEstimationDetailsScreen } from "@md/client-logic";
import { ContentWrapper } from "@md/ui/src/components/ContentWrapper";
import { EstimationDetailsScreen } from "@md/ui/src/screens/web/EstimationDetailsScreen";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useStoryblok } from "../../storyblok/useStoryblok";
import { api } from "../../utils/api";

interface EstimationDetailsPageProps {
  preview: boolean;
}

const EstimationDetailsPage = ({ preview }: EstimationDetailsPageProps) => {
  const router = useRouter();
  const {
    estimation,
    isEstimationLoading,
    loomVideoHtml,
    isLoomVideoHtmlLoading,
  } = useEstimationDetailsScreen({
    api,
    preview,
    estimationSecret: router.query.secret as string,
    fetchLoomVideo: true,
  });

  const liveEstimation = useStoryblok(estimation, preview);

  return (
    <ContentWrapper>
      <EstimationDetailsScreen
        estimation={preview ? liveEstimation : estimation}
        isLoading={isEstimationLoading}
        loomVideoHtml={loomVideoHtml}
        isLoomVideoHtmlLoading={isLoomVideoHtmlLoading}
      />
    </ContentWrapper>
  );
};

export default dynamic(() => Promise.resolve(EstimationDetailsPage), {
  ssr: false,
});

export const getStaticProps = async (args: EstimationDetailsPageProps) => {
  const { preview: isPreview } = args;

  const props = {
    preview: !!isPreview,
  };

  return {
    props: {
      ...props,
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
