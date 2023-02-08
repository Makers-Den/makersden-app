import { useEstimationDetailsScreen } from "@md/client-logic";
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
    <EstimationDetailsScreen
      estimation={estimation}
      isLoading={isEstimationLoading}
    />
  );
};

export default dynamic(() => Promise.resolve(EstimationDetailsPage), {
  ssr: false,
});
