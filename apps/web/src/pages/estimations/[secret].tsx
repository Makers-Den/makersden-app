import { useEstimationDetailsScreen } from "@md/client-logic";
import { ContentWrapper } from "@md/ui/src/components/ContentWrapper";
import { EstimationDetailsScreen } from "@md/ui/src/screens/web/EstimationDetailsScreen";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { api } from "../../utils/api";

const EstimationDetailsPage = () => {
  const router = useRouter();
  const { estimation, isEstimationLoading } = useEstimationDetailsScreen({
    api,
    estimationSecret: router.query.secret as string,
  });

  return (
    <ContentWrapper>
      <EstimationDetailsScreen
        estimation={estimation}
        isLoading={isEstimationLoading}
      />
    </ContentWrapper>
  );
};

export default dynamic(() => Promise.resolve(EstimationDetailsPage), {
  ssr: false,
});
