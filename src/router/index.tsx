import { Navigate, useRoutes } from "react-router-dom";
import Login from "@/views/Login/Login";
import NotFound from "@/views/ErrorPages/404";
import Error403 from "@/views/ErrorPages/403";
import Welcome from "@/views/Welcome";
import Layout from "@/layout";
import DashBoard from "@/views/Dashboard";
import UserList from "@/views/System/user";
import DeptList from "@/views/System/dept";
import MenuList from "@/views/System/menu";

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
    element: <Layout />,
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

// export default createBrowserRouter(routers);
export default function Router() {
  return useRoutes(routers);
}
