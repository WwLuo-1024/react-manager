import "./App.less";
import { BrowserRouter } from "react-router-dom";
// import router from "./router";
import Router from "./router";
import { ConfigProvider, App as AntdApp } from "antd";

function App() {
  // return <RouterProvider router={router} />;
  return (
    /* 自定义全局主题主题 */
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ed6c00",
        },
      }}
    >
      <AntdApp>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
