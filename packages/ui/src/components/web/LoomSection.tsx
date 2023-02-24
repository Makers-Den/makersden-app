import { Box, Flex, Heading, Spinner, useBreakpointValue } from "native-base";
import React from "react";

export interface LoomSectionProps {
  loomVideoHtml: string | null;
  isLoomVideoHtmlLoading: boolean;
}

export const LoomSection = ({
  isLoomVideoHtmlLoading,
  loomVideoHtml,
}: LoomSectionProps) => {
  const styles = useBreakpointValue({
    base: {
      heading: {
        fontSize: "lg",
        mb: 4,
      },
      wrapper: {
        width: "100%",
      },
    },
    lg: {
      heading: {
        fontSize: "md",
        mb: 4,
      },
      wrapper: {
        width: "50%",
      },
    },
  });

  return (
    <Box>
      <Heading {...styles.heading}>Video Presentation</Heading>
      {isLoomVideoHtmlLoading && (
        <Flex direction="row">
          <Spinner my={8} size="lg" color="green.400" />
        </Flex>
      )}
      {loomVideoHtml && (
        <Box {...styles.wrapper}>
          <div dangerouslySetInnerHTML={{ __html: loomVideoHtml }}></div>
        </Box>
      )}
    </Box>
  );
};
