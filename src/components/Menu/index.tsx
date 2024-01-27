import {
  DesktopOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { FC } from "react";
import styles from "./index.module.less";
import { useNavigate } from "react-router-dom";

const SideMenu: FC = () => {
  const items = [
    {
      label: "工作台",
      key: "1",
      icon: <DesktopOutlined />,
    },
    {
      label: "系统管理",
      key: "2",
      icon: <SettingOutlined />,
      children: [
        {
          label: "用户管理",
          key: "3",
          icon: <TeamOutlined />,
        },
      ],
    },
  ];
  const navigate = useNavigate();
  function handleClickLogo() {
    navigate("/welcome");
  }

  return (
    <div>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img className={styles.img} src="/imgs/logo.png" />
        <span>慕慕货运</span>
      </div>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        items={items}
      />
    </div>
  );
};

export default SideMenu;
