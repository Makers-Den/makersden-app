import { useEstimationDetailsScreen } from "@md/client-logic";
import { ContentWrapper } from "@md/ui/src/components/ContentWrapper";
import { EstimationDetailsScreen } from "@md/ui/src/screens/web/EstimationDetailsScreen";
import { GetStaticPropsContext } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { api } from "../../utils/api";
import { useStoryblok } from "../../utils/useStoryblok";

const EstimationDetailsPage = ({
  preview
}:{preview:boolean}) => {
  const router = useRouter();
  const { estimation, isEstimationLoading } = useEstimationDetailsScreen({
    api,
    preview,
    estimationSecret: router.query.secret as string,
  });

const liveEstimation= useStoryblok(estimation,preview);

  return (
    <ContentWrapper>
      <EstimationDetailsScreen
        estimation={preview?liveEstimation:estimation}
        isLoading={isEstimationLoading}
      />
    </ContentWrapper>
  );
};

export default dynamic(() => Promise.resolve(EstimationDetailsPage), {
  ssr: false,
});


export const getStaticProps = async (args:GetStaticPropsContext) => {
  const {
    preview: isPreview,
  } = args;

  const props = {
    preview: !!isPreview,
  };

  return {
    props: {
      ...props,
    },
  }
}
export const getStaticPaths=async() =>{
  return {
    paths: [],
    fallback: false, 
  }
}
