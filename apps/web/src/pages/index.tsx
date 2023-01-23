import { useEstimationScreen } from "client-logic";
import dynamic from "next/dynamic";
import { EstimationScreen } from "ui";
import { api } from "../utils/api";

function Index() {
  const {
    estimation,
    estimationSecret,
    isEstimationLoading,
    isSecretInvalid,
    handleEnter,
    handleEstimationSecretChange,
  } = useEstimationScreen({ api });

  return (
    <EstimationScreen
      isInvalid={isSecretInvalid}
      isLoading={isEstimationLoading}
      estimation={estimation}
      estimationSecret={estimationSecret}
      onEnter={handleEnter}
      onEstimationSecretChange={handleEstimationSecretChange}
    />
  );
}

export default dynamic(() => Promise.resolve(Index), {
  ssr: false,
});
