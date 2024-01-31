import "./App.less";
import { RouterProvider } from "react-router-dom";
// import router from "./router";

import { ConfigProvider, App as AntdApp } from "antd";
import AntdGlobal from "./utils/AntdGlobal";
import router from "./router";

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
        <AntdGlobal />
        {/* <BrowserRouter>
          <Router />
        </BrowserRouter> */}
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
