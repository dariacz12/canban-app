import { Card, CardBody, Heading, Input, Select } from "@chakra-ui/react";
import useMediaQuery, { MediaQueryKey } from "use-media-antd-query";

import styled from "styled-components";
import AddNewBoard from "../components/AddNewBoard";
import { useQuery } from "react-query";
import BoardElement from "../components/forms/BoardElement";
import { useEffect, useState } from "react";
import { getTableList } from "../api";

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

const MainPage = () => {
  const [state, setState] = useState<
    Array<{ id: number; imageName: string; boardName: string }> | undefined
  >();
  const { data } = useQuery("tableList", getTableList);
  useEffect(() => {
    setState(
      data?.map(({ id, name, imageUrl }) => ({
        id,
        boardName: name,
        imageName: imageUrl,
      }))
    );
  }, [data]);

  console.log("tableList", data);

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
    console.log("posortowane", testBoardTable);
  };

  const [searchInput, setSearchInput] = useState("");

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
          <WrapSelect>
            <Select
              id="select"
              placeholder="Sort by"
              maxWidth={200}
              onChange={(value) => {
                console.log("value", value.target.value);
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
                  return searchInput.toLocaleLowerCase() === ""
                    ? item
                    : item.boardName.toLowerCase().includes(searchInput);
                })
                .map(({ imageName, boardName }) => (
                  <BoardElement
                    key={boardName}
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

export default MainPage;
