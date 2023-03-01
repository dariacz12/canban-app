import { StarIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BoardElement = ({
  id,
  imageName,
  boardName,
}: {
  id: number;
  imageName: string;
  boardName: string;
}) => {
  const navigate = useNavigate();
  const [activeStar, setActiveStar] = useState<Boolean>(false);
  return (
    <Card cursor={"pointer"} maxW="2xs" style={{ margin: "20px" }}>
      <CardBody onClick={() => navigate(`/tablepage/:${id}`)} padding="15px">
        <Image src={require(`../photos/${imageName}.jpg`)} borderRadius="md" />
      </CardBody>
      <Divider style={{ color: "#53735E" }} />
      <CardFooter
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Heading
          onClick={() => navigate(`/tablepage/:${id}`)}
          fontWeight="medium"
          size="sm"
        >
          {boardName}
        </Heading>
        <StarIcon
          style={{ color: activeStar ? "#53735E" : "gray" }}
          onClick={() => setActiveStar(!activeStar)}
        />
      </CardFooter>
    </Card>
  );
};

export default BoardElement;
