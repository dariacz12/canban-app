import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getTableList } from "../api";

const usePageList = () => {
  const [state, setState] = useState<
    Array<{ id: number; imageName: string; boardName: string }> | undefined
  >();
  const { data } = useQuery("tableList", getTableList);

  console.log(2, data);

  useEffect(() => {
    setState(
      data?.map(({ id, attributes }) => ({
        id,
        boardName: attributes.title,
        imageName: attributes.imageUrl,
      }))
    );
  }, [data]);
  return [state, setState] as const;
};

export default usePageList;
