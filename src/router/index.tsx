import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "@/views/Login/Login";
import NotFound from "@/views/ErrorPages/404";
import Error403 from "@/views/ErrorPages/403";
import Welcome from "@/views/Welcome";
import Layout from "@/layout";
import DashBoard from "@/views/Dashboard";
import UserList from "@/views/System/user";
import DeptList from "@/views/System/dept";
import MenuList from "@/views/System/menu";
import AuthLoader from "./AuthLoader";
import RoleList from "@/views/System/role";

const routers = [
  {
    path: "/",
    element: <Navigate to="/welcome" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    // path: '/Layout',
    id: "layout",
    element: <Layout />,
    loader: AuthLoader, //拦截器 获取权限列表
    children: [
      {
        path: "/welcome",
        element: <Welcome />,
      },
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/userlist",
        element: <UserList />,
      },
      {
        path: "/deptList",
        element: <DeptList />,
      },
      {
        path: "/menuList",
        element: <MenuList />,
      },
      {
        path: "/roleList",
        element: <RoleList />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "/403",
    element: <Error403 />,
  },
];

export default createBrowserRouter(routers);
// export default function Router() {
//   return useRoutes(routers);
// }
