import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
import { Avatar, WrapItem } from "@chakra-ui/react";

const { Header, Content, Footer, Sider } = Layout;
const MainLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
      <Header
        style={{
          padding: "20px",
          background: colorBgContainer,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <WrapItem>
          <Avatar
            size="md"
            name="Ryan Florence"
            src={require("../photos/avatar.jpg")}
          />{" "}
        </WrapItem>
      </Header>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            minHeight: "80vh",
            padding: 24,
            background: colorBgContainer,
          }}
        >
          Bill is a cat.
          <Outlet />
        </div>
      </Content>
    </div>
  );
};

export default MainLayout;
