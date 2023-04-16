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

import { useMutation, useQueryClient } from "react-query";
import { createTable, updateCardCover } from "../api";
import useToastAlert from "../customHooks/useToastAlert";

type Inputs = {
  imageName: string;
  cardId: string;
};
const AlertDialogAddCover = ({
  cardId,
  isOpen,
  onClose,
  cancelRef,
}: {
  cardId: string;
  isOpen: boolean;
  onClose: () => void;
  cancelRef: RefObject<HTMLButtonElement>;
}) => {
  const {
    setValue,
    handleSubmit,
    watch,
    reset,
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const toast = useToastAlert();
  const queryClientCardCoverUpdate = useQueryClient();
  const updateCardCoverMutation = useMutation(updateCardCover, {
    onSuccess: () => {
      onClose();
    },
    onError: () => {
      toast("Something went wrong!", "danger");
    },
    onSettled: () => {
      queryClientCardCoverUpdate.invalidateQueries([`cardData${cardId}`]);
    },
  });
  const onSubmit: SubmitHandler<Inputs> = ({ imageName }) => {
    updateCardCoverMutation.mutate({ coverImage: imageName, cardId });
  };

  const imageName = watch("imageName");
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <AlertDialogCloseButton />
          <AlertDialogBody
            style={{ marginTop: "40px", overflow: "scroll", maxHeight: 500 }}
          >
            <FormLabel style={{ marginLeft: "40px" }}>
              Choose a cover image:
            </FormLabel>
            <AddBackgroundImage
              imageName={imageName}
              onChange={(imageName) => {
                setValue("imageName", imageName);
              }}
            />
            {errors.imageName?.type === "required" && (
              <p style={{ color: "red" }} role="alert">
                Choose a cover image!
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
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogAddCover;
