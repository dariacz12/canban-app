import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet, useLocation, useParams } from "react-router-dom";
import TableMenu from "./TableMenu";

const { Header, Content, Footer, Sider } = Layout;
const MainLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const location = useLocation();
  console.log("location", location);
  let { tableId } = useParams();
  console.log("tableId", tableId);
  return (
    <div>
      <Content style={{ margin: "0 16px" }}>
        {location.pathname !== `/tablepage/${tableId}` ? (
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
        ) : (
          <TableMenu />
        )}
        <div
          style={{
            minHeight: "84.5vh",
            padding: 24,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </div>
      </Content>
    </div>
  );
};

export default MainLayout;
