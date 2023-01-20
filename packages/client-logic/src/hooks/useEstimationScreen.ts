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

  const estimationListQuery = api.estimations.list.useQuery(
    { organization: enteredEstimationSecret },
    {
      enabled: !!enteredEstimationSecret,
      onError: handleEstimationListQueryError,
      onSuccess: (data) => {
        if (data.isError === true || data.estimations.length === 0) {
          handleEstimationListQueryError();
        }
      },
    }
  );

  const estimation =
    estimationListQuery.data &&
    !estimationListQuery.data.isError &&
    estimationListQuery.data.estimations.length > 0
      ? estimationListQuery.data.estimations[0]
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
