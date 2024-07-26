import React from "react";
import { Flex, Input, Typography, notification } from "antd";
import type { GetProps } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchCheckResetCode } from "../../api/fetchCheckResetCode";
import { useNavigate } from "react-router-dom";
import { setCode } from "../../redux/forgotPasswordSlice";

type OTPProps = GetProps<typeof Input.OTP>;

const { Title } = Typography;

const OtpPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const email = useSelector((state: RootState) => state.forgotPassword.email);

  const onChange: OTPProps["onChange"] = async (code) => {
    console.log("onChange:", code);

    try {
      const payload = {
        email,
        code,
      };

      const resultAction = await dispatch(fetchCheckResetCode(payload));

      if (fetchCheckResetCode.fulfilled.match(resultAction)) {
        notification.success({
          message: "Success",
          description: "OTP code is valid.",
        });

        dispatch(setCode(code));
        navigate("/create-password");
      } else if (fetchCheckResetCode.rejected.match(resultAction)) {
        notification.error({
          message: "Error",
          description: "Invalid OTP code.",
        });
        console.error("Error:", resultAction.payload);
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "An unexpected error occurred.",
      });
      console.error("Caught error:", error);
    }
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  return (
    <div className="flex">
      <Flex gap="middle" align="flex-start" vertical className="m-auto mt-10">
        <Title level={5}>OTP Password</Title>
        <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
      </Flex>
    </div>
  );
};

export default OtpPassword;
