import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getListsList } from "../api";

const useListsList = () => {
  const [state, setState] = useState<
    Array<{ id: number; listName: string }> | undefined
  >();
  const { data } = useQuery("ListsList", getListsList);
  useEffect(() => {
    setState(
      data?.map(({ id, attributes }) => ({
        id,
        listName: attributes.title,
      }))
    );
  }, [data]);
  return [state, setState] as const;
};

export default useListsList;
