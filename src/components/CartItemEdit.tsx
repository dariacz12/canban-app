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
import React, { useState } from "react";
import AlertDialogAddAttachment from "./AlertDialogAddAttachment";
import AlertDialogAddCover from "./AlertDialogAddCover";
import Ckecklist from "./Ckecklist";

const Main = styled.div`
  display: flex;
  width: 100%;
`;
const RightMain = styled.div`
  /* margin-left: 40px;
  margin-right: 40px; */

  width: 100%;
`;
const LeftMain = styled.div``;
const TextAriaContainer = styled.div`
  /* margin: 0px 0px 0px 20px; */
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
            <Input
              maxW={"380px"}
              _placeholder={{
                fontWeight: "bold",
                fontSize: "sm",
                color: "#4c4c4c",
              }}
              focusBorderColor="#53735E"
              placeholder="List Title"
              style={{ border: "none", margin: "10px 30px" }}
              {...register("title", { maxLength: 18 })}
            />
            {errors.title?.type === "maxLength" && (
              <p style={{ color: "red" }} role="alert">
                Max Length is 18 symbols
              </p>
            )}
            <Main>
              <LeftMain>
                <MenuCardItemEdit
                  onClickCheckList={() => onOpenCheckList()}
                  onClickAttachment={() => onOpenAttachment()}
                  onClickCover={() => onOpenCover()}
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
                  <Textarea
                    focusBorderColor="#53735E"
                    placeholder="Add more detailed description ..."
                    _placeholder={{ fontSize: "sm" }}
                    style={{ marginBottom: "10px" }}
                    {...register("title", { maxLength: 2000 })}
                  />
                  {errors.title?.type === "maxLength" && (
                    <p style={{ color: "red" }} role="alert">
                      Max Length is 2000 symbols
                    </p>
                  )}
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
