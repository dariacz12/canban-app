import {
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AlertDialogAddCheckList from "./AlertDialogAddChecklist";
import MenuCardItemEdit from "./MenuCardItemEdit";
import React from "react";
import AlertDialogAddAttachment from "./AlertDialogAddAttachment";
import AlertDialogAddCover from "./AlertDialogAddCover";

const Main = styled.div`
  display: flex;
  width: 100%;
`;
const TextAriaContainer = styled.div`
  margin-left: 20px;
  width: 100%;
`;
type Inputs = {
  title: string;
};
const CartItemEdit = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const {
    isOpen: isOpenCheckList,
    onOpen: onOpenCheckList,
    onClose: onCloseCheckList,
  } = useDisclosure();
  const {
    isOpen: isOpenAttachment,
    onOpen: onOpenAttachment,
    onClose: onCloseAttachment,
  } = useDisclosure();
  const {
    isOpen: isOpenCover,
    onOpen: onOpenCover,
    onClose: onCloseCover,
  } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  return (
    <>
      <Modal isOpen={isOpen && !isOpenCover} onClose={onClose}>
        <ModalContent
          style={{
            maxHeight: 500,
            maxWidth: "700px",
            top: "80px",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <ModalCloseButton />
          <ModalBody>
            <Input
              maxW={"380px"}
              _placeholder={{
                fontWeight: "bold",
                fontSize: "sm",
                color: "#4c4c4c",
              }}
              focusBorderColor="#53735E"
              placeholder="List Title"
              style={{ border: "none", margin: "10px" }}
              {...register("title", { maxLength: 18 })}
            />
            {errors.title?.type === "maxLength" && (
              <p style={{ color: "red" }} role="alert">
                Max Length is 18 symbols
              </p>
            )}
            <Main>
              <MenuCardItemEdit
                onClickCheckList={() => onOpenCheckList()}
                onClickAttachment={() => onOpenAttachment()}
                onClickCover={() => onOpenCover()}
              />
              <TextAriaContainer>
                <Text fontSize="md" marginBottom={"10px"}>
                  Description
                </Text>
                <Textarea
                  focusBorderColor="#53735E"
                  placeholder="Add more detailed description ..."
                  _placeholder={{ fontSize: "sm" }}
                  style={{ marginBottom: "10px", maxWidth: "450px" }}
                  {...register("title", { maxLength: 2000 })}
                />
                {errors.title?.type === "maxLength" && (
                  <p style={{ color: "red" }} role="alert">
                    Max Length is 2000 symbols
                  </p>
                )}
              </TextAriaContainer>
            </Main>
          </ModalBody>
        </ModalContent>
      </Modal>
      <AlertDialogAddCheckList
        isOpen={isOpenCheckList}
        onClose={onCloseCheckList}
        cancelRef={cancelRef}
      />
      <AlertDialogAddAttachment
        isOpen={isOpenAttachment}
        onClose={onCloseAttachment}
        cancelRef={cancelRef}
      />
      <AlertDialogAddCover
        isOpen={isOpenCover}
        onClose={onCloseCover}
        cancelRef={cancelRef}
      />
    </>
  );
};

export default CartItemEdit;
