import api from "@/api";
import { PageParams, User } from "@/types/api";
import { formatDate } from "@/utils";
import { Button, Form, Input, Select, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { FC, useEffect, useRef, useState } from "react";
import CreateUser from "./CreateUser";
import { IAction } from "@/types/modal";

const UserList: FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<User.UserItem[]>([]);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const userRef = useRef<{
    open: (type: IAction, data?: User.UserItem) => void | undefined;
  }>();

  //获取用户列表
  const getUserList = async (params: PageParams) => {
    const values = form.getFieldsValue();
    console.log("values: ", values);
    const data = await api.getUserList({
      ...values,
      pageNum: params.pageNum,
      pageSize: params.pageSize,
    });
    const list = Array.from({ length: 50 })
      .fill({})
      .map((item: any) => {
        item = { ...data.list[0] };
        item.userId = Math.random();
        return item;
      });
    setData(list);
    setTotal(list.length);
    setPagination({
      current: data.page.pageNum,
      pageSize: data.page.pageSize,
    });
  };

  useEffect(() => {
    getUserList({
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
    });
  }, [pagination.current, pagination.pageSize]);

  const handleSearch = () => {
    getUserList({
      pageNum: 1,
      pageSize: pagination.pageSize,
    });
  };

  //重置表单
  const handleReset = () => {
    form.resetFields();
  };

  //创建用户
  const handleCreate = () => {
    userRef.current?.open("create");
  };

  const columns: ColumnsType<User.UserItem> = [
    {
      title: "用户ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "用户名称",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "用户邮箱",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "用户角色",
      dataIndex: "role",
      key: "role",
      //role代表当前列的值
      //   render(role) {
      //     const roleMap = {
      //       0: '超级管理员',

      //       1: '管理员',

      //       2: '体验管理员',

      //       3: '普通用户'

      //     };
      //     return roleMap[role];
      //   }

      render(role: number) {
        return {
          0: "超级管理员",
          1: "管理员",
          2: "体验管理员",
          3: "普通用户",
        }[role];
      },
    },
    {
      title: "用户状态",
      dataIndex: "state",
      key: "state",
      render(state: number) {
        return {
          1: "在职",
          2: "离职",
          3: "试用期",
        }[state];
      },
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
      key: "createTime",
      render(createTime: string) {
        return formatDate(createTime);
      },
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render() {
        return (
          <Space>
            <Button type="text">编辑</Button>
            <Button type="text" danger>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <div className="user-list">
      <Form form={form} className="search-form" layout="inline">
        <Form.Item name="userId" label="用户ID">
          <Input placeholder="请输入用户ID" />
        </Form.Item>
        <Form.Item name="userName" label="用户名称">
          <Input placeholder="请输入用户名称" />
        </Form.Item>
        <Form.Item name="state" label="状态">
          <Select style={{ width: 120 }} defaultValue={0}>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" onClick={handleSearch}>
              搜素
            </Button>
            <Button type="default" onClick={handleReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className="base-table">
        <div className="header-wrapper">
          <div className="title">用户列表</div>
          <div className="action">
            <Button type="primary" onClick={handleCreate}>
              新增
            </Button>
            <Button type="primary" danger>
              批量删除
            </Button>
          </div>
        </div>
        <Table
          rowKey={"userId"}
          bordered
          rowSelection={{ type: "checkbox" }}
          dataSource={data}
          columns={columns}
          pagination={{
            position: ["bottomRight"],
            current: pagination.current,
            pageSize: pagination.pageSize,
            total,
            showQuickJumper: true,
            showSizeChanger: true,
            onChange: (page, pageSize) => {
              setPagination({
                current: page,
                pageSize,
              });
            },
          }}
        />
      </div>

      <CreateUser
        mRef={userRef}
        update={() => {
          getUserList({
            pageNum: 1,
            pageSize: pagination.pageSize,
          });
        }}
      />
    </div>
  );
};

export default UserList;
