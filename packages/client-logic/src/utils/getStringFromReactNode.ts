import { ReactNode } from "react";

export const getStringFromReactNode = (element: ReactNode): string => {
  const retriveNestedString = (item: any) => {
    while (typeof item !== "string") {
      item = item?.props.children ?? "";
      if (typeof item === "string") {
        return item;
      }
    }
  };

  return (element as any)
    ?.map((item: any) =>
      typeof item === "string" ? item : retriveNestedString(item)
    )
    .join("");
};
