import { EllipsisOutlined } from "@ant-design/icons";
import { AddIcon, ArrowForwardIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  deleteList,
  getCardData,
  getListsListCardsTitles,
  getTableListsList,
  updateCardParentList,
  updateListOrder,
  updateListTitle,
} from "../api";
import useClickOutside from "../customHooks/useClickOutside";
import usePageList from "../customHooks/usePageList";
import AddCardField from "./AddCardField";
import AlertDialogMoveList from "./AlertDialogMoveList";
import CardItem from "./CardItem";

const Main = styled.div`
  display: flex;
`;
const Cards = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4;
  overflow: scroll;
  flex: 1;
`;
const Wrap = styled.div``;
const Footer = styled.div``;
type Inputs = {
  title: string;
};
const ListWrapper = styled.div`
  height: 100vh;
`;
const List = ({
  listId,
  listName,
  onDragListStart,
  dragOverItem,
  current,
  setSelectedListId,
}: {
  listId: string;
  listName: string;
  onDragListStart: (e: React.DragEvent<HTMLDivElement>, listId: string) => void;
  dragOverItem: React.MutableRefObject<any>;
  current: string;
  setSelectedListId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleOnDragCardToAnotherList = (
    e: React.DragEvent,
    cardId: string
  ) => {
    e.dataTransfer.setData("cardId", cardId);
  };

  const handleOnDropCardToAnotherList = async (e: React.DragEvent) => {
    const draggableCardId = e.dataTransfer.getData("cardId") as string;
    console.log("draggableCardId", draggableCardId);
    const firstListId = String(
      (await getCardData(draggableCardId)).attributes.lists.data[0].id
    );
    await updateCardDatatMutation.mutateAsync({
      listId: String(listId),
      cardId: draggableCardId,
    });
    queryClient.invalidateQueries([`cardTitle${listId}`]);
    queryClient.invalidateQueries([`cardTitle${firstListId}`]);
  };

  const handleDragOverCardToAnotherList = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const queryClient = useQueryClient();
  const updateCardDatatMutation = useMutation(updateCardParentList, {
    onSuccess: () => {},
    onError: () => {
      alert("Something went wrong");
    },
    onSettled: () => {},
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [state] = usePageList();
  const { data } = useQuery(`cardTitle${listId}`, () =>
    getListsListCardsTitles(String(listId))
  );
  let { tableId } = useParams();
  const {
    register,
    resetField,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const [activeAddCard, setActiveAddCard] = useState<boolean>(false);
  const activeCard = () => {
    setActiveAddCard(!activeAddCard);
  };
  const listNameInputWraperRef = useRef<HTMLDivElement>(null);

  const onTitleSaved = () => {
    resetField("title");
  };
  const onSubmit = () => onTitleSaved();
  useClickOutside(listNameInputWraperRef, onTitleSaved);

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  };
  const navigate = useNavigate();

  const { data: boardData } = useQuery(`tableListsList${tableId}`, () =>
    getTableListsList(String(tableId))
  );

  const updateListOrderMutation = useMutation(updateListOrder, {
    onSuccess: () => {},
    onError: () => {
      alert("Something went wrong!");
    },
    onSettled: () => {
      queryClient.invalidateQueries([`tableListsList${tableId}`]);
    },
  });
  const deleteListsListMutation = useMutation(deleteList, {
    onSuccess: () => {
      updateListOrderMutation.mutate({
        tableId: String(tableId),
        listOrder: [
          ...JSON.parse(String(boardData?.attributes.listOrder)),
        ].filter((list) => String(list) !== listId),
      });
    },
    onError: () => {
      alert("Something went wrong");
    },
    onSettled: () => {
      queryClient.invalidateQueries([`tableListsList${tableId}`]);
    },
  });

  const queryClientUpdate = useQueryClient();
  const updateListsListMutation = useMutation(updateListTitle, {
    onSuccess: () => {
      navigate(`/tablepage/${tableId}`);
    },
    onError: () => {
      alert("Something went wrong");
    },
    onSettled: () => {
      queryClientUpdate.invalidateQueries([`tableListsList${tableId}`]);
    },
  });

  return (
    <>
      <ListWrapper
        onDragStart={(e) => {
          !e.dataTransfer.getData("cardId") &&
            onDragListStart(e, String(listId));
        }}
        onDragEnter={() => {
          dragOverItem.current = listId;
          setSelectedListId(dragOverItem.current);
        }}
        draggable
      >
        <Card
          draggable
          onDrop={handleOnDropCardToAnotherList}
          onDragOver={handleDragOverCardToAnotherList}
          minW="231px"
          h={"fit-content"}
          style={{
            margin: "0px 20px",
            background: current === listId ? "#d6d6d6" : "#e5e5e5",
            height: "fit-content",
          }}
          shadow="2px"
        >
          <CardBody
            style={{
              justifyContent: "left",
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 15,
              paddingLeft: 15,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              maxHeight: "90vh",
            }}
          >
            <Main>
              <Wrap ref={listNameInputWraperRef}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    _placeholder={{
                      fontWeight: "bold",
                      fontSize: "sm",
                      color: "#4c4c4c",
                    }}
                    onClick={() => setValue("title", listName)}
                    focusBorderColor="#53735E"
                    placeholder={listName}
                    style={{ border: "none" }}
                    {...register("title", { maxLength: 18 })}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      updateListsListMutation.mutate({
                        title: event.target.value,
                        listId: String(listId),
                      });
                    }}
                    onKeyPress={handleKeyPress}
                  />
                  {errors.title?.type === "maxLength" && (
                    <p style={{ color: "red" }} role="alert">
                      Max Length is 18 symbols
                    </p>
                  )}
                </form>
              </Wrap>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={
                    <EllipsisOutlined
                      style={{ color: "#7f7f7f", position: "relative" }}
                    />
                  }
                  variant="outline"
                />
                <MenuList>
                  <MenuItem icon={<ArrowForwardIcon />} onClick={onOpen}>
                    Move list to another board
                  </MenuItem>
                  <MenuItem
                    onClick={() => deleteListsListMutation.mutate(listId)}
                    icon={<DeleteIcon />}
                  >
                    Delete list
                  </MenuItem>
                  <AlertDialogMoveList
                    isOpen={isOpen}
                    onClose={onClose}
                    cancelRef={cancelRef}
                    listId={String(listId)}
                    cardMove={false}
                    cardId={""}
                  />
                </MenuList>
              </Menu>
            </Main>
            <Cards style={{ overflow: "scroll" }}>
              {data &&
                data?.attributes?.cards?.data?.map(({ attributes, id }) => (
                  <CardItem
                    onDragStart={handleOnDragCardToAnotherList}
                    key={id}
                    title={attributes.title}
                    cardId={String(id)}
                    listId={listId}
                  />
                ))}
            </Cards>

            <Footer style={{ display: "flex" }}>
              {!activeAddCard && (
                <Button
                  size={"sm"}
                  color="#F2F2F2"
                  _hover={{ color: "black", bg: "#F2F2F2" }}
                  ml={3}
                  type="submit"
                  background="rgba(204, 204, 204, 0.5"
                  onClick={activeCard}
                >
                  <AddIcon
                    w={2.5}
                    marginRight={"10px"}
                    style={{ color: "#7f7f7f", position: "relative" }}
                  />
                  <Text
                    as="b"
                    fontSize="xs"
                    style={{ color: "#7f7f7f", position: "relative" }}
                  >
                    Add a card
                  </Text>
                </Button>
              )}
            </Footer>
            {activeAddCard && (
              <AddCardField listId={String(listId)} onClick={activeCard} />
            )}
          </CardBody>
        </Card>
      </ListWrapper>
    </>
  );
};

export default List;
