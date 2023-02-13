import Menu from "../components/Menu";
import MainLayout from "./MainLayout";
import { ConfigProvider } from "antd";
import useMediaQuery, { MediaQueryKey } from "use-media-antd-query";
import { Layout, theme } from "antd";
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Image,
  Skeleton,
  SkeletonText,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import BurgerMenu from "./BurgerMenu";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const DashboardLayout = () => {
  const navigate = useNavigate();
  const mediaQuery = useMediaQuery();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#53735E",
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        {mediaQuery !== "xs" && <Menu />}
        <Layout className="site-layout">
          <Header
            style={{
              padding: "20px",
              background: mediaQuery === "xs" ? colorBgContainer : "#53735E",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <WrapItem
              justifyContent={["space-between"]}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              {mediaQuery === "xs" ? (
                <div
                  style={{
                    background: colorBgContainer,
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    flex: 2,
                    justifyContent: "space-between",
                  }}
                >
                  <BurgerMenu />{" "}
                  <Image
                    maxW="100px"
                    objectFit="cover"
                    src={require("../photos/logo-removebg-preview.jpg")}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/dashboard")}
                  />
                  <div></div>
                </div>
              ) : (
                <div></div>
              )}

              {mediaQuery !== "xs" ? (
                <Flex>
                  <Box
                    ml="3"
                    paddingRight={"18px"}
                    borderRight={"2px"}
                    borderRightColor={"#F2F2F2"}
                    height={"40px"}
                    display={"flex"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    justifyContent={"flex-end"}
                  >
                    <Text fontWeight="bold" height={"20px"} color={"#f5f5f5"}>
                      Segun Adebayo
                    </Text>
                    <Text fontSize="sm" height={"40px"} color={"#f5f5f5"}>
                      Dashboard
                    </Text>
                  </Box>
                  <Avatar
                    src={require("../photos/avatar.jpg")}
                    ml={"20px"}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/settings")}
                  />
                </Flex>
              ) : (
                <Avatar
                  size="md"
                  name="Ryan Florence"
                  src={require("../photos/avatar.jpg")}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/settings")}
                />
              )}
            </WrapItem>
          </Header>
          <MainLayout />
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default DashboardLayout;
