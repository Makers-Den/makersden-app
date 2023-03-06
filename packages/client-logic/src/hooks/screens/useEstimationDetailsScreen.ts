import { useEffect, useRef } from "react";

import { Api } from "../../types/api";

interface UseEstimationDetailsScreenDeps {
  api: Api;
  preview?:boolean,
  estimationSecret: string;
}

export const useEstimationDetailsScreen = ({
  api,
  preview=false,
  estimationSecret,
}: UseEstimationDetailsScreenDeps) => {
  const isNotificationSent = useRef<boolean>(false);
  const estimationNotifyOpenedMutation =
    api.estimations.notifyOpened.useMutation();
  const estimationListQuery = api.estimations.findOne.useQuery({
    secret: estimationSecret,
    preview
  });

  const estimation =
    estimationListQuery.data && !estimationListQuery.data.isError
      ? estimationListQuery.data.estimation
      : null;

  useEffect(() => {
    if (isNotificationSent.current || !estimation) {
      return;
    }

    isNotificationSent.current = true;
    estimationNotifyOpenedMutation.mutate({ secret: estimationSecret });
  }, [estimationNotifyOpenedMutation, estimation, estimationSecret]);

  return {
    isEstimationLoading: estimationListQuery.isLoading,
    estimation,
  };
};
