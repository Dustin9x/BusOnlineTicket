import React, { useState } from "react";
import { Form, Input, Button, Select, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { DOMAIN } from "../../../util/settings/config";
import { useEffect } from "react";
import { detailNewsAction ,updateNewsAction} from "../../../redux/actions/NewAction";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const { Option } = Select;

const NewsEdit = (props) => {
 
  const dispatch = useDispatch();
  let { id } = props.match.params;

  useEffect(() => {
  dispatch(detailNewsAction(id));}, [])

  const { newsDetail } = useSelector((state) => state.NewReducer);

  const [imgSrc, setImgSrc] = useState("");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
        title: newsDetail?.title,
        content: newsDetail?.content,
        image:newsDetail?.image,
        dayCreateNew: newsDetail?.dayCreateNew,
    },
    onSubmit: async (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key !== "image") {
          formData.append(key, values[key]);
        } else {
          formData.append("image", values["image"]);
        }
      }
      console.table("formData", [...formData]);
      dispatch(updateNewsAction(id,formData));
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
  return (
    <div>
      <h3 className="mb-5">Update infomation News</h3>
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
          label="Title"
          rules={[
            {
              type: "title",
              message: " Title is not in the correct format!",
            },
            {
              required: true,
              message: "Title cannot be blank!",
            },
          ]}
        >
          <Input  className="text-dark" name="title" onChange={formik.handleChange} value={formik.values.title} placeholder="Title" />
        </Form.Item>

       

        <Form.Item label="Content">
            <CKEditor className='rounded-lg overflow-hidden' name="content" editor={ClassicEditor} onChange={(event, editor) => { handleChangeContent(event, editor) }}
              data={formik.values.content}
              onReady={(editor) => {
                editor.editing.view.change((writer) => {
                  writer.setStyle(
                    "height",
                    "200px",
                    editor.editing.view.document.getRoot(),
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
          <img style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: '50%' }} src={imgSrc === '' ? `${DOMAIN}/Images/News/${formik.values.image}` : imgSrc} alt="..." />
        </Form.Item>

        <Form.Item label="Action">
          <Button htmlType="submit" className="btn-primary bg-primary" type="primary" > Update News </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewsEdit;
