import { Api } from "../../types/api";

interface UseEstimationDetailsScreenDeps {
  api: Api;
  estimationSecret: string;
}

export const useEstimationDetailsScreen = ({
  api,
  estimationSecret,
}: UseEstimationDetailsScreenDeps) => {
  const estimationListQuery = api.estimations.findOne.useQuery({
    secret: estimationSecret,
  });

  const estimation =
    estimationListQuery.data && !estimationListQuery.data.isError
      ? estimationListQuery.data.estimation
      : null;

  return {
    isEstimationLoading: estimationListQuery.isLoading,
    estimation,
  };
};
