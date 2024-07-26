import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, notification } from "antd";
import { AppDispatch } from "../../redux/store";
import { fetchForgotPassword } from "../../api/fetchForgotPassword";
import { useDispatch } from "react-redux";
import { setEmail } from "../../redux/forgotPasswordSlice";
import { useNavigate } from "react-router-dom";

type FieldType = {
  email?: string;
};

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const requestAPI = dispatch(fetchForgotPassword(values));
      const action = await requestAPI;

      if (fetchForgotPassword.fulfilled.match(action)) {
        const response = action.payload;
        console.log("oke");

        if (response.success) {
          dispatch(setEmail(values.email));
          navigate("/otp-password");
        } else {
          console.error("Failed:", response.message);
        }
      } else if (fetchForgotPassword.rejected.match(action)) {
        notification.error({
          message: "Error",
          description: "Gửi mã thất bại",
        });
        console.error("Error:", action);
      }
    } catch (error) {
      console.error("Caught error:", error);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <p>Quên mật khẩu</p>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Gửi mã xác nhạn
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgotPassword;
