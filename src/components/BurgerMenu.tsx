import React, { MouseEvent, useContext } from "react";
import {
  AppstoreAddOutlined,
  LogoutOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { Box, Button, Fade, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";

const Menu = styled.div``;
const MenuList = styled.div``;
const MenuItem = styled.div`
  transition: "all 0.2s";
  padding-left: 20px;
  &:hover {
    background-color: whitesmoke;
    color: black;
    border-radius: 5px;
  }
`;

const MenuItems = [
  { name: "User", icon: <UserOutlined />, id: 1 },
  { name: "New Board", icon: <AppstoreAddOutlined />, id: 2 },
  { name: "Board List", icon: <UnorderedListOutlined />, id: 3 },
  { name: "Settings", icon: <SettingOutlined />, id: 4 },
  { name: "LogOut", icon: <LogoutOutlined />, id: 5 },
];

const BurgerMenu = () => {
  const navigate = useNavigate();
  const { setData } = useContext(LoginContext);
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Menu>
      <Button onClick={onToggle}>
        <HamburgerIcon />
      </Button>
      <div />
      <Fade
        in={isOpen}
        style={{
          position: "absolute",
          zIndex: isOpen ? 9999 : -793701299,
          right: "10px",
          width: "100%",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          p="20px"
          pl="30px"
          color="white"
          bg="#53735E"
          rounded="md"
          shadow="md"
          height="100%s"
        >
          <MenuList style={{ top: 0, bottom: 0 }}>
            {MenuItems.map(({ name, icon, id }) => (
              <MenuItem
                key={name}
                style={{ display: "flex", fontSize: "16px", cursor: "pointer" }}
                onClick={() => {
                  if (id === 5) {
                    setData({
                      token: "",
                      refreshToken: "",
                    });
                    navigate("/login");
                  } else if (id === 1 || 4) {
                    navigate("/settings");
                  }
                }}
              >
                <span>{icon}</span>
                <span style={{ paddingLeft: "10px" }}>{name}</span>
              </MenuItem>
            ))}
          </MenuList>
        </Box>
      </Fade>
    </Menu>
  );
};

export default BurgerMenu;
