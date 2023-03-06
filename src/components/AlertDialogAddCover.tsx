import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button,
  FormLabel,
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
const AlertDialogAddCover = ({
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
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogCloseButton />
        <AlertDialogBody
          style={{ marginTop: "40px", overflow: "scroll", maxHeight: 500 }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel style={{ marginLeft: "40px" }}>
              Choose a cover image:
            </FormLabel>
            <AddBackgroundImage
              imageName={imageName}
              onChange={(imageName) => {
                setValue("imageName", imageName);
              }}
            />
          </form>
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
    </AlertDialog>
  );
};

export default AlertDialogAddCover;
