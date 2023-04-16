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
  Textarea,
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
  updateCardsOrderInList,
  updateListOrder,
  updateListTitle,
} from "../api";
import useClickOutside from "../customHooks/useClickOutside";
import usePageList from "../customHooks/usePageList";
import useToastAlert from "../customHooks/useToastAlert";
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
  height: 90vh;
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
  const handleOnDragCard = (e: React.DragEvent, cardId: string) => {
    e.dataTransfer.setData("cardId", cardId);
  };
  const { data } = useQuery(`cardTitle${listId}`, () =>
    getListsListCardsTitles(String(listId))
  );

  let cardOrder: number[] = [];
  if (data?.attributes.cardOrder) {
    cardOrder = JSON.parse(String(data?.attributes.cardOrder));
  }
  const updateCardsOrderMutationInFirstList = useMutation(
    updateCardsOrderInList,
    {
      onSuccess: () => {
        setSelectedCardId("");
      },
      onError: () => {
        toast("Something went wrong!", "danger");
      },
      onSettled: () => {},
    }
  );
  const handleOnDropCardToAnotherList = async (e: React.DragEvent) => {
    const draggableCardId = e.dataTransfer.getData("cardId") as string;

    const firstListId = String(
      (await getCardData(draggableCardId)).attributes.lists.data[0].id
    );
    const {
      attributes: { cardOrder: cardOrderFirst },
    } = await getListsListCardsTitles(String(firstListId));

    const cardOrderFirstList = JSON.parse(String(cardOrderFirst));

    if (listId !== firstListId) {
      await updateCardsOrderMutation.mutateAsync({
        listId: String(listId),
        cardOrder: [...cardOrder, Number(draggableCardId)],
      });
      await updateCardDatatMutation.mutateAsync({
        listId: String(listId),
        cardId: draggableCardId,
      });

      await updateCardsOrderMutationInFirstList.mutateAsync({
        listId: String(firstListId),
        cardOrder: cardOrderFirstList.filter(
          (cardId: String) => String(cardId) !== draggableCardId
        ),
      });
    }

    queryClient.invalidateQueries([`cardTitle${listId}`]);
    queryClient.invalidateQueries([`cardTitle${firstListId}`]);
  };

  const handleDragOverCardToAnotherList = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const toast = useToastAlert();
  const queryClient = useQueryClient();
  const updateCardDatatMutation = useMutation(updateCardParentList, {
    onSuccess: () => {},
    onError: () => {
      toast("Something went wrong");
    },
    onSettled: () => {},
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [state] = usePageList();

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
      toast("Something went wrong!", "danger");
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
      toast("Something went wrong");
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
      toast("Something went wrong");
    },
    onSettled: () => {
      queryClientUpdate.invalidateQueries([`tableListsList${tableId}`]);
    },
  });

  const handleDragOverCardInTheSameList = (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
  };

  const dragOverCardItem = React.useRef<any>(null);
  const [selectedCardId, setSelectedCardId] = useState("");
  const updateCardsOrderMutation = useMutation(updateCardsOrderInList, {
    onSuccess: () => {
      setSelectedCardId("");
    },
    onError: () => {
      toast("Something went wrong!", "danger");
    },
    onSettled: () => {
      queryClient.invalidateQueries([`cardTitle${listId}`]);
    },
  });

  const handleOnDropCardInTheSameList = async (e: React.DragEvent) => {
    const draggableCardId = e.dataTransfer.getData("cardId") as string;
    const originalCardsOrderArray = JSON.parse(
      String(data?.attributes.cardOrder)
    );
    const movedCardIndex = originalCardsOrderArray?.indexOf(
      Number(draggableCardId)
    );
    const { current: currentCard } = dragOverCardItem;
    const targetCardIndex = originalCardsOrderArray?.indexOf(
      Number(currentCard)
    );
    let newCardsOrderArray: string[] = [];
    if (Number(targetCardIndex) > Number(movedCardIndex)) {
      newCardsOrderArray =
        originalCardsOrderArray?.slice(
          movedCardIndex,
          Number(targetCardIndex) + 1
        ) ?? [];
      newCardsOrderArray?.forEach((element, index) => {
        let element2 = newCardsOrderArray[index + 1];
        if (element2) {
          newCardsOrderArray[index + 1] = element;
          newCardsOrderArray[index] = element2;
        }
      });

      const length = newCardsOrderArray.length;
      originalCardsOrderArray?.splice(
        Number(movedCardIndex),
        length,
        ...newCardsOrderArray
      );
    } else {
      newCardsOrderArray =
        originalCardsOrderArray
          ?.slice(Number(targetCardIndex), Number(movedCardIndex) + 1)
          .reverse() ?? [];

      newCardsOrderArray?.forEach((element, index) => {
        let element2 = newCardsOrderArray[index + 1];
        if (element2) {
          newCardsOrderArray[index + 1] = element;
          newCardsOrderArray[index] = element2;
        }
      });

      const length = newCardsOrderArray.length;
      originalCardsOrderArray?.splice(
        Number(targetCardIndex),
        length,
        ...newCardsOrderArray.reverse()
      );
    }
    originalCardsOrderArray &&
      updateCardsOrderMutation.mutate({
        listId: String(listId),
        cardOrder: originalCardsOrderArray,
      });
  };

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
        onDragOver={handleDragOverCardInTheSameList}
        onDrop={handleOnDropCardInTheSameList}
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
                  <Textarea
                    rows={2}
                    _placeholder={{
                      fontWeight: "bold",
                      fontSize: "sm",
                      color: "#4c4c4c",
                      wordWrap: "break-word",
                      wordBreak: "break-all",
                    }}
                    onClick={() => setValue("title", listName)}
                    focusBorderColor="#53735E"
                    placeholder={listName}
                    style={{ border: "none" }}
                    {...register("title", { maxLength: 18 })}
                    onChange={(
                      event: React.ChangeEvent<HTMLTextAreaElement>
                    ) => {
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
                JSON.parse(data.attributes.cardOrder) !== null &&
                JSON.parse(data.attributes.cardOrder).map(
                  (cardOrderId: string) =>
                    data?.attributes?.cards?.data?.map(
                      ({ attributes, id }) =>
                        String(cardOrderId) === String(id) && (
                          <CardItem
                            onDragStart={handleOnDragCard}
                            key={id}
                            title={attributes.title}
                            cardId={String(id)}
                            listId={listId}
                            dragOverItem={dragOverCardItem}
                            setSelectedCardId={setSelectedCardId}
                            current={String(selectedCardId)}
                          />
                        )
                    )
                )}
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
