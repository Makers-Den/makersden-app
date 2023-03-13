import { oembed } from "@loomhq/loom-embed";
import { useEffect, useRef } from "react";
import { useQuery } from "react-query";

import { Api } from "../../types/api";

interface UseEstimationDetailsScreenDeps {
  api: Api;
  preview?:boolean,
  estimationSecret: string;
  fetchLoomVideo: boolean;
}

export const useEstimationDetailsScreen = ({
  api,
  preview=false,
  estimationSecret,
  fetchLoomVideo,
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

  const loomVideo = estimation?.content.loomVideo || null;
  const loomVideoOembedQuery = useQuery({
    enabled: fetchLoomVideo && !!loomVideo,
    queryKey: ["loomVideoOembed", loomVideo],
    queryFn: () => oembed(loomVideo || ""),
  });

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
    isLoomVideoHtmlLoading: loomVideoOembedQuery.isLoading,
    loomVideoHtml: loomVideoOembedQuery.data?.html ?? null,
  };
};
