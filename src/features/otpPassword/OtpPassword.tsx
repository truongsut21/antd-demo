import React, { useEffect, useRef } from "react";
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
  const otpInputRef = useRef(null);

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  });

  const onChange: OTPProps["onChange"] = async (code) => {
    console.log("onChange:", code);

    const payload = {
      email,
      code,
    };

    try {
      const requestAPI = dispatch(fetchCheckResetCode(payload));
      requestAPI.then((response: any) => {
        if (response.payload.success) {
          dispatch(setCode(code));
          navigate("/create-password");
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

      const inputsHTML =
        document.querySelectorAll<HTMLInputElement>(".ant-otp-input");

      inputsHTML.forEach((input) => {


        console.log(input.value); // In giá trị của mỗi input ra console

        input.value = ""
      });


    } catch (error) {
      console.log("error: ", error);
      notification.error({
        message: "Error",
        description: "Error in api  OtpPassword",
      });
    }
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  return (
    <div className="flex">
      <Flex gap="middle" align="flex-start" vertical className="m-auto mt-10">
        <Title level={5}>OTP Password</Title>
        <Input.OTP
          className="otp-input-value"
          formatter={(str) => str.toUpperCase()}
          {...sharedProps}
          ref={otpInputRef}
        />
      </Flex>
    </div>
  );
};

export default OtpPassword;
