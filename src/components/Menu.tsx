import React, { useContext, useEffect, useState } from "react";
import {
  AppstoreAddOutlined,
  LogoutOutlined,
  MinusOutlined,
  SettingOutlined,
  SwapRightOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getTableList } from "../api";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Box, Image, useDisclosure, useQuery } from "@chakra-ui/react";
import { LoginContext } from "../contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import AlertDialogNewBoard from "./AlertDialogNewBoard";
import usePageList from "../customHooks/usePageList";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const MenuElement: React.FC = () => {
  const [state] = usePageList();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();
  const { setData } = useContext(LoginContext);
  const items: MenuItem[] = [
    getItem("User", "1item", <UserOutlined />),
    getItem("New Board", "2item", <AppstoreAddOutlined />),
    getItem(
      "Board List",
      "3item",
      <UnorderedListOutlined />,
      state?.map(({ id, boardName }) =>
        getItem(`${boardName}`, `${id}`, <SwapRightOutlined />)
      )
    ),
    getItem("Settings", "4item", <SettingOutlined />),
    getItem("LogOut", "5item", <LogoutOutlined />),
  ];
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("e", e);
    if (e.key === "5item") {
      setData({
        token: "",
        refreshToken: "",
      });
      navigate("/login");
    } else if (e.key === "1item") {
      navigate("/settings");
    } else if (e.key === "2item") {
      onOpen();
    } else if (e.key === "4item") {
      navigate("/settings");
    } else navigate(`/tablepage/:${e.key}`);
  };
  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        >
          {!collapsed ? (
            <Image
              maxW="100px"
              objectFit="cover"
              src={require("../photos/logo-removebg-preview.jpg")}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/dashboard")}
            />
          ) : (
            <Image
              maxW="30px"
              objectFit="cover"
              src={require("../photos/smalllogo.jpg")}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/dashboard")}
            />
          )}
        </div>
        <Menu
          onClick={onClick}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <AlertDialogNewBoard
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
      />
    </>
  );
};

export default MenuElement;
