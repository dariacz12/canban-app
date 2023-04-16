import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { RefObject } from "react";
import AddBackgroundImage from "./AddBackgroundImage";

import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createTable,
  createToDoList,
  getListsToDoListTitles,
  getToDoListData,
} from "../api";
import useToastAlert from "../customHooks/useToastAlert";

type Inputs = {
  toDoTitle: string;
};
const AlertDialogAddCheckList = ({
  isOpen,
  onClose,
  cancelRef,
  cardId,
}: {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: RefObject<HTMLButtonElement>;
  cardId: string;
}) => {
  const {
    resetField,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ toDoTitle }) => {
    addNewToDoList.mutate({ toDoTitle, cardId });
    resetField("toDoTitle");
  };
  const toast = useToastAlert();
  const queryClientDescriptionUpdate = useQueryClient();
  const addNewToDoList = useMutation(createToDoList, {
    onSuccess: () => {
      onClose();
    },
    onError: () => {
      toast("Something went wrong!", "danger");
    },
    onSettled: () => {
      queryClientDescriptionUpdate.invalidateQueries([
        `ListsToDoListTitles${cardId}`,
      ]);
    },
  });

  const handleClick = () => {
    resetField("toDoTitle");
    reset();
    onClose();
  };

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
        <AlertDialogContent style={{ maxWidth: "400px" }}>
          <AlertDialogCloseButton />
          <AlertDialogBody style={{ marginTop: "40px" }}>
            <FormLabel>Create Checklist Title:</FormLabel>
            <Input
              placeholder="Your title"
              style={{
                marginTop: "10px",
                marginBottom: "20px",
              }}
              {...register("toDoTitle", { required: true, maxLength: 18 })}
            />
            {errors.toDoTitle?.type === "required" && (
              <span style={{ color: "red" }}>This field is required!</span>
            )}
            {errors.toDoTitle?.type === "maxLength" && (
              <p style={{ color: "red" }} role="alert">
                Max Length is 18 symbols
              </p>
            )}
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
              Create
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </form>
    </AlertDialog>
  );
};

export default AlertDialogAddCheckList;
