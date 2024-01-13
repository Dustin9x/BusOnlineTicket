import React, { useState } from "react";
import { Form, Input, Button, Select, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateDriver } from "../../../redux/actions/DriverAction";
import { useFormik } from "formik";
const { Option } = Select;

const DriverEdit = (props) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  let { id } = props.match.params;
  let user = {};
  if (localStorage.getItem("userParams")) {
    user = JSON.parse(localStorage.getItem("userParams"));
  }

  const [imgSrc, setImgSrc] = useState(
    user.avatar || "/img/placeholder-image.jpg"
  );
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: user.fullName,
      nationalId: user.nationalId,
      driverLicense: user.driverLicense,
      phone: user.phone,
      email: user.email,
      yearOfBirth: user.yearOfBirth,
      placeOfBirth: user.placeOfBirth,
      note: user.note,
      enabled: user.enabled,
      avatar: user.avatar,
      fileName: "",
    },
    onSubmit: async (values) => {
      let newDriver = new FormData();
      for (let key in values) {
        if (key !== "avatar") {
          newDriver.append(key, values[key]);
        } else {
          newDriver.append("avatar", values["avatar"]);
        }
      }
      console.table("newDriver", [...newDriver]);
      dispatch(updateDriver(id, newDriver));
    },
  });

  const handleChangeFile = (e) => {
    let file = e.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
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

  const handleChangeEnabled = (value) => {
    formik.setFieldValue("enabled", value);
  };

  return (
    <div>
      <h3 className="mb-5">Update Infor Driver : {user.fullName}</h3>
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
          label="Full Name"
          name="fullName"
          initialValue={user.fullName}
          rules={[
            {
              required: true,
              message: "FullName is not blank!",
            },
          ]}
        >
          <Input
            name="fullName"
            onChange={formik.handleChange}
            placeholder="Full Name"
          />
        </Form.Item>

        <Form.Item
          label="ID Nationnal"
          name="nationalId"
          initialValue={user.nationalId}
          rules={[
            {
              required: true,
              message: "ID Nationnal is not blank!",
            },
          ]}
        >
          <Input
            name="nationalId"
            onChange={formik.handleChange}
            placeholder="ID Nationnal"
          />
        </Form.Item>

        <Form.Item
          label="Driver License"
          name="driverLicense"
          initialValue={user.driverLicense}
          rules={[
            {
              required: true,
              message: "Driver License is not blank!",
            },
          ]}
        >
          <Input
            name="driverLicense"
            onChange={formik.handleChange}
            placeholder="Driver License"
          />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          initialValue={user.phone}
          rules={[
            {
              required: true,
              message: "Phone is not blank!",
            },
          ]}
        >
          <Input
            name="phone"
            onChange={formik.handleChange}
            placeholder="Phone"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          initialValue={user.email}
          rules={[
            {
              type: "email",
              message: "E-mail is'nt format",
            },
            {
              required: true,
              message: "E-mail is not blank!",
            },
          ]}
        >
          <Input
            disabled
            className="text-dark"
            name="email"
            onChange={formik.handleChange}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          label="Year Of Birth"
          name="yearOfBirth"
          initialValue={user.yearOfBirth}
          rules={[
            {
              required: true,
              message: "Year Of Birth is not blank!",
            },
          ]}
        >
          <Input
            name="yearOfBirth"
            onChange={formik.handleChange}
            placeholder="Year Of Birth"
          />
        </Form.Item>

        <Form.Item
          label="Place Of Birth"
          name="placeOfBirth"
          initialValue={user.placeOfBirth}
          rules={[
            {
              required: true,
              message: "Place Of Birth is not blank!",
            },
          ]}
        >
          <Input
            name="placeOfBirth"
            onChange={formik.handleChange}
            placeholder="Place Of Birth"
          />
        </Form.Item>

        <Form.Item
          label="Note"
          name="note"
          initialValue={user.note}
          rules={[
            {
              required: true,
              message: "Note is not blank!",
            },
          ]}
        >
          <Input
            name="note"
            onChange={formik.handleChange}
            placeholder="Note"
          />
        </Form.Item>

        <Form.Item
          name="enabled"
          label="Enabled"
          initialValue={user.enabled}
          rules={[
            {
              required: true,
              message: "Enabled is not blank!",
            },
          ]}
        >
          <Select
            name="enabled"
            onChange={handleChangeEnabled}
            placeholder="Option Enabled"
          >
            <Option value={true}>On</Option>
            <Option value={false}>Off</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Avatar">
          <input
            type="file"
            name="UploadImage"
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
            src={imgSrc === "" ? "/img/placeholder-image.jpg" : imgSrc}
            alt="..."
          />
        </Form.Item>

  

        <Form.Item label="Action">
          <Button
            htmlType="submit"
            className="btn-primary bg-primary"
            type="primary"
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DriverEdit;
