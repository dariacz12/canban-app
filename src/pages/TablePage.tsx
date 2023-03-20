import React, { Children, useState } from "react";
import HorizontalScroll from "react-horizontal-scrolling";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getTableListsList } from "../api";
import AddListButton from "../components/AddListButton";
import AddListField from "../components/AddListField";
import List from "../components/List";
import useListsList from "../customHooks/useListsList";

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  row-gap: 4;
  overflow: auto;
  flex: 1;
`;
const TablePage = () => {
  const [activeAddList, setActiveAddList] = useState<boolean>(false);
  let { tableId } = useParams();
  const { data } = useQuery(`tableListsList${tableId}`, () =>
    getTableListsList(String(tableId))
  );
  return (
    <Wrap>
      <div style={{ display: "flex" }}>
        {!activeAddList && (
          <AddListButton
            setActiveAddList={setActiveAddList}
            activeAddList={activeAddList}
          />
        )}
        {activeAddList && (
          <AddListField
            setActiveAddList={setActiveAddList}
            activeAddList={activeAddList}
          />
        )}
      </div>
      {data &&
        data?.attributes?.lists?.data.map(({ attributes, id }) => (
          <List listId={String(id)} listName={attributes.title} />
        ))}
    </Wrap>
  );
};

export default TablePage;
