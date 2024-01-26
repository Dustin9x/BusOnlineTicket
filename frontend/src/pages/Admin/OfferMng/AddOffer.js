import React, { useEffect, useState } from "react";
import { Form, Input, Button, notification, DatePicker, Select } from "antd";
import { PercentageOutlined} from '@ant-design/icons';
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { addNewsAction } from "../../../redux/actions/NewAction";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { addOfferAction } from "../../../redux/actions/OfferAction";
import { getStationListAction } from "../../../redux/actions/StationAction";
dayjs.extend(customParseFormat);

const AddOffer = () => {
  const dispatch = useDispatch();
  const dateFormat = "DD-MM-YYYY";
  const [imgSrc, setImgSrc] = useState("");
  const { arrStation } = useSelector(state => state.StationReducer);
  const today = moment();

  useEffect(() => {
    dispatch(getStationListAction())
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      offerCode: "",
      discount: "",
      title: "",
      beginDate: "",
      endDate: "",
      fromStation: '',
      toStation: '',
      image: ""
    },
    onSubmit: (values) => {
      if (values.title == "" || values.offerCode == "") {
        notification.error({
          closeIcon: true,
          message: "Error",
          description: <>Please fill in all required fields.</>,
        });
      } else {
        let formData = new FormData();
        for (let key in values) {
          if (key !== "UploadImage") {
            formData.append(key, values[key]);
          } else {
            formData.append('UploadImage', values['UploadImage']);
          }
        }
        console.table("formData", [...formData]);
        dispatch(addOfferAction(formData));
      }
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

  const handleChangeFromStation = (value,data) => {
    formik.setFieldValue('fromStation', value)
  };

  const handleChangeToStation = (value,data) => {
    formik.setFieldValue('toStation', value)
  };

  const onOkBeginDate = (values) => {
    formik.setFieldValue('beginDate', values);
  }

  const onChangeBeginDate = (values) => {
    formik.setFieldValue('beginDate', values);
  }

  const onOkEndDate = (values) => {
    if(values < formik.values.beginDate){
      notification.error({
        closeIcon: true,
        message: 'Error',
        description: (
          <>End Date must after Begin Date</>
        ),
      });
    }else{
      formik.setFieldValue('endDate', values);
    }
  }

  const onChangeEndDate = (values) => {
    if(values < formik.values.beginDate){
      notification.error({
        closeIcon: true,
        message: 'Error',
        description: (
          <>End Date must after Begin Date</>
        ),
      });
    }else{
      formik.setFieldValue('endDate', values);
    }
  }

  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
    >
      <h3 className="text-2xl">Add New Offer</h3>
      <div className="row">
        <div className="col-8">
          <Form.Item
            label="Offer Code"
            name="offerCode"
            style={{ minWidth: "100%" }}
            rules={[
              {
                required: true,
                message: "Offer Code is required!",
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Input name="offerCode" onChange={formik.handleChange} />
          </Form.Item>

          <Form.Item
            label="Discount"
            name="discount"
            style={{ minWidth: "100%" }}
            rules={[
              {
                required: true,
                message: "Discount is required!",
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Input name="discount" type="number" prefix={<PercentageOutlined />} onChange={formik.handleChange} />
          </Form.Item>

          <Form.Item
            label="Title"
            name="title"
            style={{ minWidth: "100%" }}
            rules={[
              {
                required: true,
                message: "Title is required!",
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Input name="title" onChange={formik.handleChange} />
          </Form.Item>

          <Form.Item
            label="Leaving From Station"
            style={{ minWidth: '100%' }}
            rules={[
              {
                required: true,
                message: 'From Station is required!',
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Select options={ arrStation?.filter(x => x.name != formik.values.toStation).map((item, index) =>({ key: index, label: item?.name, value: item.name }))} onChange={handleChangeFromStation} placeholder='Please enter Leaving from' />
          </Form.Item>

          <Form.Item
            label="Going To Station"
            style={{ minWidth: '100%' }}
            rules={[
              {
                required: true,
                message: 'To Station is required!',
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Select options={ arrStation?.filter(x => x.name != formik.values.fromStation).map((item, index) =>({ key: index, label: item?.name, value: item.name }))} onChange={handleChangeToStation} placeholder='Please enter Going to' />
          </Form.Item>

          <Form.Item
            label="Begin Date"
            rules={[
              {
                required: true,
                message: 'Begin Date can not be blank!',
              },
            ]}
          >
            <DatePicker format={dateFormat} onChange={onChangeBeginDate} onOk={onOkBeginDate} />
          </Form.Item>

          <Form.Item
            label="End Date"
            rules={[
              {
                required: true,
                message: 'End date can not be blank!',
              },
            ]}
          >
            <DatePicker format={dateFormat} onChange={onChangeEndDate} onOk={onOkEndDate} />
          </Form.Item>

          <Form.Item label="Image">
            <input
              name="UploadImage"
              type="file"
              onChange={handleChangeFile}
              accept="image/png, image/jpeg,image/gif,image/png"
            />
            <br />
            {imgSrc ? (
              <img
                style={{
                  width: 200,
                  height: 200,
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                src={imgSrc}
                alt="..."
              />
            ) : (
              <img
                style={{
                  width: 200,
                  height: 200,
                  border: "0.1px solid #ccc",
                  borderRadius: "50%",
                }}
                src="/img/placeholder-image.jpg"
                alt="..."
              />
            )}
          </Form.Item>

          <Form.Item label="Action">
            <Button htmlType="submit">Add New Offer</Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default AddOffer;
