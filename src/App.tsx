import "./App.css";
import { BrowserRouter } from "react-router-dom";
// import router from "./router";
import Router from "./router";

function App() {
  // return <RouterProvider router={router} />;
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
