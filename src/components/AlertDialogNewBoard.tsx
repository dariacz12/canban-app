import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { RefObject } from "react";
import AddBackgroundImage from "./AddBackgroundImage";

import { useMutation } from "react-query";
import { createTable } from "../api";

type Inputs = {
  title: string;
  imageName: string;
};
const AlertDialogNewBoard = ({
  isOpen,
  onClose,
  cancelRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: RefObject<HTMLButtonElement>;
}) => {
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const addNewTable = useMutation(createTable, {
    onSuccess: () => {
      alert("Your board was successfully created!");
      onClose();
    },
    onError: () => {
      alert("Something went wrong!");
    },
  });
  const onSubmit: SubmitHandler<Inputs> = ({ title, imageName }) => {
    addNewTable.mutate({ title, imageName });
    console.log("data", { title, imageName });
  };

  const imageName = watch("imageName");
  console.log(1, imageName);
  const handleClick = () => {
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
        <AlertDialogContent>
          <AlertDialogHeader>Create Board</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <FormLabel>Create Board Title:</FormLabel>
            <Input
              placeholder="Board Title"
              style={{ marginBottom: "20px" }}
              {...register("title", { required: true, maxLength: 18 })}
            />
            {errors.title?.type === "required" && (
              <span style={{ color: "red" }}>This field is required!</span>
            )}
            {errors.title?.type === "maxLength" && (
              <p style={{ color: "red" }} role="alert">
                Max Length is 18 symbols
              </p>
            )}
            <FormLabel>Choose Background Image for your Board: </FormLabel>
            <AddBackgroundImage
              imageName={imageName}
              onChange={(imageName) => {
                setValue("imageName", imageName);
              }}
            />
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

export default AlertDialogNewBoard;
