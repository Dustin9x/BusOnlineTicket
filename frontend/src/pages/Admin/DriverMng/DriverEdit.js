import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getDriverByIdAction, updateDriver } from "../../../redux/actions/DriverAction";
import { useFormik } from "formik";
import { DOMAIN } from './../../../util/settings/config';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const { Option } = Select;

const DriverEdit = (props) => {
  const dateFormat = 'DD-MM-YYYY';
  const dispatch = useDispatch();
  const { driverDetail } = useSelector(state => state.DriverReducer)

  let { id } = props.match.params;
  useEffect(() => {
    dispatch(getDriverByIdAction(id))
  }, [dispatch, id])

  const [imgSrc, setImgSrc] = useState("");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: driverDetail?.fullName,
      nationalId: driverDetail?.nationalId,
      driverLicense: driverDetail?.driverLicense,
      password: driverDetail?.password,
      phone: driverDetail?.phone,
      email: driverDetail?.email,
      yearOfBirth: driverDetail?.yearOfBirth,
      placeOfBirth: driverDetail?.placeOfBirth,
      note: driverDetail?.note,
      enabled: driverDetail?.enabled,
      isApprove:driverDetail?.isApprove,
      avatar: driverDetail?.avatar,
      trips:[{id:0}]
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

    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result); //Hình base 64
      };
      formik.setFieldValue("UploadImage", file);
    }
  };

  const onOk = (values) => {
    let yearOfBirth = dayjs(values).format('YYYY-MM-DD');
    formik.setFieldValue('yearOfBirth', yearOfBirth);
  }

  const onChangeDate = (values) => {
    let yearOfBirth = dayjs(values).format('YYYY-MM-DD');
    formik.setFieldValue('yearOfBirth', yearOfBirth);
  }

  let defaultDate = dayjs(formik.values.yearOfBirth).format(dateFormat)

  const handleChangeEnabled = (value) => {
    formik.setFieldValue("enabled", value);
  };
  const handleChangeIsApprove = (value) => {
    formik.setFieldValue("isApprove", value);
  };

  return (
    <div>
      <h3 className="mb-5">Update Infor Driver : {formik.values.fullName}</h3>
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
          <input type="file" name="UploadImage" onChange={handleChangeFile} accept="image/png, image/jpeg, image/png" />
          <br />
          <img style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: '50%' }} src={imgSrc === '' ? `${DOMAIN}/Images/Driver/${formik.values.avatar}` : imgSrc} alt="..." />
        </Form.Item>

        <Form.Item
          label="Full Name"
          rules={[
            {
              required: true,
              message: "FullName is not blank!",
            },
          ]}
        >
          <Input name="fullName" onChange={formik.handleChange} value={formik.values.fullName} placeholder="Full Name" />
        </Form.Item>

        <Form.Item
          label="ID Nationnal"
          rules={[
            {
              required: true,
              message: "ID Nationnal is not blank!",
            },
          ]}
        >
          <Input name="nationalId" onChange={formik.handleChange} value={formik.values.nationalId} placeholder="ID Nationnal" />
        </Form.Item>

        <Form.Item
          label="Driver License"
          rules={[
            {
              required: true,
              message: "Driver License is not blank!",
            },
          ]}
        >
          <Input name="driverLicense" onChange={formik.handleChange} value={formik.values.driverLicense} placeholder="Driver License" />
        </Form.Item>

        <Form.Item
          label="Phone"
          rules={[
            {
              required: true,
              message: "Phone is not blank!",
            },
          ]}
        >
          <Input name="phone" onChange={formik.handleChange} value={formik.values.phone} placeholder="Phone" />
        </Form.Item>

        <Form.Item
          label="email"
          rules={[
            {
              type: "email",
              message: "E-mail is not in the correct format!",
            },
            {
              required: true,
              message: "E-mail can not be blank!",
            },
          ]}
        >
          <Input className="text-dark" disabled name="email" onChange={formik.handleChange} value={formik.values.email} placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Year Of Birth"
          rules={[
            {
              required: true,
              message: "Year Of Birth is not blank!",
            },
          ]}
        >
          <DatePicker format={dateFormat} defaultValue={dayjs(defaultDate, dateFormat)} onChange={onChangeDate} onOk={onOk} />
        </Form.Item>

        <Form.Item
          label="Place Of Birth"
          rules={[
            {
              required: true,
              message: "Place Of Birth is not blank!",
            },
          ]}
        >
          <Input name="placeOfBirth" onChange={formik.handleChange} value={formik.values.placeOfBirth} placeholder="Place Of Birth" />
        </Form.Item>

        <Form.Item
          label="Note"
          rules={[
            {
              required: true,
              message: "Note is not blank!",
            },
          ]}
        >
          <Input name="note" onChange={formik.handleChange} value={formik.values.note} placeholder="Note" />
        </Form.Item>

        <Form.Item
          label="Enabled"
        >
          <Select name="enabled" onChange={handleChangeEnabled} value={formik.values.enabled} placeholder="Option Enabled" >
            <Option value={true}>On</Option>
            <Option value={false}>Off</Option>
          </Select>
        
        </Form.Item>
        <Form.Item
          label="Prove"
        >
        <Select name="isApprove" onChange={handleChangeIsApprove} value={formik.values.isApprove} placeholder="Option Enabled" >
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Action">
          <Button htmlType="submit" className="btn-primary bg-primary" type="primary" > Update Driver</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DriverEdit;
