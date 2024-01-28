import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Breadcrumb, Dropdown, MenuProps, Switch } from "antd";
import React, { FC } from "react";
import styles from "./index.module.less";
import { useUserStore } from "@/store";
import storage from "@/utils/storage";

const NavHeader: FC = () => {
  const { userInfo, collapsed, updateCollapsed } = useUserStore();
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
      key: "email",
      label: `Email: ${userInfo.userEmail}`,
    },
    {
      key: "logout",
      label: "Logout",
    },
  ];

  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      storage.remove("token");
    }
    location.href = "/login?callback=" + encodeURIComponent(location.href);
  };

  //To control icon of menu switch
  const toggleCollapsed = () => {
    updateCollapsed();
  };

  return (
    <div className={styles.naviHeader}>
      <div className={styles.left}>
        <div onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>

        <Breadcrumb items={breadList} style={{ marginLeft: 10 }} />
      </div>
      <div className="right">
        <Switch
          checkedChildren="Dark"
          unCheckedChildren="Default"
          style={{ marginRight: 10 }}
        />
        <Dropdown menu={{ items, onClick }}>
          <span className={styles.nickName}>{userInfo.userName}</span>
        </Dropdown>
      </div>
    </div>
  );
};

export default NavHeader;
