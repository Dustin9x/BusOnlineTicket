import React, { useState } from "react";
import { Form, Input, Button, Select, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getModByIdAction,
  updateModAction,
} from "../../../../redux/actions/ModAction";
import { useFormik } from "formik";
import { values } from "lodash";
import { DOMAIN, TOKEN, USER_LOGIN } from "../../../../util/settings/config";
import { history } from "../../../../App";
import { useEffect } from "react";
const { Option } = Select;

const ModEdit = (props) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const { modDetail } = useSelector((state) => state.ModReducer);
  let { id } = props.match.params;
  useEffect(() => {
    dispatch(getModByIdAction(id));
  }, [dispatch, id]);

  const [imgSrc, setImgSrc] = useState("");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: modDetail?.email,
      password: null,
      fullName: modDetail?.fullName,
      role: modDetail?.role,
      avatar: modDetail?.avatar,
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
      dispatch(updateModAction(id, formData));
    },
  });

  const handleChangeFile = (e) => {
    let file = e.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
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

  const onChangeCheck = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <div>
      <h3 className="mb-5">Update infomation mod: {formik.values.name}</h3>
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
        <Form.Item
          label="Email"
          rules={[
            {
              type: "email",
              message: " E-mail is not in the correct format!",
            },
            {
              required: true,
              message: "E-mail  cannot be blank!",
            },
          ]}
        >
          <Input
            // disabled
            className="text-dark"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item label="Change password?">
          <Checkbox checked={checked} onChange={onChangeCheck}></Checkbox>
        </Form.Item>

        {checked ? (
          <Form.Item
            label="Password"
            rules={[
              {
                required: true,
                message: "Password  cannot be blank!",
              },
            ]}
          >
            <Input.Password
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Password"
            />
          </Form.Item>
        ) : (
          ""
        )}

        <Form.Item
            label="Role"
            rules={[
              {
                required: true,
                message: "Role User cannot be blank!",
              },
            ]}
          >
            <Select name="role" onChange={handleChangeRole} placeholder="Choose Role User" value={formik.values.role}>
              <Option value="Admin">Admin</Option>
              <Option value="Mod">Mod</Option>
              <Option value="User">User</Option>
            </Select>
          </Form.Item>

        <Form.Item label="Avatar">
          <input
            name="UploadImage"
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/jpeg,image/gif,image/png"
          />
          <br />
          <img
            style={{
              width: 200,
              height: 200,
              objectFit: "cover",
              borderRadius: "50%",
            }}
            src={
              imgSrc === ""
                ? `${DOMAIN}/Images/User/${formik.values.avatar}`
                : imgSrc
            }
            alt="..."
          />
        </Form.Item>

        <Form.Item label="Action">
          <Button
            htmlType="submit"
            className="btn-primary bg-primary"
            type="primary"
          >
            {" "}
            Update{" "}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ModEdit;
