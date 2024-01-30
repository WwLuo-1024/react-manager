import { message } from "@/utils/AntdGlobal";
import storage from "@/utils/storage";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Select, Upload } from "antd";
import { RcFile, UploadProps, UploadFile } from "antd/es/upload";
import React, { FC, useImperativeHandle, useState } from "react";
import type { UploadChangeParam } from "antd/es/upload";
import { IAction, IModalProp } from "@/types/modal";
import { User } from "@/types/api";
import api from "@/api";
import FormItem from "antd/es/form/FormItem";

const CreateUser: FC<IModalProp> = (props: IModalProp) => {
  const [form] = Form.useForm();
  const [img, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [visable, setVisable] = useState(false);
  const [action, setAction] = useState<IAction>("create");

  //调用弹框显示方法
  const open = (type: IAction, data?: User.UserItem) => {
    setVisable(true);
    setAction(type);
    if (type === "edit" && data) {
      form.setFieldsValue(data);
      setImage(data.userImg);
    }
  };

  //暴露子组件open方法
  useImperativeHandle(props.mRef, () => {
    return {
      open,
    };
  });

  const handleSubmit = async () => {
    try {
      const valid = await form.validateFields();
      if (valid) {
        const params = { ...form.getFieldsValue(), userImg: img };
        console.log("edit data ===> ", params);
        if (action === "create") {
          await api.createUser(params);
          message.success("创建成功");
          handleCancel();
        } else {
          await api.editUser(params);
          message.success("修改成功");
        }
        handleCancel();
        props.update();
      }
    } catch (error) {
      console.log("-===>", error);
    }
  };
  const handleCancel = () => {
    setVisable(false);
    setImage("");
    form.resetFields();
  };

  //上传前 接口处理
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("只能上传png或jpeg格式的图片");
      return false;
    }
    const isLt500K = file.size / 1024 / 1024 < 0.5;
    if (!isLt500K) {
      message.error("图片不能超过500k");
    }
    return isJpgOrPng && isLt500K;
  };

  //上传后
  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    const { code, data, msg } = info.file.response;
    if (info.file.status === "done") {
      setLoading(false);
      if (code === 0) {
        setImage(data.file);
      } else {
        message.error(msg);
      }
    } else if (info.file.status === "error") {
      message.error("服务器异常，请稍后重试");
    }
  };

  return (
    <Modal
      title="创建用户"
      width={800}
      open={visable}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText={"确定"}
      cancelText={"取消"}
    >
      {/* labelCol占位四列 labelAlign居右*/}
      <Form form={form} labelCol={{ span: 4 }} labelAlign="right">
        {/* 隐藏域存储用户id, 因为父组件param会传参过来保存到Form中以便获取 */}
        <FormItem name="userId" hidden>
          <Input />
        </FormItem>
        <Form.Item
          label="用户名称"
          name="userName"
          rules={[
            { required: true, message: "请输入用户名称" },
            { min: 5, max: 12, message: "用户名称最小5个字符，最大12个字符" },
          ]}
        >
          <Input placeholder="请输入用户名称"></Input>
        </Form.Item>

        <Form.Item
          label="用户邮箱"
          name="userEmail"
          rules={[
            { required: true, message: "请输入用户邮箱" },
            { type: "email", message: "请输入正确的邮箱" },
            { pattern: /^\w+@mars.com$/, message: "邮箱必须以@mar.com结尾" },
          ]}
        >
          <Input
            placeholder="请输入用户邮箱"
            disabled={action === "edit"}
          ></Input>
        </Form.Item>

        <Form.Item
          label="手机号"
          name="mobile"
          rules={[
            { len: 11, message: "手机号必须为11位数字" },
            { pattern: /1[1-9]\d{9}/, message: "请输入1开头的手机号" },
          ]}
        >
          <Input type="number" placeholder="请输入手机号"></Input>
        </Form.Item>

        <Form.Item
          label="部门"
          name="deptId"
          //   rules={[{ required: true, message: "请输入部门" }]}
        >
          <Input placeholder="请输入部门"></Input>
        </Form.Item>

        <Form.Item label="岗位" name="job">
          <Input placeholder="请输入岗位"></Input>
        </Form.Item>

        <Form.Item label="状态" name="state">
          <Select>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="角色" name="role">
          <Input placeholder="请输入角色"></Input>
        </Form.Item>

        <Form.Item label="头像">
          <Upload
            listType="picture-circle"
            showUploadList={false}
            headers={{
              Authorization: "Bearer " + storage.get("token"),
              icode: "1B5DBB45B7F14CDB",
            }}
            action="/api/users/upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {img ? (
              <img src={img} style={{ width: "100%", borderRadius: "100%" }} />
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 5 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUser;
