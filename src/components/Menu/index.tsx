import {
  DesktopOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import React, { FC, useEffect, useState } from "react";
import styles from "./index.module.less";
import { useLocation, useNavigate, useRouteLoaderData } from "react-router-dom";
import { useUserStore } from "@/store";
import { Menu as IMenu } from "@/types/api";
import * as Icons from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

const SideMenu: FC = () => {
  const navigate = useNavigate();
  const collapsed = useUserStore((state) => state.collapsed);
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const data: any = useRouteLoaderData("layout");
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const { pathname } = useLocation();
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      label,
      key,
      icon,
      children,
    } as MenuItem;
  }

  function createIcon(name?: string) {
    if (!name) return <></>;
    const customIcons: { [key: string]: any } = Icons;
    const icon = customIcons[name];
    //如果名字有误 无法获取icon则也返回fragment
    if (!icon) return <></>;

    return React.createElement(icon);
  }

  //递归生成菜单
  const getTreeMenu = (
    menuList: IMenu.MenuItem[],
    treeList: MenuItem[] = []
  ) => {
    console.log("menuList:", menuList);
    menuList.forEach((item, index) => {
      if (item.menuType === 1) {
        if (item.buttons) {
          return treeList.push(
            getItem(item.menuName, item.path || index, createIcon(item.icon))
          );
        }

        treeList.push(
          getItem(
            item.menuName,
            item.path || index,
            createIcon(item.icon),
            getTreeMenu(item.children || [])
          )
        );
      }
    });
    return treeList;
  };

  //初始化 获取接口菜单列表数据
  useEffect(() => {
    const treeMenuList = getTreeMenu(data.menuList);
    setMenuList(treeMenuList);
    setSelectedKeys([pathname]);
  }, []);

  // const items = [
  //   {
  //     label: "工作台",
  //     key: "1",
  //     icon: <DesktopOutlined />,
  //   },
  //   {
  //     label: "系统管理",
  //     key: "2",
  //     icon: <SettingOutlined />,
  //     children: [
  //       {
  //         label: "用户管理",
  //         key: "3",
  //         icon: <TeamOutlined />,
  //       },
  //       {
  //         label: "部门管理",
  //         key: "4",
  //         icon: <TeamOutlined />,
  //       },
  //     ],
  //   },
  // ];

  function handleClickLogo() {
    navigate("/welcome");
  }

  const handleClickMenu = ({ key }: { key: string }) => {
    setSelectedKeys([key]);
    navigate(key);
  };
  return (
    <div>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img className={styles.img} src="/imgs/logo.png" />
        {collapsed ? "" : <span>慕慕货运</span>}
      </div>
      <Menu
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        items={menuList}
        selectedKeys={selectedKeys}
        style={{ width: collapsed ? 80 : "auto" }}
        onClick={handleClickMenu}
      />
    </div>
  );
};

export default SideMenu;
