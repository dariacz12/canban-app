import { Card, CardBody, Image, useDisclosure } from "@chakra-ui/react";
import React, { useRef } from "react";
import AlertDialogNewBoard from "./AlertDialogNewBoard";

export default function AddNewBoard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <Card
        cursor="pointer"
        maxW="2xs"
        minW={"2xs"}
        marginLeft={"40px"}
        onClick={onOpen}
      >
        <CardBody>
          <Image src={require("../photos/addboard.png")} borderRadius="lg" />
        </CardBody>
      </Card>
      <AlertDialogNewBoard
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
      />
    </>
  );
}
