import React, { FC, useEffect } from "react";
import axios from "axios";
import request from "@/utils/request";

const Login: FC = () => {
  useEffect(() => {
    // axios
    //   .get("/users", { params: { id: 12345 } })
    //   .then((res) => {
    //     console.log("res: ", res);
    //   })
    //   .catch((err) => {
    //     console.log("err: ", err);
    //   });
    request
      .post("/users", { id: 12345 })
      .then((res) => console.log("res:", res))
      .catch((err) => console.log("err:", err));
  }, []);
  return <div>Login</div>;
};

export default Login;
