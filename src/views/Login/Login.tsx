import React, { FC, useEffect } from "react";
import axios from "axios";
import request from "@/utils/request";
// import "./index.less";
import { Button, Form, Input } from "antd";
import styles from "./index.module.less";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login: FC = () => {
  // useEffect(() => {
  //   // axios
  //   //   .get("/users", { params: { id: 12345 } })
  //   //   .then((res) => {
  //   //     console.log("res: ", res);
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log("err: ", err);
  //   //   });
  //   request
  //     .post<string>("/users", { id: 12345 })
  //     .then((res) => console.log("res:", res))
  //     .catch((err) => console.log("err:", err));
  // }, []);

  const onFinish = () => {};
  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>System Login</div>

        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            // label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            // label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
