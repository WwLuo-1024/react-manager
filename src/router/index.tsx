import { Navigate, useRoutes } from "react-router-dom";
import Login from "@/views/Login/Login";
import NotFound from "@/views/404";
import Error403 from "@/views/403";
import Welcome from "@/views/Welcome";

const routers = [
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/login",
    element: <Login />,
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
