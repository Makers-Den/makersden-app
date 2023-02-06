import { useEstimationGateScreen } from "client-logic";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { EstimationGateScreen } from "ui/src/screens/EstimationGateScreen";
import { api } from "../utils/api";
import { clientEnvironment } from "../utils/clientEnvironment";

function EstimationGatePage() {
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
}

export default dynamic(() => Promise.resolve(EstimationGatePage), {
  ssr: false,
});
