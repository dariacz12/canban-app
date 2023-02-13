import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  color,
  Divider,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";

export default function AddNewBoard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <Card maxW="2xs" onClick={onOpen}>
        <CardBody>
          <Image src={require("../photos/addboard.png")} borderRadius="lg" />
        </CardBody>
      </Card>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Create Board</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Input placeholder="Board Title" />
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
            >
              Create
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
