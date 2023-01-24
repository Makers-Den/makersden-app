import { useEstimationScreen } from "client-logic";
import dynamic from "next/dynamic";
import { EstimationScreen } from "ui";
import { api } from "../utils/api";
import { environment } from "../utils/environment";

function Index() {
  const {
    estimation,
    estimationSecret,
    isEstimationLoading,
    isSecretInvalid,
    handleEnter,
    handleEstimationSecretChange,
    handleShowExampleEstimation,
  } = useEstimationScreen({
    api,
    exampleEstimationSecret: environment.EXAMPLE_ESTIMATION_SECRET,
  });

  return (
    <EstimationScreen
      isInvalid={isSecretInvalid}
      isLoading={isEstimationLoading}
      estimation={estimation}
      estimationSecret={estimationSecret}
      onEnter={handleEnter}
      onEstimationSecretChange={handleEstimationSecretChange}
      onShowExampleEstimation={handleShowExampleEstimation}
    />
  );
}

export default dynamic(() => Promise.resolve(Index), {
  ssr: false,
});
