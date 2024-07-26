import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchResetPassword } from "../../api/fetchResetPassword";
import { Navigate, useNavigate } from "react-router-dom";

type FieldType = {
  password?: string;
  confirm?: string;
};

const CreatePassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const email = useSelector((state: RootState) => state.forgotPassword.email);
  const code = useSelector((state: RootState) => state.forgotPassword.code);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (values.confirm === values.password) {
      const playload = {
        email,
        code,
        password: values.password,
      };
      try {
        const resultAction = await dispatch(fetchResetPassword(playload));
        if (fetchResetPassword.fulfilled.match(resultAction)) {
          console.log("Password reset successful", resultAction.payload);

          notification.success({
            message: "Success",
            description: "Create password success",
          });

          navigate("/login");
        } else {
          console.error("Password reset failed", resultAction.error.message);
        }
      } catch (error) {
        console.error("An unexpected error occurred", error);
      }
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex">
      <div className="m-auto mt-10 w-96">
        <p>Tạo mật khẩu mới</p>
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
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Tạo mật khẩu mới
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreatePassword;
