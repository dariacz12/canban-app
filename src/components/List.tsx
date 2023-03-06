import { EllipsisOutlined } from "@ant-design/icons";
import {
  AddIcon,
  ArrowForwardIcon,
  CopyIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AddCardField from "./AddCardField";
import CardItem from "./CardItem";
import CartItemEdit from "./CartItemEdit";

const Main = styled.div`
  display: flex;
`;
const Footer = styled.div``;
type Inputs = {
  title: string;
};
const List = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const [activeAddCard, setActiveAddCard] = useState<boolean>(false);
  const activeCard = () => {
    setActiveAddCard(!activeAddCard);
  };
  return (
    <>
      <Card
        maxW="231px"
        h={"fit-content"}
        style={{ marginLeft: "20px", background: "#e5e5e5" }}
        shadow="2px"
      >
        <CardBody
          style={{
            alignItems: "center",
            justifyContent: "left",
            paddingTop: 10,
            paddingBottom: 10,
            paddingRight: 15,
            paddingLeft: 15,
            cursor: "pointer",
          }}
        >
          <Main>
            <Input
              _placeholder={{
                fontWeight: "bold",
                fontSize: "sm",
                color: "#4c4c4c",
              }}
              focusBorderColor="#53735E"
              placeholder="List Title"
              style={{ border: "none" }}
              {...register("title", { required: true, maxLength: 18 })}
            />
            {errors.title?.type === "required" && (
              <span style={{ color: "red" }}>This field is required!</span>
            )}
            {errors.title?.type === "maxLength" && (
              <p style={{ color: "red" }} role="alert">
                Max Length is 18 symbols
              </p>
            )}
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={
                  <EllipsisOutlined
                    style={{ color: "#7f7f7f", position: "relative" }}
                  />
                }
                variant="outline"
              />
              <MenuList>
                <MenuItem icon={<ArrowForwardIcon />}>
                  Move list to another board
                </MenuItem>
                <MenuItem icon={<CopyIcon />}>Copy list</MenuItem>
                <MenuItem icon={<DeleteIcon />}>Delete list</MenuItem>
              </MenuList>
            </Menu>
          </Main>
          <div onClick={onOpen}>
            <CardItem />
          </div>
          <CartItemEdit isOpen={isOpen} onClose={onClose} />
          <Footer style={{ display: "flex" }}>
            {!activeAddCard && (
              <Button
                size={"sm"}
                color="#F2F2F2"
                _hover={{ color: "black", bg: "#F2F2F2" }}
                ml={3}
                type="submit"
                background="rgba(204, 204, 204, 0.5"
                onClick={activeCard}
              >
                <AddIcon
                  w={2.5}
                  marginRight={"10px"}
                  style={{ color: "#7f7f7f", position: "relative" }}
                />
                <Text
                  as="b"
                  fontSize="xs"
                  style={{ color: "#7f7f7f", position: "relative" }}
                >
                  Add a card
                </Text>
              </Button>
            )}
          </Footer>
          {activeAddCard && <AddCardField onClick={activeCard} />}
        </CardBody>
      </Card>
    </>
  );
};

export default List;
