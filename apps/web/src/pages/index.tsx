import { useEstimationGateScreen } from "@md/client-logic";
import { EstimationGateScreen } from "@md/ui/src/screens/EstimationGateScreen";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { api } from "../utils/api";
import { clientEnvironment } from "../utils/clientEnvironment";

const EstimationGatePage = () => {
  const router = useRouter();
  const {
    handleEnter,
    handleEstimationSecretChange,
    handleShowExampleEstimation,
    isEstimationLoading,
    isSecretInvalid,
    estimationSecret,
  } = useEstimationGateScreen({
    api: api,
    exampleEstimationSecret: clientEnvironment.EXAMPLE_ESTIMATION_SECRET,
    onSuccess: (secret) => {
      // @TODO add typesafe routing
      router.push(`/estimations/${secret}`);
    },
  });

  return (
    <EstimationGateScreen
      estimationSecret={estimationSecret}
      isInvalid={isSecretInvalid}
      isLoading={isEstimationLoading}
      onEnter={handleEnter}
      onEstimationSecretChange={handleEstimationSecretChange}
      onShowExampleEstimation={handleShowExampleEstimation}
    />
  );
};

export default dynamic(() => Promise.resolve(EstimationGatePage), {
  ssr: false,
});
