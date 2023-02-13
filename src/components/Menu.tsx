import React, { useContext, useState } from "react";
import {
  AppstoreAddOutlined,
  LogoutOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";

import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Box, Image } from "@chakra-ui/react";
import { LoginContext } from "../contexts/LoginContext";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { setData } = useContext(LoginContext);
  const items: MenuItem[] = [
    getItem("User", "1", <UserOutlined />),
    getItem("New Board", "2", <AppstoreAddOutlined />),
    getItem("Board List", "3", <UnorderedListOutlined />, [
      getItem("Board 1", "6"),
      getItem("Board 2", "8"),
    ]),
    getItem("Settings", "7", <SettingOutlined />),
    getItem("LogOut", "9", <LogoutOutlined />),
  ];
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("e", e);
    if (e.key === "9") {
      setData({
        token: "",
        refreshToken: "",
      });
      navigate("/login");
    } else if (e.key === "1" || "7") {
      navigate("/settings");
    } else if (e.key === "2") {
    }
  };
  return (
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
  );
};

export default MenuElement;
