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
import useMakeTableStarred from "../customHooks/useStarredTable";
import useStarredTable from "../customHooks/useStarredTable";

const BoardElement = ({
  id,
  imageName,
  boardName,
  starred,
}: {
  id: number;
  imageName: string;
  boardName: string;
  starred: boolean;
}) => {
  const navigate = useNavigate();

  const { mutate } = useMakeTableStarred(String(id));
  const starrtedTable = (tableId: string | undefined) => {
    mutate({ starred: Boolean(!starred), tableId });
  };
  return (
    <Card cursor={"pointer"} maxW="2xs" style={{ margin: "20px" }}>
      <CardBody onClick={() => navigate(`/tablepage/${id}`)} padding="15px">
        <Image src={require(`../photos/${imageName}.jpg`)} borderRadius="md" />
      </CardBody>
      <Divider style={{ color: "#53735E" }} />
      <CardFooter
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Heading
          onClick={() => navigate(`/tablepage/${id}`)}
          fontWeight="medium"
          size="sm"
        >
          {boardName}
        </Heading>
        <StarIcon
          style={{ color: starred ? "#53735E" : "whitesmoke" }}
          onClick={() => starrtedTable(String(id))}
        />
      </CardFooter>
    </Card>
  );
};

export default BoardElement;
