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

import { useMutation } from "react-query";
import { createTable } from "../api";
import Dropzone from "./Dropzone";
import styled from "styled-components";

const Wraper = styled.div``;
type Inputs = {
  title: string;
  imageName: string;
};
const AlertDialogAddAttachment = ({
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
        <AlertDialogContent style={{ maxWidth: "400px" }}>
          <AlertDialogCloseButton />
          <AlertDialogBody style={{ margin: "5px", marginTop: "40px" }}>
            <FormLabel>Add attachments:</FormLabel>
            <Wraper style={{ paddingTop: "20px" }}>
              <Dropzone />
            </Wraper>
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
              Add
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </form>
    </AlertDialog>
  );
};

export default AlertDialogAddAttachment;
