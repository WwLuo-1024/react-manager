import api from "@/api";
import { Menu } from "@/types/api";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  message,
} from "antd";
import React, { FC, useEffect, useRef, useState } from "react";
import { IAction } from "@/types/modal";
import { ColumnsType } from "antd/es/table";
import { formatDate } from "@/utils";
import CreateMenu from "./CreateMenu";

const MenuList: FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<Menu.MenuItem[]>([]);
  const menuRef = useRef<{
    open: (
      type: IAction,
      data?: Menu.EditParams | { parentId?: string; orderBy?: number }
    ) => void;
  }>();

  const getMenuList = async () => {
    const data = await api.getMenuList(form.getFieldsValue());
    setData(data);
  };

  useEffect(() => {
    console.log("刷新了");
    getMenuList();
  }, []);

  //重置
  const handleRest = () => {
    form.resetFields();
  };

  //创建部门
  const handleCreate = () => {
    menuRef.current?.open("create", {
      orderBy: data.length,
    });
  };

  const handleSubCreate = (id: string) => {
    menuRef.current?.open("create", { parentId: id });
  };

  //编辑部门
  const handleEdit = (record: Menu.MenuItem) => {
    menuRef.current?.open("edit", record);
  };

  //删除部门
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "确认",
      content: "确认删除该菜单吗？",
      onOk() {
        handleDelSubmit(id);
      },
    });
  };

  //删除提交
  const handleDelSubmit = async (_id: string) => {
    await api.deleteMenu({
      _id,
    });
    message.success("删除成功");
    getMenuList();
  };

  const columns: ColumnsType<Menu.MenuItem> = [
    {
      title: "菜单名称",
      dataIndex: "menuName",
      key: "menuName",
    },
    {
      title: "菜单图标",
      dataIndex: "icon",
      key: "icon",
      width: 150,
    },
    {
      title: "菜单类型",
      dataIndex: "menuType",
      key: "menuType",
      render(menuType: number) {
        return {
          1: "菜单",
          2: "按钮",
          3: "页面",
        }[menuType];
      },
    },
    {
      title: "权限标识",
      dataIndex: "menuCode",
      key: "menuCode",
    },
    {
      title: "路由地址",
      dataIndex: "path",
      key: "path",
    },
    {
      title: "组件名称",
      dataIndex: "component",
      key: "component",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      render(createTime) {
        return formatDate(createTime);
      },
    },
    {
      title: "操作",
      key: "action",
      width: 200,
      render(_, record) {
        return (
          <Space>
            <Button type="text" onClick={() => handleSubCreate(record._id)}>
              新增
            </Button>
            <Button type="text" onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type="text" danger onClick={() => handleDelete(record._id)}>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Form
        className="search-form"
        layout="inline"
        form={form}
        initialValues={{ menuState: 1 }}
      >
        <Form.Item label="菜单名称" name="menuName">
          <Input placeholder="菜单名称" />
        </Form.Item>

        <Form.Item label="菜单状态" name="menuState">
          <Select style={{ width: 100 }}>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>停用</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" onClick={getMenuList}>
              搜索
            </Button>
            <Button type="default" onClick={handleRest}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <div className="base-table">
        <div className="header-wrapper">
          <div className="title">菜单列表</div>
          <div className="action">
            <Button type="primary" onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>

        <Table
          bordered
          rowKey="_id"
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>
      <CreateMenu mRef={menuRef} update={getMenuList} />
    </div>
  );
};

export default MenuList;
