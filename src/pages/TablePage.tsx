import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getTableListsList } from "../api";
import AddListButton from "../components/AddListButton";
import AddListField from "../components/AddListField";
import List from "../components/List";
import useListsList from "../customHooks/useListsList";

const TablePage = () => {
  const [activeAddList, setActiveAddList] = useState<boolean>(false);
  let { tableId } = useParams();
  const { data } = useQuery(`tableListsList${tableId}`, () =>
    getTableListsList(String(tableId))
  );

  return (
    <>
      <div style={{ display: "flex", margin: "10px" }}>
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
        data?.attributes?.lists?.data.map(({ attributes }) => {
          <List listName={attributes.title} />;
        })}
    </>
  );
};

export default TablePage;
