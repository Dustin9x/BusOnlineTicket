import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPromoteTripAction } from '../../../redux/actions/PromoteTripAction';
import { getStationListAction } from '../../../redux/actions/StationAction';

const AddNewPromoteTrip = () => {
  const dispatch = useDispatch();
  const { arrStation } = useSelector(state => state.StationReducer);
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    dispatch(getStationListAction())
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      fromStation: '',
      toStation: '',
      image: '',
    },
    onSubmit: (values) => {
      if (values.fromStation == values.toStation) {
        notification.error({
          closeIcon: true,
          message: 'Error',
          description: (
            <>
              "Leaving from" and "Going to" must not same!
            </>
          ),
        });
      } else {
        let formData = new FormData();
        for (let key in values) {
          if (key !== "image") {
            formData.append(key, values[key]);
          } else {
            formData.append("image", values["image"]);
          }
        }
        console.table('formData', [...formData])
        dispatch(addNewPromoteTripAction(formData));
      }

    }
  })


  const handleChangeFile = (e) => {
    let file = e.target.files[0];

    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);//Hình base 64
      }
      formik.setFieldValue('UploadImage', file);
    }
  }

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
      <h3 className="text-2xl">Add New Promote Trip</h3>
      <div className='row'>
        <div className='col-8'>
          <Form.Item label="Image">
            <input type="file" name='UploadImage' onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
            <br />
            {imgSrc ? <img style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: '50%' }} src={imgSrc} alt="..." /> : <img style={{ width: 200, height: 200, border: '0.1px solid #ccc', borderRadius: '50%' }} src='/img/placeholder-image.jpg' alt="..." />}
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

          <Form.Item label="Action">
            <Button htmlType="submit" >Add Promote Trip</Button>
          </Form.Item>
        </div>
      </div>

    </Form>
  );
};

export default AddNewPromoteTrip;