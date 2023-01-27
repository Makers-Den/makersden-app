import { useState } from "react";
import { ISbStoryData } from "storyblok-js-client";
import { EstimationContent } from "storyblok-types";
import { Api } from "../types/api";

interface UseEstimationScreenDeps {
  api: Api;
  exampleEstimationSecret: string;
  onSuccess?: (data: ISbStoryData<EstimationContent>) => void;
}

export const useEstimationScreen = ({
  api,
  exampleEstimationSecret,
  onSuccess,
}: UseEstimationScreenDeps) => {
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

  const handleEstimationSecretChange = (estimationSecret: string) => {
    setEstimationSecret(estimationSecret);
  };

  const handleShowExampleEstimation = () => {
    setEstimationSecret(exampleEstimationSecret);
    setIsSecretInvalid(false);
    setEnteredEstimationSecret(exampleEstimationSecret);
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
          onSuccess?.(data.estimation);
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
    handleShowExampleEstimation,
  };
};
