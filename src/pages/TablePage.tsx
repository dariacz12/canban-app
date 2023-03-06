import React, { useState } from "react";
import AddListButton from "../components/AddListButton";
import AddListField from "../components/AddListField";
import List from "../components/List";

const TablePage = () => {
  const [activeAddList, setActiveAddList] = useState<boolean>(false);
  return (
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
      <List />
    </div>
  );
};

export default TablePage;
