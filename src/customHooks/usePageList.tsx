import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getTableList } from "../api";

const usePageList = () => {
  const [state, setState] = useState<
    | Array<{
        id: number;
        imageName: string;
        boardName: string;
        starred: boolean;
      }>
    | undefined
  >();
  const { data } = useQuery("tableList", getTableList);

  useEffect(() => {
    setState(
      data?.map(({ id, attributes }) => ({
        id,
        starred: attributes.starred,
        boardName: attributes.title,
        imageName: attributes.imageUrl,
      }))
    );
  }, [data]);
  return [state, setState] as const;
};

export default usePageList;
