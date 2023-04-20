import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Avatar,
  Button,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { RefObject, useState } from "react";
import AddBackgroundImage from "./AddBackgroundImage";
import { useMutation, useQueryClient } from "react-query";
import {
  BASE_URL,
  createTable,
  updateAttachmentId,
  uploadAttachment,
} from "../api";
import styled from "styled-components";
import useToastAlert from "../customHooks/useToastAlert";
import Dropzone from "react-dropzone";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Media } from "./CartItemEdit";

const Wraper = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-around;
`;
type Inputs = {};
const AlertDialogAddAttachment = ({
  isOpen,
  onClose,
  cancelRef,
  cardId,
  attachmentIds,
}: {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: RefObject<HTMLButtonElement>;
  cardId: string;
  attachmentIds: Media[] | undefined;
}) => {
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [attachment, setAttachment] = useState();
  const [attachmentId, setAttachmentId] = useState();
  const toast = useToastAlert();
  const queryClient = useQueryClient();
  const addNewTable = useMutation(createTable, {
    onSuccess: () => {
      toast("Your board was successfully created!");
      onClose();
    },
    onError: () => {
      toast("Something went wrong!", "danger");
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async ({}) => {
    attachmentId &&
      (await updateAttachmentId({ attachmentId, cardId, attachmentIds }));
    setAttachment(undefined);
    queryClient.invalidateQueries([`cardData${cardId}`]);
    onClose();
  };

  const handleClick = () => {
    reset();
    setAttachment(undefined);
    onClose();
  };

  const handleFileUpload = async (file: File) => {
    try {
      const form = new FormData();
      form.append("files", file);
      const response = await uploadAttachment(form);
      console.log("response", response.data[0]);
      setAttachment(response.data[0].url);

      setAttachmentId(response.data[0].id);
    } catch (error) {
      console.log(error);
    }
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
              <Dropzone
                onDrop={(acceptedFiles) => {
                  console.log(acceptedFiles[0]);
                  handleFileUpload(acceptedFiles[0]);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <CloudUploadOutlined
                        style={{
                          fontSize: "60px",
                          color: "#1a202c",
                          paddingLeft: "5px",
                        }}
                      />
                    </div>
                  </section>
                )}
              </Dropzone>
              {attachment && (
                <Avatar
                  size="md"
                  name="avatar"
                  src={`${BASE_URL}${attachment}`}
                />
              )}
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
