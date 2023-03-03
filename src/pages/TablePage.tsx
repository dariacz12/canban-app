import React, { useState } from "react";
import AddListButton from "../components/AddListButton";
import AddListField from "../components/AddListField";

const TablePage = () => {
  const [activeAddList, setActiveAddList] = useState<boolean>(false);
  return (
    <div style={{ marginTop: "10px" }}>
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
  );
};

export default TablePage;
