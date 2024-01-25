import React, { useState } from "react";
import { Form, Input, Button, notification, DatePicker } from "antd";
import { PercentageOutlined} from '@ant-design/icons';
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import moment from "moment";
import { addNewsAction } from "../../../redux/actions/NewAction";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { addOfferAction } from "../../../redux/actions/OfferAction";
dayjs.extend(customParseFormat);

const AddOffer = () => {
  const dispatch = useDispatch();
  const dateFormat = "DD-MM-YYYY";
  const [imgSrc, setImgSrc] = useState("");
  const today = moment();
  const formik = useFormik({
    initialValues: {
      offerCode: "",
      discount: "",
      title: "",
      content: "",
      beginDate: "",
      endDate: "",
      image: ""
    },
    onSubmit: (values) => {
      if (values.title == "" || values.content == "") {
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

  const handleChangeContent = (e, editor) => {
    const data = editor.getData();
    formik.setFieldValue("content", data);
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

          <Form.Item label="Content">
            <CKEditor
              className="rounded-lg overflow-hidden"
              name="content"
              editor={ClassicEditor}
              onChange={(event, editor) => {
                handleChangeContent(event, editor);
              }}
              onReady={(editor) => {
                editor.editing.view.change((writer) => {
                  writer.setStyle(
                    "height",
                    "200px",
                    editor.editing.view.document.getRoot()
                  );
                });
              }}
            ></CKEditor>
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
