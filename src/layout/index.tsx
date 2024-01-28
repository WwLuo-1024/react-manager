import React, { useEffect } from "react";
import { Layout, Watermark } from "antd";
import NavHeader from "@/components/NavHeader";
import NavFooter from "@/components/NavFooter";
import SideMenu from "@/components/Menu";
import { Outlet } from "react-router-dom";
import styles from "./index.module.less";
import api from "@/api";
import { useUserStore } from "@/store";

const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
  // useEffect(() => {
  //   //水印无法删除的原理（监听节点）
  //   const targetNode = document.getElementById("content") as HTMLDivElement;
  //   const config = {
  //     attributes: true,
  //     childList: true,
  //     subtree: true,
  //   };
  //   const observer = new MutationObserver(function (mutationList, observer) {
  //     console.log("发生变化");
  //     observer.disconnect();
  //     for (const mutation of mutationList) {
  //       if (mutation.type === "childList") {
  //         const span = document.createElement("span");
  //         span.innerText = "Hello React";
  //         targetNode.appendChild(span);
  //         observer.observe(targetNode, config);
  //       }
  //     }
  //   });

  //   observer.observe(targetNode, config);
  // }, []);
  const { userInfo, collapsed, updateUserInfo } = useUserStore();

  const getUserInfo = async () => {
    const data = await api.getUserInfo();
    // store.updateUserInfo(data);
    updateUserInfo(data);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Watermark content={userInfo.userName}>
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
          collapsed={collapsed}
        >
          <SideMenu />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, height: 50 }}>
            <NavHeader />
          </Header>
          <Content className={styles.content}>
            <div className={styles.wrapper}>
              <Outlet />
            </div>
            <NavFooter />
          </Content>
          {/* <Footer style={{ textAlign: "center" }}>     
          </Footer> */}
        </Layout>
      </Layout>
    </Watermark>
  );
};

export default App;
