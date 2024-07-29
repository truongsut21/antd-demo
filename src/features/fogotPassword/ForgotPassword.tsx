import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, notification } from "antd";
import { AppDispatch } from "../../redux/store";
import { fetchForgotPassword } from "../../api/fetchForgotPassword";
import { useDispatch } from "react-redux";
import { setEmail } from "../../redux/forgotPasswordSlice";
import { useNavigate } from "react-router-dom";

type FieldType = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const requestAPI = dispatch(fetchForgotPassword(values));
      requestAPI.then((response: any) => {
        if (response.payload.success) {
          dispatch(setEmail(values.email));
          navigate("/otp-password");
          notification.success({
            message: "Success",
            description: response.payload.message,
          });
        } else {
          notification.error({
            message: "Error",
            description: response.payload.message,
          });
        }
      });
    } catch (error) {
      console.log("error: ", error);
      notification.error({
        message: "Error",
        description: "lôi ở ForgotPassword",
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex">
      <div className="m-auto flex flex-col w-1/3 mt-10">
        <p>Quên mật khẩu</p>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Nhập đúng định dạng E-mail!",
              },
              { required: true, message: "Vui lòng nhập email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              className="mx-5"
              onClick={() => {
                navigate("/login");
              }}
            >
              Về trang chủ
            </Button>
            <Button type="primary" htmlType="submit">
              Gửi mã xác nhận
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
