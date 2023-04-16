import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getTableListsList, updateListOrder } from "../api";
import AddListButton from "../components/AddListButton";
import AddListField from "../components/AddListField";
import List from "../components/List";
import useToastAlert from "../customHooks/useToastAlert";

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  row-gap: 4;
  overflow: auto;
  flex: 1;
`;
const ListWrapper = styled.div`
  height: 100vh;
`;
const TablePage = () => {
  const [activeAddList, setActiveAddList] = useState<boolean>(false);
  let { tableId } = useParams();
  const [selectedListId, setSelectedListId] = useState("");

  const { data } = useQuery(`tableListsList${tableId}`, () =>
    getTableListsList(String(tableId))
  );

  const handleOnDragList = (e: React.DragEvent, listId: string) => {
    e.dataTransfer.setData("listId", listId);
  };
  const toast = useToastAlert();
  const dragOverItem = React.useRef<any>(null);

  const queryClient = useQueryClient();

  const updateListOrderMutation = useMutation(updateListOrder, {
    onSuccess: () => {
      setSelectedListId("");
    },
    onError: () => {
      toast("Something went wrong!", "danger");
    },
    onSettled: () => {
      queryClient.invalidateQueries([`tableListsList${tableId}`]);
    },
  });

  const handleOnDropList = async (e: React.DragEvent) => {
    const draggableListId = e.dataTransfer.getData("listId") as string;
    const originalListsOrderArray = JSON.parse(
      String(data?.attributes.listOrder)
    );
    const movedListIndex = originalListsOrderArray?.indexOf(
      Number(draggableListId)
    );
    const { current } = dragOverItem;
    const targetIndex = originalListsOrderArray?.indexOf(Number(current));
    let newListsOrderArray: string[] = [];
    if (Number(targetIndex) > Number(movedListIndex)) {
      newListsOrderArray =
        originalListsOrderArray?.slice(
          movedListIndex,
          Number(targetIndex) + 1
        ) ?? [];
      newListsOrderArray?.forEach((element, index) => {
        let element2 = newListsOrderArray[index + 1];
        if (element2) {
          newListsOrderArray[index + 1] = element;
          newListsOrderArray[index] = element2;
        }
      });

      const length = newListsOrderArray.length;
      originalListsOrderArray?.splice(
        Number(movedListIndex),
        length,
        ...newListsOrderArray
      );
    } else {
      newListsOrderArray =
        originalListsOrderArray
          ?.slice(Number(targetIndex), Number(movedListIndex) + 1)
          .reverse() ?? [];

      newListsOrderArray?.forEach((element, index) => {
        let element2 = newListsOrderArray[index + 1];
        if (element2) {
          newListsOrderArray[index + 1] = element;
          newListsOrderArray[index] = element2;
        }
      });

      const length = newListsOrderArray.length;
      originalListsOrderArray?.splice(
        Number(targetIndex),
        length,
        ...newListsOrderArray.reverse()
      );
    }
    originalListsOrderArray &&
      updateListOrderMutation.mutate({
        tableId: String(tableId),
        listOrder: originalListsOrderArray,
      });
  };

  const handleDragOverList = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Wrap onDrop={handleOnDropList} onDragOver={handleDragOverList}>
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
      {}
      {data &&
        JSON.parse(data.attributes.listOrder) !== null &&
        JSON.parse(data.attributes.listOrder).map((list: string) =>
          data.attributes.lists.data.map(
            ({ attributes, id }) =>
              String(list) === String(id) && (
                <List
                  setSelectedListId={setSelectedListId}
                  current={String(selectedListId)}
                  dragOverItem={dragOverItem}
                  onDragListStart={handleOnDragList}
                  key={id}
                  listId={String(id)}
                  listName={attributes.title}
                />
              )
          )
        )}
    </Wrap>
  );
};

export default TablePage;
