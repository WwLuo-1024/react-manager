import { MenuFoldOutlined } from "@ant-design/icons";
import { Breadcrumb, Dropdown, MenuProps, Switch } from "antd";
import React, { FC } from "react";
import styles from "./index.module.less";

const NavHeader: FC = () => {
  const breadList = [
    {
      title: "Main",
    },
    {
      title: "Workplace",
    },
  ];

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Email: Jackma@mars.com",
    },
    {
      key: "2",
      label: "Logout",
    },
  ];

  return (
    <div className={styles.naviHeader}>
      <div className={styles.left}>
        <MenuFoldOutlined />
        <Breadcrumb items={breadList} style={{ marginLeft: 10 }} />
      </div>
      <div className="right">
        <Switch
          checkedChildren="Dark"
          unCheckedChildren="Default"
          style={{ marginRight: 10 }}
        />
        <Dropdown menu={{ items }}>
          <span className={styles.nickName}>JackMa</span>
        </Dropdown>
      </div>
    </div>
  );
};

export default NavHeader;
