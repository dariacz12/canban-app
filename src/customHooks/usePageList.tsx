import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getTableList } from "../api";

const usePageList = () => {
  const [state, setState] = useState<
    Array<{ id: number; imageName: string; boardName: string }> | undefined
  >();
  const { data } = useQuery("tableList", getTableList);
  useEffect(() => {
    setState(
      data?.map(({ id, name, imageUrl }) => ({
        id,
        boardName: name,
        imageName: imageUrl,
      }))
    );
  }, [data]);
  return [state, setState] as const;
};

export default usePageList;
