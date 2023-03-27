import { EllipsisOutlined } from "@ant-design/icons";
import {
  AddIcon,
  ArrowForwardIcon,
  CopyIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
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
import { deleteList, getListsListCardsTitles, updateListTitle } from "../api";
import useClickOutside from "../customHooks/useClickOutside";
import usePageList from "../customHooks/usePageList";
import AddCardField from "./AddCardField";
import AlertDialogMoveList from "./AlertDialogMoveList";
import AlertDialogNewBoard from "./AlertDialogNewBoard";
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
const List = ({ listId, listName }: { listId: string; listName: string }) => {
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
  const queryClientDelete = useQueryClient();
  const deleteListsListMutation = useMutation(deleteList, {
    onSuccess: () => {
      navigate(`/tablepage/${tableId}`);
    },
    onError: () => {
      alert("Something went wrong");
    },
    onSettled: () => {
      queryClientDelete.invalidateQueries([`tableListsList${tableId}`]);
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
      <Card
        minW="231px"
        h={"fit-content"}
        style={{
          margin: "0px 20px",
          background: "#e5e5e5",
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
                {/* <MenuItem icon={<CopyIcon />}>Copy list</MenuItem> */}
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
    </>
  );
};

export default List;
