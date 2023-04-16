import {
  Card,
  CardBody,
  Heading,
  Image,
  Input,
  Select,
} from "@chakra-ui/react";
import useMediaQuery, { MediaQueryKey } from "use-media-antd-query";

import styled from "styled-components";
import AddNewBoard from "../components/AddNewBoard";
import { useQuery } from "react-query";
import BoardElement from "../components/BoardElement";
import { useEffect, useState } from "react";
import { getTableList } from "../api";
import usePageList from "../customHooks/usePageList";
import { useNavigate } from "react-router-dom";

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const WrapSelect = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const testBoardTable = [
  { id: 1, imageName: "boardelementphototest1", boardName: "Test Board 1" },
  { id: 2, imageName: "boardelementphototest2", boardName: "Test Board 2" },
  { id: 3, imageName: "boardelementphototest3", boardName: "Test Board 3" },
  { id: 4, imageName: "boardelementphototest4", boardName: "Test Board 4" },
  { id: 5, imageName: "boardelementphototest5", boardName: "Test Board 5" },
  { id: 6, imageName: "boardelementphototest6", boardName: "Test Board 6" },
];

const Dashboard = () => {
  const [state, setState] = usePageList();

  const mediaQuery = useMediaQuery();
  const sortTable = (value: string) => {
    if (state) {
      value === "A-Z"
        ? setState(
            [...state].sort((a, b) => {
              if (a.boardName < b.boardName) {
                return -1;
              }
              if (a.boardName > b.boardName) {
                return 1;
              }
              return 0;
            })
          )
        : setState(
            [...state].sort((a, b) => {
              if (a.boardName > b.boardName) {
                return -1;
              }
              if (a.boardName > b.boardName) {
                return 1;
              }
              return 0;
            })
          );
    }
  };

  const [searchInput, setSearchInput] = useState("");

  return (
    <div>
      <Card style={{ marginBottom: "40px" }}>
        <CardBody>
          <Heading size="md" style={{ marginBottom: "20px" }}>
            Create New Board
          </Heading>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <AddNewBoard />
            {mediaQuery === "xs" ? undefined : mediaQuery ===
              "sm" ? undefined : mediaQuery ===
              "md" ? undefined : mediaQuery === "lg" ? undefined : (
              <Image
                src={require("../photos/dashboardphoto.png")}
                maxW={"650px"}
                borderRadius="lg"
              />
            )}
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Heading size="md" style={{ marginBottom: "20px" }}>
            Boards
          </Heading>
          <WrapSelect>
            <Select
              id="select"
              placeholder="Sort by"
              maxWidth={200}
              onChange={(value) => {
                sortTable(value.target.value);
              }}
            >
              <option value="A-Z">Alphabetically A-Z</option>
              <option value="Z-A">Alphabetically Z-A</option>
            </Select>
            {mediaQuery === "xs" ? (
              <span style={{ width: "20px" }}></span>
            ) : mediaQuery === "sm" ? (
              <span style={{ width: "80px" }}></span>
            ) : (
              <span style={{ width: "800px" }}></span>
            )}
            <Input
              placeholder="Search here"
              type="search"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
              maxWidth={200}
            />
          </WrapSelect>
          <Wrap>
            {state &&
              state
                .filter((item) => {
                  return searchInput.toLowerCase() === ""
                    ? item
                    : item.boardName
                        .toLowerCase()
                        .includes(searchInput.toLowerCase());
                })
                .map(({ id, starred, imageName, boardName }) => (
                  <BoardElement
                    id={id}
                    starred={starred}
                    imageName={imageName}
                    boardName={boardName}
                  />
                ))}
          </Wrap>
        </CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;
