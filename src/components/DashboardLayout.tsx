import Layout, { Footer } from "antd/es/layout/layout";
import Menu from "../components/Menu";
import MainLayout from "./MainLayout";
import { ConfigProvider } from "antd";
import useMediaQuery, { MediaQueryKey } from "use-media-antd-query";
import { useState } from "react";

const DashboardLayout = () => {
  const mediaQuery = useMediaQuery();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#53735E",
        },
      }}
    >
      {/* flexDirection: mediaQuery ==="sm"||"xs" ? "column" : "row", */}
      <Layout style={{ minHeight: "100vh" }}>
        <Menu />
        <Layout className="site-layout">
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
