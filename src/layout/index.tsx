import React, { useEffect } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Watermark, theme } from "antd";
import NavHeader from "@/components/NavHeader";
import NavFooter from "@/components/NavFooter";
import SideMenu from "@/components/Menu";

const { Header, Content, Footer, Sider } = Layout;
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    //水印无法删除的原理（监听节点）
    const targetNode = document.getElementById("content") as HTMLDivElement;
    const config = {
      attributes: true,
      childList: true,
      subtree: true,
    };
    const observer = new MutationObserver(function (mutationList, observer) {
      console.log("发生变化");
      observer.disconnect();
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          const span = document.createElement("span");
          span.innerText = "Hello React";
          targetNode.appendChild(span);
          observer.observe(targetNode, config);
        }
      }
    });

    observer.observe(targetNode, config);
  }, []);

  return (
    <Watermark content={"React"}>
      <Layout>
        <Sider
        //   breakpoint="lg"
        //   collapsedWidth="0"
        //   onBreakpoint={(broken) => {
        //     console.log(broken);
        //   }}
        //   onCollapse={(collapsed, type) => {
        //     console.log(collapsed, type);
        //   }}
        >
          <SideMenu />
        </Sider>
        <Layout>
          <Header
            style={{ padding: 0, height: 50, background: colorBgContainer }}
          >
            <NavHeader />
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              id="content"
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <span>content</span>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            <NavFooter />
          </Footer>
        </Layout>
      </Layout>
    </Watermark>
  );
};

export default App;
