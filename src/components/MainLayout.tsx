import { Breadcrumb, Layout, Menu, theme } from "antd";
import { url } from "inspector";
import { Outlet, useLocation, useParams } from "react-router-dom";
import usePageList from "../customHooks/usePageList";
import TableMenu from "./TableMenu";

const { Header, Content, Footer, Sider } = Layout;
const MainLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [state] = usePageList();
  const location = useLocation();
  let { tableId } = useParams();

  console.log(333, state);

  const theImageName = state?.find(
    ({ id }) => String(id) === tableId
  )?.imageName;

  console.log("newimage", theImageName);
  return (
    <div>
      <Content
        style={{
          backgroundImage: theImageName
            ? `url(${require(`../photos/${theImageName}.jpg`)})`
            : undefined,
          backgroundSize: "cover",
          height: theImageName ? "100vh" : undefined,
        }}
      >
        {location.pathname !== `/tablepage/${tableId}` ? (
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
        ) : (
          <TableMenu />
        )}
        <div
          style={
            location.pathname !== `/tablepage/${tableId}`
              ? {
                  minHeight: "84.5vh",
                  padding: 24,
                  background: colorBgContainer,
                }
              : { minHeight: "84.5vh" }
          }
        >
          <Outlet />
        </div>
      </Content>
    </div>
  );
};

export default MainLayout;
