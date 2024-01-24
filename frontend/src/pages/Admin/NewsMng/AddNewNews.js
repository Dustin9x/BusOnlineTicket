import React, { useState } from "react";
import { Form, Input, Button, notification, DatePicker } from "antd";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import moment from "moment";
import { addNewsAction } from "../../../redux/actions/NewAction";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
dayjs.extend(customParseFormat);

const AddNewNews = () => {
  const dispatch = useDispatch();
  const dateFormat = "DD-MM-YYYY";
  const [imgSrc, setImgSrc] = useState("");
  const today = moment();
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      dayCreateNew: today.format("YYYY-MM-DD"),
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
          formData.append(key, values[key]);
        }
        console.table("formData", [...formData]);
        dispatch(addNewsAction(formData));
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
      <h3 className="text-2xl">Add New News</h3>
      <div className="row">
        <div className="col-8">
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
          {/* <Form.Item
                    label="Day Create New"
                    rules={[
                        {
                            required: true,
                            message: 'Day Create New can not be blank!',
                        },
                    ]}
                >
                    <DatePicker format={dateFormat} onChange={onChangeDate} onOk={onOk} />
        </Form.Item> */}

          <Form.Item label="Action">
            <Button htmlType="submit">Add New News</Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default AddNewNews;
