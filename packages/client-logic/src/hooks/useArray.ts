import { useCallback, useState } from "react";

export const useArray = <T>(
  initialItems: T[],
  equals: (item1: T, item2: T) => boolean = (item1, item2) => item1 === item2
) => {
  const [items, setItems] = useState(initialItems);

  const includes = useCallback(
    (item: T) => items.some((anotherItem) => equals(item, anotherItem)),
    [equals, items]
  );

  const remove = useCallback(
    (item: T) => {
      setItems((prevItems) =>
        prevItems.filter((anotherItem) => !equals(item, anotherItem))
      );
    },
    [equals]
  );

  const insert = useCallback(
    (item: T) => {
      setItems((prevItems) => [...prevItems, item]);
    },
    [setItems]
  );

  const toggle = useCallback(
    (item: T) => {
      if (includes(item)) {
        remove(item);
      } else {
        insert(item);
      }
    },
    [includes, remove, insert]
  );

  const clear = useCallback(() => {
    setItems([]);
  }, [setItems]);

  return { items, remove, toggle, insert, includes, equals, clear };
};
