import {
  Box,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import useMediaQuery, { MediaQueryKey } from "use-media-antd-query";

import { useForm } from "react-hook-form";
import styled from "styled-components";
import AlertDialogAddCheckList from "./AlertDialogAddChecklist";
import MenuCardItemEdit from "./MenuCardItemEdit";
import React, { useRef, useState } from "react";
import AlertDialogAddAttachment from "./AlertDialogAddAttachment";
import AlertDialogAddCover from "./AlertDialogAddCover";
import Ckecklist from "./Ckecklist";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getCardData, updateCardDescription, updateCardTitle } from "../api";
import useClickOutside from "../customHooks/useClickOutside";
const Wrap = styled.div``;
const Main = styled.div`
  display: flex;
  width: 100%;
`;
const RightMain = styled.div`
  width: 100%;
`;
const LeftMain = styled.div``;
const TextAriaContainer = styled.div``;

type Inputs = {
  title: string;
  description: string;
};
const CartItemEdit = ({
  isOpen,
  onClose,
  title,
  cardId,
  listId,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;

  cardId: string;
  listId: string;
}) => {
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const mediaQuery = useMediaQuery();
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
  const [cover, setCover] = useState<Boolean>(false);

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  };
  const cardTitleInputWraperRef = useRef<HTMLDivElement>(null);

  const onTitleSaved = () => {
    resetField("title");
  };
  const onSubmitTitle = () => onTitleSaved();
  useClickOutside(cardTitleInputWraperRef, onTitleSaved);

  const queryClientTitleUpdate = useQueryClient();
  const updateCardTitleMutation = useMutation(updateCardTitle, {
    onSuccess: () => {},
    onError: () => {
      alert("Something went wrong");
    },
    onSettled: () => {
      queryClientTitleUpdate.invalidateQueries([`cardTitle${listId}`]);
    },
  });
  const { data } = useQuery(`cardData${cardId}`, () =>
    getCardData(String(cardId))
  );
  const description = data?.attributes?.description;

  const cardDescriptionWraperRef = useRef<HTMLDivElement>(null);
  const onDescriptionSaved = () => {
    resetField("description");
  };
  const onSubmitDescription = () => onDescriptionSaved();
  useClickOutside(cardTitleInputWraperRef, onDescriptionSaved);

  const queryClientDescriptionUpdate = useQueryClient();
  const updateCardDescriptionMutation = useMutation(updateCardDescription, {
    onSuccess: () => {},
    onError: () => {
      alert("Something went wrong");
    },
    onSettled: () => {
      queryClientDescriptionUpdate.invalidateQueries([`cardData${cardId}`]);
    },
  });
  return (
    <>
      <Modal isOpen={isOpen && !isOpenCover} onClose={onClose}>
        <ModalContent
          style={{
            maxHeight: 500,
            maxWidth: "700px",
            top: "80px",
            margin: " 0px 20px",
          }}
        >
          <ModalCloseButton />
          <ModalBody padding={"0px"}>
            {cover && (
              <Box
                backgroundColor={"#BFBFBF"}
                maxH="200px"
                width={"100%"}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  maxW="450px"
                  maxH="200px"
                  src={require("../photos/boardelementphototest2.jpg")}
                  alt="register photo"
                />
              </Box>
            )}
            <Wrap ref={cardTitleInputWraperRef}>
              <form onSubmit={handleSubmit(onSubmitTitle)}>
                <Input
                  maxW={"380px"}
                  _placeholder={{
                    fontWeight: "bold",
                    fontSize: "sm",
                    color: "#4c4c4c",
                  }}
                  onClick={() => setValue("title", title)}
                  focusBorderColor="#53735E"
                  placeholder={title}
                  {...register("title", { maxLength: 18 })}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    updateCardTitleMutation.mutate({
                      title: event.target.value,
                      cardId: String(cardId),
                    });
                  }}
                  style={{ border: "none", margin: "10px 30px" }}
                  onKeyPress={handleKeyPress}
                />
                {errors.title?.type === "maxLength" && (
                  <p style={{ color: "red" }} role="alert">
                    Max Length is 18 symbols
                  </p>
                )}
              </form>
            </Wrap>
            <Main>
              <LeftMain>
                <MenuCardItemEdit
                  onClickCheckList={() => onOpenCheckList()}
                  onClickAttachment={() => onOpenAttachment()}
                  onClickCover={() => onOpenCover()}
                  cardId={cardId}
                  listId={listId}
                  onClose={onClose}
                />
              </LeftMain>
              <RightMain
                style={{
                  padding:
                    mediaQuery === "sm"
                      ? "0px 60px"
                      : mediaQuery === "md"
                      ? "0px 60px"
                      : mediaQuery === "lg"
                      ? "0px 60px"
                      : mediaQuery === "xl"
                      ? "0px 60px"
                      : mediaQuery === "xxl"
                      ? "0px 60px"
                      : "0px 20px",
                }}
              >
                <TextAriaContainer>
                  <Text
                    color={"#4c4c4c"}
                    fontWeight="bold"
                    fontSize="sm"
                    marginBottom={"10px"}
                  >
                    Description
                  </Text>
                  <Wrap ref={cardDescriptionWraperRef}>
                    <form onSubmit={handleSubmit(onSubmitDescription)}>
                      <Textarea
                        focusBorderColor="#53735E"
                        placeholder={
                          description
                            ? description
                            : "Add more detailed description"
                        }
                        _placeholder={{ fontSize: "sm" }}
                        style={{ marginBottom: "10px" }}
                        {...register("description", { maxLength: 2000 })}
                        onClick={() =>
                          setValue(
                            "description",
                            String(description ? description : "")
                          )
                        }
                        onChange={(
                          event: React.ChangeEvent<HTMLTextAreaElement>
                        ) => {
                          updateCardDescriptionMutation.mutate({
                            description: event.target.value,
                            cardId: String(cardId),
                          });
                        }}
                      />
                      {errors.description?.type === "maxLength" && (
                        <p style={{ color: "red" }} role="alert">
                          Max Length is 2000 symbols
                        </p>
                      )}
                    </form>
                  </Wrap>
                </TextAriaContainer>
                <Ckecklist />
              </RightMain>
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
