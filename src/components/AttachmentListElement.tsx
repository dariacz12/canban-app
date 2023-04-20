import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { BASE_URL, deleteAttachmentId } from "../api";
import useToastAlert from "../customHooks/useToastAlert";
import { Media } from "./CartItemEdit";

const AttachmentListElement = ({
  attachmentIds,
  id,
  attributes,
  cardId,
}: {
  attachmentIds: Media[] | undefined;
  id: number;
  attributes: { name: string; url: string };
  cardId: string;
}) => {
  const {
    isOpen: isOpenAttachments,
    onOpen,
    onClose: isCloseAttachment,
  } = useDisclosure();
  const toast = useToastAlert();
  const queryClientCheckboxDelete = useQueryClient();
  const deleteCheckboxMutation = useMutation(deleteAttachmentId, {
    onSuccess: () => {},
    onError: () => {
      toast("Something went wrong!", "danger");
    },
    onSettled: () => {
      queryClientCheckboxDelete.invalidateQueries([`cardData${cardId}`]);
    },
  });
  return (
    <div key={id}>
      <>
        <Button marginTop={"20px"} onClick={onOpen}>
          {attributes.name}
        </Button>
        <CloseIcon
          onClick={() => {
            deleteCheckboxMutation.mutate({
              attachmentIds: attachmentIds?.filter(
                (element) => element.id !== id
              ),
              cardId: cardId,
            });
          }}
          marginLeft={"5px"}
          boxSize={1.5}
          color="gray.400"
        />
      </>
      <Modal
        size={"3xl"}
        isOpen={isOpenAttachments}
        onClose={isCloseAttachment}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{attributes.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            paddingBottom={"40px"}
            textAlign={"center"}
            justifyContent={"center"}
            display={"flex"}
          >
            <Box boxSize="2xl">
              <Image src={`${BASE_URL}${attributes.url}`} alt="attachment" />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AttachmentListElement;
