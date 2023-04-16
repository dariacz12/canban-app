import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  RadioGroup,
  Radio,
  Text,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { RefObject } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getTableListsList, moveList, updateListOrder } from "../api";
import usePageList from "../customHooks/usePageList";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import AlertDialogMoveCard from "./AlertDialogMoveCard";
import useToastAlert from "../customHooks/useToastAlert";

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
  const tableId = watch("tableId");

  const { data } = useQuery(
    `tableListsList${tableId}`,
    () => (tableId ? getTableListsList(String(tableId)) : null),
    {
      enabled: Boolean(tableId),
    }
  );

  const { data: dataFirstTable } = useQuery(
    `tableListsList${tableFirstId}`,
    () => (tableFirstId ? getTableListsList(String(tableFirstId)) : null),
    {
      enabled: Boolean(tableFirstId),
    }
  );
  const toast = useToastAlert();
  const originalListsOrderArray =
    data && JSON.parse(String(data.attributes.listOrder));
  const originalListsOrderFirstArray =
    dataFirstTable && JSON.parse(String(dataFirstTable.attributes.listOrder));
  const queryClient = useQueryClient();
  const updateListOrderMutation = useMutation(updateListOrder, {
    onSuccess: () => {},
    onError: () => {
      toast("Something went wrong!", "danger");
    },
    onSettled: () => {
      queryClient.invalidateQueries([`tableListsList${tableId}`]);
      queryClient.invalidateQueries([`tableListsList${tableFirstId}`]);
    },
  });

  const moveListtoAnotherBoard = useMutation(moveList, {
    onSuccess: () => {
      onClose();
    },
    onError: () => {
      toast("Something went wrong!", "danger");
    },
    onSettled: () => {
      queryClient.invalidateQueries([`tableListsList${tableId}`]);
      queryClient.invalidateQueries([`tableListsList${tableFirstId}`]);
    },
  });
  const onSubmit: SubmitHandler<Inputs> = ({ tableId: id }) => {
    !cardMove ? moveListtoAnotherBoard.mutate({ tableId, listId }) : onOpen();
    updateListOrderMutation.mutate({
      tableId: String(tableId),
      listOrder: [...originalListsOrderArray, listId],
    });

    updateListOrderMutation.mutate({
      tableId: String(tableFirstId),
      listOrder: originalListsOrderFirstArray.filter(
        ({ id }: { id: string }) => String(id) !== String(listId)
      ),
    });
  };

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
          <AlertDialogHeader>Choose new board: </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <RadioGroup
              onChange={(id) => {
                id && setValue("tableId", String(id));
              }}
            >
              <Stack direction="column">
                {state?.map(({ id, boardName }) => (
                  <Radio key={id} value={String(id)} colorScheme="teal">
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
        tableId={tableId}
        cardMove={true}
        cardId={cardId}
        listIdFrom={String(listId)}
      />
      );
    </AlertDialog>
  );
};

export default AlertDialogMoveList;
