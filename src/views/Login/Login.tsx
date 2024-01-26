import React, { FC, useState } from "react";

// import "./index.less";
import { Button, Form, Input, message } from "antd";
import styles from "./index.module.less";
import api from "@/api";
import { Login } from "@/types/api";
import storage from "@/utils/storage";

type FieldType = {
  userName?: string;
  userPwd?: string;
  remember?: string;
};

const LoginFC: FC = () => {
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

  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values: Login.params) => {
    setIsLoading(true);
    const data = await api.login(values).finally(() => {
      setIsLoading(false);
    });

    storage.set("token", data);
    message.success("Login Success");

    {
      /*It is used to save previous link before user log out */
    }
    const params = new URLSearchParams(location.search);
    params.get("callback") || "welcome";
  };

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
            name="userName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            // label="Password"
            name="userPwd"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginFC;
