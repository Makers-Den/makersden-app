import { useEstimationDetailsScreen } from "client-logic";
import { useRouter } from "next/router";
import { EstimationDetailsScreen } from "ui/src/screens/web/EstimationDetailsScreen";
import dynamic from "next/dynamic";
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
