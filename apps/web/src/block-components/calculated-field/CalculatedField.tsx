import { useMemo } from "react";

// TODO throw error when not in preview and pricePerHour is empty,
// * in preview pricePerHour is not empty but xyz

export const CalculatedField = ({
  content,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pricePerHour,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sumOfExpectedDays: workDays,
}: {
  content: string;
  pricePerHour: number;
  sumOfExpectedDays: number;
}) => {
  const renderedContent = useMemo(() => {
    try {
      return eval(content);
    } catch {
      return "Error occurred";
    }
  }, [content]);

  return <p>{renderedContent}</p>;
};
