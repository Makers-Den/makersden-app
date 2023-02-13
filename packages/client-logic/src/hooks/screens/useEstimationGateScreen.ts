import { useEffect, useState } from "react";

import { Api } from "../../types/api";

export interface UseEstimationGateScreenDeps {
  api: Api;
  exampleEstimationSecret: string;
  onSuccess?: (secret: string) => void;
}

export const useEstimationGateScreen = ({
  api,
  exampleEstimationSecret,
  onSuccess,
}: UseEstimationGateScreenDeps) => {
  const trpcContext = api.useContext();
  const [isSecretInvalid, setIsSecretInvalid] = useState(false);
  const [estimationSecret, setEstimationSecret] = useState("");
  const [enteredEstimationSecret, setEnteredEstimationSecret] = useState("");

  useEffect(() => {
    trpcContext.estimations.findOne.invalidate();
  }, [trpcContext.estimations.findOne]);

  const handleEstimationListQueryError = () => {
    setEnteredEstimationSecret("");
    setIsSecretInvalid(true);
  };

  const estimationListQuery = api.estimations.findOne.useQuery(
    { secret: enteredEstimationSecret },
    {
      enabled: !!enteredEstimationSecret,
      onError: handleEstimationListQueryError,
      onSuccess: (data) => {
        if (data.isError === true || !data.estimation) {
          handleEstimationListQueryError();
        } else {
          setEstimationSecret("");
          setEnteredEstimationSecret("");
          onSuccess?.(enteredEstimationSecret);
        }
      },
    }
  );

  const handleEnter = () => {
    setIsSecretInvalid(false);
    setEnteredEstimationSecret(estimationSecret);
  };

  const handleEstimationSecretChange = (estimationSecret: string) => {
    setEstimationSecret(estimationSecret);
  };

  const handleShowExampleEstimation = () => {
    setEstimationSecret(exampleEstimationSecret);
    setIsSecretInvalid(false);
    setEnteredEstimationSecret(exampleEstimationSecret);
  };

  return {
    isSecretInvalid,
    isEstimationLoading: estimationListQuery.isFetching,
    estimationSecret,
    handleEnter,
    handleEstimationSecretChange,
    handleShowExampleEstimation,
  };
};
