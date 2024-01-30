import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { createUserAction } from "../../../redux/actions/UserAction";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { TOKEN, USER_LOGIN } from "../../../util/settings/config";
import { history } from "../../../App";
const { Option } = Select;

const AddUser = () => {
  let userLogin = {};
  // if (localStorage.getItem(USER_LOGIN)) {
  //     userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
  // }

  // if (!localStorage.getItem(TOKEN)) {
  //     history.replace('/')
  // }

  // if (userLogin.role !== 'Super') {
  //     alert('Bạn không có quyền truy cập trang này!');
  //     history.replace('/')
  // }
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      avatar: "",
    },
    onSubmit: async (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key !== "avatar") {
          formData.append(key, values[key]);
        } else {
          formData.append("avatar", values["avatar"]);
        }
      }
      console.table("formData", [...formData]);
      dispatch(createUserAction(formData));
    },
  });

  const handleChangeFile = (e) => {
    let file = e.target.files[0];

    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result); //Hình base 64
      };
      formik.setFieldValue("UploadImage", file);
    }
  };

  const handleChangeRole = (value) => {
    formik.setFieldValue("role", value);
  };

  return (
    <div>
      <h3>Add New User</h3>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onSubmitCapture={formik.handleSubmit}
      >
        <Form.Item label="Avatar">
          <input
            name="UploadImage"
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/jpeg,image/gif,image/png"
          />
          <br />
          {imgSrc ? (
            <img style={{ width: 200, height: 200, objectFit: "cover", borderRadius: "50%", }} src={imgSrc} alt="..." />
          ) : (
            <img style={{ width: 200, height: 200, border: "0.1px solid #ccc", borderRadius: "50%", }} src="/img/placeholder-image.jpg" alt="..." />
          )}
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
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
          <Input name="email" onChange={formik.handleChange} placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Password cannot be blank!",
            },
          ]}
        >
          <Input.Password name="password" onChange={formik.handleChange} placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[
            {
              required: true,
              message: " Role User cannot be blank!",
            },
          ]}
        >
          <Select name="role" onChange={handleChangeRole} placeholder="Choose Role User" >
            <Option value="Admin">Admin</Option>
            <Option value="Mod">Mod</Option>
            <Option value="User">User</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Action">
          <Button htmlType="submit" className="btn-primary bg-primary" type="primary" > Add User </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddUser;
