import React from "react";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../redux/actions/UserAction";

export default function ForgetPassword(props) {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    const action = forgetPassword(values.email);
    dispatch(action);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="py-8 px-8 bg-white rounded-2xl shadow-xl z-20">
      <Form
        name="basic"
        className="d-flex flex-col"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 350,
          width: 350,
        }}
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div>
          <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
            Password Recovery
          </h1>
          <p className="text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide">
            Enter your registration email to retrieve your password!!
          </p>
        </div>
        <Form.Item
          label=""
          name="email"
          rules={[
            {
              type: "email",
              message: "E-mail is not in the correct format!",
            },
            {
              required: true,
              message: "E-mail cannot be blank!",
            },
          ]}
        >
          <Input
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            placeholder="Email"
          />
        </Form.Item>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="py-2 w-64 text-xl text-white bg-purple-400 rounded-xl"
          >
            Send Password
          </button>
          <p className="mt-4 text-sm">
            Please see the password at gmail after sending!!
          </p>
        </div>
      </Form>
    </div>
  );
}
