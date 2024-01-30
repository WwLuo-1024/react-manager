import api from "@/api";
import { Dept } from "@/types/api";
import { Button, Form, Input, Space, Table } from "antd";
import React, { FC, useEffect, useState } from "react";

const DeptList: FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<Dept.DeptItem[]>([]);

  const getDeptList = async () => {
    const data = await api.getDeptList(form.getFieldsValue());
    setData(data);
  };

  useEffect(() => {
    getDeptList();
  }, []);

  const handleRest = () => {
    form.resetFields();
  };

  const columns = [
    {
      title: "部门名称",
      dataIndex: "deptName",
      key: "deptName",
      width: 200,
    },
    {
      title: "负责人",
      dataIndex: "userName",
      key: "userName",
      width: 150,
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
    },
    {
      title: "创建时间",
      dataIndex: "crateTime",
      key: "crateTime",
    },
    {
      title: "操作",
      key: "action",
      width: 200,
      render() {
        return (
          <Space>
            <Button type="text">新增</Button>
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
    <div>
      <Form className="search-form" layout="inline" form={form}>
        <Form.Item label="部门名称" name="deptName">
          <Input placeholder="部门名称" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" onClick={getDeptList}>
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
          <div className="title">部门列表</div>
          <div className="action">
            <Button>新增</Button>
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
    </div>
  );
};

export default DeptList;
