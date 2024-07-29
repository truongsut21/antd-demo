import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, notification } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { FetchLogin } from "../../api/FetchLogin";
import axios from "axios";
import { Link } from "react-router-dom";

type FieldType = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);

    const requestAPI = dispatch(FetchLogin(values));
    try {
      requestAPI.then((response) => {
        if (response.payload.access_token) {
          localStorage.setItem("access_token", response.payload.access_token);
          localStorage.setItem("refresh_token", response.payload.refresh_token);

          // set token mặc định
          axios.defaults.headers.common[
            "Authorization"
          ] = `${response.payload.access_token}`;

          window.location.href = "/dash-board";
        } else {
          notification.error({
            message: "Error",
            description: response.payload.message,
          });
        }
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        className="m-auto mt-10"
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

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>

      <Link to="/forgot-password" className="text-blue-600">
        Quên mật khẩu.
      </Link>
    </div>
  );
};

export default Login;
