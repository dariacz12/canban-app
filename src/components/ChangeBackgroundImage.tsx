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
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { updateTableImage } from "../api";
import useToastAlert from "../customHooks/useToastAlert";
type Inputs = {
  imageName: string;
};
const ChangeBackgroundImage = ({
  isOpen,
  onClose,
  cancelRef,
  tableId,
}: {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: RefObject<HTMLButtonElement>;
  tableId: string | undefined;
}) => {
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const toast = useToastAlert();
  const queryClient = useQueryClient();
  const updateBackgroundImageTable = useMutation(updateTableImage, {
    onSuccess: () => {
      onClose();
    },
    onError: () => {
      toast("Something went wrong!", "danger");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tableList"]);
    },
  });
  const onSubmit: SubmitHandler<Inputs> = ({ imageName }) => {
    updateBackgroundImageTable.mutate({ imageName, tableId });
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
          <AlertDialogHeader>Change Background:</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Card>
              <CardBody>
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
              Update
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </form>
    </AlertDialog>
  );
};

export default ChangeBackgroundImage;
