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
  useDisclosure,
} from "@chakra-ui/react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import React, { RefObject, useState } from "react";
import AddBackgroundImage from "./AddBackgroundImage";

import { useMutation, useQueryClient } from "react-query";
import { createTable, moveList } from "../api";
import usePageList from "../customHooks/usePageList";
import { SwapRightOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import AlertDialogMoveCard from "./AlertDialogMoveCard";

type Inputs = {
  tableId: string;
};
const TableElement = styled.div``;
const AlertDialogMoveList = ({
  isOpen,
  onClose,
  cancelRef,
  listId,
  cardMove,
  cardId,
}: {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: RefObject<HTMLButtonElement>;
  listId: string;
  cardMove: boolean;
  cardId: string;
}) => {
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const {
    isOpen: isOpenAlertMoveCard,
    onOpen,
    onClose: onCloseCard,
  } = useDisclosure();
  const cancelRefAlertMoveCard = React.useRef<HTMLButtonElement>(null);
  let { tableId: tableFirstId } = useParams();
  const queryClient = useQueryClient();
  const moveListtoAnotherBoard = useMutation(moveList, {
    onSuccess: () => {
      onClose();
    },
    onError: () => {
      alert("Something went wrong!");
    },
    onSettled: () => {
      queryClient.invalidateQueries([`tableListsList${tableId}`]);
      queryClient.invalidateQueries([`tableListsList${tableFirstId}`]);
    },
  });
  const onSubmit: SubmitHandler<Inputs> = ({ tableId: id }) => {
    !cardMove ? moveListtoAnotherBoard.mutate({ tableId, listId }) : onOpen();
  };

  const tableId = watch("tableId");
  const onCloseCardMoveAlert = () => {
    handleClick();
    onCloseCard();
  };
  const handleClick = () => {
    reset();
    onClose();
  };
  const [state] = usePageList();
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
          <AlertDialogHeader>Move your list to: </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <RadioGroup
              onChange={(id) => {
                setValue("tableId", String(id));
              }}
            >
              <Stack direction="column">
                {state?.map(({ id, boardName }) => (
                  <Radio value={String(id)} colorScheme="teal">
                    <Text fontSize="sm" margin={"5px"} cursor={"pointer"}>
                      {boardName}{" "}
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
      <AlertDialogMoveCard
        isOpen={isOpenAlertMoveCard}
        onClose={onCloseCardMoveAlert}
        cancelRef={cancelRefAlertMoveCard}
        tableId={String(tableId)}
        cardMove={true}
        cardId={cardId}
        listIdFrom={String(listId)}
      />
      );
    </AlertDialog>
  );
};

export default AlertDialogMoveList;
