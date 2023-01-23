import { useState } from "react";
import { Api } from "../types/api";

interface UseEstimationScreenDeps {
  api: Api;
}

export const useEstimationScreen = ({ api }: UseEstimationScreenDeps) => {
  const [isSecretInvalid, setIsSecretInvalid] = useState(false);
  const [estimationSecret, setEstimationSecret] = useState("");
  const [enteredEstimationSecret, setEnteredEstimationSecret] = useState("");

  const handleEstimationListQueryError = () => {
    setEnteredEstimationSecret("");
    setIsSecretInvalid(true);
  };

  const handleEnter = () => {
    setIsSecretInvalid(false);
    setEnteredEstimationSecret(estimationSecret);
  };

  const handleEstimationSecretChange = (organizationSecret: string) => {
    setEstimationSecret(organizationSecret);
  };

  const estimationListQuery = api.estimations.findOne.useQuery(
    { secret: enteredEstimationSecret },
    {
      enabled: !!enteredEstimationSecret,
      onError: handleEstimationListQueryError,
      onSuccess: (data) => {
        if (data.isError === true || !data.estimation) {
          handleEstimationListQueryError();
        }
      },
    }
  );

  const estimation =
    estimationListQuery.data && !estimationListQuery.data.isError
      ? estimationListQuery.data.estimation
      : null;

  return {
    isSecretInvalid,
    isEstimationLoading: estimationListQuery.isFetching,
    estimation,
    estimationSecret,
    handleEnter,
    handleEstimationSecretChange,
  };
};
