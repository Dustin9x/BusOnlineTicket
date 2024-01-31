import React, { useEffect, useState } from 'react';
import { Form, Button, Select } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getPromoteTripByIdAction, updatePromoteTripByIdAction } from '../../../redux/actions/PromoteTripAction';
import { DOMAIN } from '../../../util/settings/config';
import { getStationListAction } from '../../../redux/actions/StationAction';

const EditPromoteTrip = (props) => {
  const dispatch = useDispatch();
  const { promoteTripDetail } = useSelector(state => state.PromoteTripReducer)
  const { arrStation } = useSelector(state => state.StationReducer);

  let { id } = props.match.params;
  useEffect(() => {
    dispatch(getPromoteTripByIdAction(id));
    dispatch(getStationListAction())
  }, [dispatch])

  const [imgSrc, setImgSrc] = useState("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fromStation: promoteTripDetail?.fromStation,
      toStation: promoteTripDetail?.toStation,
      image: promoteTripDetail?.image,
    },
    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key !== "image") {
          formData.append(key, values[key]);
        } else {
          formData.append("image", values["image"]);
        }
      }
      dispatch(updatePromoteTripByIdAction(id, formData))
    }
  })

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

  const handleChangeFromStation = (value,data) => {
    formik.setFieldValue('fromStation', value)
  };

  const handleChangeToStation = (value,data) => {
    formik.setFieldValue('toStation', value)
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
      <h3 className="text-2xl">Edit Promote Trip:</h3>
      <div className='row'>
        <div className='col-8'>
          <Form.Item label="Image">
            <input type="file" name="UploadImage" onChange={handleChangeFile} accept="image/png, image/jpeg, image/png" />
            <br />
            <img style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: '50%' }} src={imgSrc === '' ? `${DOMAIN}/Images/PromoteTrip/${formik.values.image}` : imgSrc} alt="..." />
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
            <Select options={ arrStation?.filter(x => x.name != formik.values.toStation).map((item, index) =>({ key: index, label: item?.name, value: item.name }))} onChange={handleChangeFromStation} value={formik.values.fromStation} placeholder='Please enter Leaving from' />
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
            <Select options={ arrStation?.filter(x => x.name != formik.values.fromStation).map((item, index) =>({ key: index, label: item?.name, value: item.name }))} onChange={handleChangeToStation} value={formik.values.toStation} placeholder='Please enter Going to' />
          </Form.Item>

          <Form.Item label="Action">
            <Button htmlType="submit">Update</Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default EditPromoteTrip;