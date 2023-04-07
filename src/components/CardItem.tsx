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
  onDragStart,
  dragOverItem,
  setSelectedCardId,
  current,
}: {
  title: string;
  cardId: string;
  listId: string;
  current: string;
  dragOverItem: React.MutableRefObject<any>;
  onDragStart: (e: React.DragEvent, cardId: string) => void;
  setSelectedCardId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data } = useQuery(`cardData${cardId}`, () =>
    getCardData(String(cardId))
  );
  const cover = data?.attributes.cover;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card
        draggable
        onDragStart={(e) => onDragStart(e, String(cardId))}
        onDragEnter={() => {
          dragOverItem.current = cardId;
          setSelectedCardId(dragOverItem.current);
        }}
        onClick={onOpen}
        style={{
          margin: "7px 0px",
          display: "flex",
          backgroundColor: current === cardId ? "#d6d6d6" : "white",
        }}
      >
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
