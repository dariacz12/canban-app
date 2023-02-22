import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Card,
  CardBody,
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

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
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
            <Card>
              <CardBody>
                <FormLabel>Create Board Title:</FormLabel>
                <Input
                  placeholder="Board Title"
                  style={{ marginBottom: "20px" }}
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <span style={{ color: "red" }}>This field is required!</span>
                )}
                <AddBackgroundImage
                  imageName={imageName}
                  onChange={(imageName) => {
                    setValue("imageName", imageName);
                  }}
                />
              </CardBody>
            </Card>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
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
