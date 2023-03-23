import {
  Box,
  Card,
  CardBody,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { getCardData } from "../api";
import CartItemEdit from "./CartItemEdit";

const CardItem = ({
  title,
  cardId,
  listId,
}: {
  title: string;
  cardId: string;
  listId: string;
}) => {
  const { data } = useQuery(`cardData${cardId}`, () =>
    getCardData(String(cardId))
  );
  const cover = data?.attributes.cover;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card onClick={onOpen} style={{ margin: "7px 0px", display: "flex" }}>
        <CardBody padding={"0px"}>
          {cover && (
            <Box
              backgroundColor={"#BFBFBF"}
              width={"100%"}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                maxW="150px"
                maxH="150px"
                src={require(`../photos/${cover}.jpg`)}
                alt="register photo"
              />
            </Box>
          )}
          <Text padding={"20px"}>{title}</Text>
        </CardBody>
      </Card>

      <CartItemEdit
        title={title}
        isOpen={isOpen}
        onClose={onClose}
        cardId={cardId}
        listId={listId}
      />
    </>
  );
};

export default CardItem;
