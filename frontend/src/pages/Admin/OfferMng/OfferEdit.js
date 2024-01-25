import React, { useState } from "react";
import { Form, Input, Button, notification, DatePicker } from "antd";
import { PercentageOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { values } from "lodash";
import { DOMAIN, TOKEN, USER_LOGIN } from "../../../util/settings/config";
import { history } from "../../../App";
import { useEffect } from "react";
import { detailNewsAction, updateNewsAction } from "../../../redux/actions/NewAction";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getOfferDetailAction, updateOfferAction } from "../../../redux/actions/OfferAction";
import dayjs from "dayjs";

const OfferEdit = (props) => {
  const dateFormat = "DD-MM-YYYY";
  const dispatch = useDispatch();
  let { id } = props.match.params;

  useEffect(() => {
    dispatch(getOfferDetailAction(id))
  }, [])

  const { offerDetail } = useSelector((state) => state.OfferReducer);

  const [imgSrc, setImgSrc] = useState("");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      offerCode: offerDetail.offerCode,
      discount: offerDetail.discount,
      title: offerDetail.title,
      content: offerDetail.content,
      beginDate: offerDetail.beginDate,
      endDate: offerDetail.endDate,
      image: offerDetail.image
    },
    onSubmit: async (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key !== "UploadImage") {
          formData.append(key, values[key]);
        } else {
          formData.append('UploadImage', values['UploadImage']);
        }
      }
      console.table("formData", [...formData]);
      dispatch(updateOfferAction(id, formData));
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
    if (values < formik.values.beginDate) {
      notification.error({
        closeIcon: true,
        message: 'Error',
        description: (
          <>End Date must after Begin Date</>
        ),
      });
    } else {
      formik.setFieldValue('endDate', values);
    }
  }

  const onChangeEndDate = (values) => {
    if (values < formik.values.beginDate) {
      notification.error({
        closeIcon: true,
        message: 'Error',
        description: (
          <>End Date must after Begin Date</>
        ),
      });
    } else {
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
      <h3 className="text-2xl">Update Offer</h3>
      <div className="row">
        <div className="col-8">
          <Form.Item
            label="Offer Code"
            style={{ minWidth: "100%" }}
            rules={[
              {
                required: true,
                message: "Offer Code is required!",
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Input name="offerCode" onChange={formik.handleChange} value={formik.values.offerCode} />
          </Form.Item>

          <Form.Item
            label="Discount"
            style={{ minWidth: "100%" }}
            rules={[
              {
                required: true,
                message: "Discount is required!",
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Input name="discount" type="number" prefix={<PercentageOutlined />} onChange={formik.handleChange} value={formik.values.discount} />
          </Form.Item>

          <Form.Item
            label="Title"
            style={{ minWidth: "100%" }}
            rules={[
              {
                required: true,
                message: "Title is required!",
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Input name="title" onChange={formik.handleChange} value={formik.values.title} />
          </Form.Item>

          <Form.Item label="Content">
            <CKEditor
              className="rounded-lg overflow-hidden"
              data={formik.values.content}
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
            <DatePicker format={dateFormat} onChange={onChangeBeginDate} onOk={onOkBeginDate} value={formik.values.beginDate && dayjs(formik.values.beginDate)} />
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
            <DatePicker format={dateFormat} onChange={onChangeEndDate} onOk={onOkEndDate} value={dayjs(formik.values.endDate)} />
          </Form.Item>

          <Form.Item label="Image" style={{ minWidth: '100%' }}>
            <input type="file" name="UploadImage" onChange={handleChangeFile} accept="image/png, image/jpeg, image/png" />
            <br />
            <img style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: '50%' }} src={imgSrc === '' ? `${DOMAIN}/Images/Offer/${formik.values.image}` : imgSrc} alt="..." />
          </Form.Item>

          <Form.Item label="Action">
            <Button htmlType="submit">Update Offer</Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default OfferEdit;
