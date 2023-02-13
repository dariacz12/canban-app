import {
  Card,
  CardBody,
  Heading,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import AddNewBoard from "../components/AddNewBoard";
import TransitionExample from "../components/AddNewBoard";
import BoardElement from "../components/forms/BoardElement";
import MainLayout from "../components/MainLayout";
import Menu from "../components/Menu";

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const testBoardTable = [
  { id: 1, imageName: "boardelementphototest1", boardName: "Test Board 1" },
  { id: 2, imageName: "boardelementphototest2", boardName: "Test Board 2" },
  { id: 3, imageName: "boardelementphototest3", boardName: "Test Board 3" },
  { id: 4, imageName: "boardelementphototest4", boardName: "Test Board 4" },
  { id: 5, imageName: "boardelementphototest5", boardName: "Test Board 5" },
  { id: 6, imageName: "boardelementphototest6", boardName: "Test Board 6" },
];
const MainPage = () => {
  return (
    <div>
      <Card style={{ marginBottom: "40px" }}>
        <CardBody>
          <Heading size="md" style={{ marginBottom: "20px" }}>
            Create New Board
          </Heading>
          <AddNewBoard />
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Heading size="md" style={{ marginBottom: "20px" }}>
            Boards
          </Heading>
          <Wrap>
            {testBoardTable.map(({ imageName, boardName }) => (
              <BoardElement imageName={imageName} boardName={boardName} />
            ))}
          </Wrap>
        </CardBody>
      </Card>
    </div>
  );
};

export default MainPage;
