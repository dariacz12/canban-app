import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  background,
  Button,
  color,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Text,
  Stack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { RefObject, useState } from "react";
import AddBackgroundImage from "./AddBackgroundImage";

import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createTable,
  getListsListCardsTitles,
  getTableListsList,
  moveCardtoAnotherTable,
  moveList,
  updateCardsOrderInList,
} from "../api";
import usePageList from "../customHooks/usePageList";
import { SwapRightOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useToastAlert from "../customHooks/useToastAlert";

type Inputs = {
  listId: string;
};
const TableElement = styled.div``;
const AlertDialogMoveCard = ({
  isOpen,
  onClose,
  cancelRef,
  tableId,
  cardMove,
  cardId,
  listIdFrom,
}: {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: RefObject<HTMLButtonElement>;
  tableId?: string;
  cardMove: boolean;
  cardId: string;
  listIdFrom: string;
}) => {
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  let { tableId: tableFirstId } = useParams();
  const queryClient = useQueryClient();
  const listId = watch("listId");
  const { data: listData } = useQuery(`cardTitle${listId}`, () =>
    listId ? getListsListCardsTitles(String(listId)) : null
  );
  const { data: dataFirstList } = useQuery(`cardTitle${listIdFrom}`, () =>
    listIdFrom ? getListsListCardsTitles(String(listIdFrom)) : null
  );
  const toast = useToastAlert();
  const originalCardsOrderArray =
    listData && JSON.parse(String(listData.attributes.cardOrder));
  const originalCardsOrderFirstArray =
    dataFirstList && JSON.parse(String(dataFirstList.attributes.cardOrder));
  const updateCardOrderMutation = useMutation(updateCardsOrderInList, {
    onSuccess: () => {},
    onError: () => {
      toast("Something went wrong!", "danger");
    },
    onSettled: () => {
      queryClient.invalidateQueries([`cardTitle${listId}`]);
    },
  });

  const moveCardtoAnotherBoard = useMutation(moveCardtoAnotherTable, {
    onSuccess: () => {
      onClose();
    },
    onError: () => {
      toast("Something went wrong!", "danger");
    },
    onSettled: () => {
      queryClient.invalidateQueries([`cardTitle${listId}`]);
      queryClient.invalidateQueries([`cardTitle${listIdFrom}`]);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = ({ listId: id }) => {
    moveCardtoAnotherBoard.mutate({ tableId: String(tableId), listId, cardId });
    updateCardOrderMutation.mutate({
      listId: String(listId),
      cardOrder: [...originalCardsOrderArray, Number(cardId)],
    });

    updateCardOrderMutation.mutate({
      listId: String(listIdFrom),
      cardOrder: originalCardsOrderFirstArray.filter(
        (card: string) => String(card) !== String(cardId)
      ),
    });
  };

  const handleClick = () => {
    reset();
    onClose();
  };
  const { data } = useQuery(
    `tableListsList${tableId}`,
    () => (tableId ? getTableListsList(String(tableId)) : null),
    {
      enabled: Boolean(tableId),
    }
  );

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={handleClick}
      isOpen={isOpen}
      isCentered
      size={"2xl"}
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <AlertDialogOverlay />
        <AlertDialogContent
          padding={"20px 30px"}
          maxW={"500px"}
          height={"400px"}
        >
          <AlertDialogHeader>Move your card to next list: </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <RadioGroup
              onChange={(id) => {
                setValue("listId", String(id));
              }}
            >
              <Stack direction="column">
                {data?.attributes?.lists?.data.map(({ attributes, id }) => (
                  <Radio value={String(id)} colorScheme="teal">
                    <Text fontSize="sm" margin={"5px"} cursor={"pointer"}>
                      {attributes.title}{" "}
                    </Text>
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleClick}>
              Cancel
            </Button>
            <Button
              background="#53735E"
              color="#F2F2F2"
              _hover={{ color: "black", bg: "#F2F2F2" }}
              ml={3}
              type="submit"
            >
              Move
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </form>
    </AlertDialog>
  );
};

export default AlertDialogMoveCard;
