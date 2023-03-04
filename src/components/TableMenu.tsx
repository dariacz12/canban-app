import { ClearOutlined } from "@ant-design/icons";
import { HamburgerIcon, StarIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Heading,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import usePageList from "../customHooks/usePageList";
import ChangeBackgroundImage from "./ChangeBackgroundImage";

const LeftMenu = styled.div``;
const RightMenu = styled.div``;
const TableMenu = () => {
  const [activeStar, setActiveStar] = useState<Boolean>(false);

  const [state] = usePageList();
  let { tableId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "70px",
          justifyContent: "space-between",
        }}
      >
        <LeftMenu
          style={{ display: "flex", alignItems: "center", height: "70px" }}
        >
          <Card
            shadow="2px"
            margin="0px 0px 0px 20px"
            style={{ background: "rgba(204, 204, 204, 0)" }}
          >
            <CardBody
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
              }}
            >
              <Input
                focusBorderColor="#53735E"
                border={"none"}
                _placeholder={{
                  color: "whitesmoke",
                  position: "relative",
                  fontWeight: "bold",
                }}
                placeholder={
                  state?.find(({ id }) => ":" + String(id) === tableId)
                    ?.boardName
                }
              ></Input>
              {/* </Heading> */}
            </CardBody>
          </Card>
        </LeftMenu>
        <RightMenu
          style={{ display: "flex", alignItems: "center", height: "70px" }}
        >
          <Card
            style={{
              marginLeft: "20px",
              background: "rgba(204, 204, 204, 0.5)",
            }}
            shadow="2px"
          >
            <CardBody
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 15,
              }}
            >
              <StarIcon
                style={{
                  cursor: "pointer",
                  color: activeStar ? "#53735E" : "whitesmoke",
                  position: "relative",
                }}
                onClick={() => setActiveStar(!activeStar)}
              />
            </CardBody>
          </Card>
          <Card
            style={{
              background: "rgba(204, 204, 204, 0.5)",
              margin: "0px 20px",
            }}
            shadow="2px"
          >
            <CardBody
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 15,
                cursor: "pointer",
              }}
              onClick={() => onOpen()}
            >
              <ClearOutlined
                style={{ color: "whitesmoke", position: "relative" }}
              />
            </CardBody>
          </Card>
        </RightMenu>
      </div>
      <ChangeBackgroundImage
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
      />
    </>
  );
};

export default TableMenu;
