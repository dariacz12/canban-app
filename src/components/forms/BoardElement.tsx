import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
} from "@chakra-ui/react";
import React from "react";

const BoardElement = ({
  imageName,
  boardName,
}: {
  imageName: string;
  boardName: string;
}) => {
  return (
    <Card maxW="2xs" style={{ margin: "20px" }}>
      <CardBody>
        <Image
          src={require(`../../photos/${imageName}.jpg`)}
          borderRadius="lg"
        />
      </CardBody>
      <Divider />
      <CardFooter>
        <Heading size="md">{boardName}</Heading>
      </CardFooter>
    </Card>
  );
};

export default BoardElement;
