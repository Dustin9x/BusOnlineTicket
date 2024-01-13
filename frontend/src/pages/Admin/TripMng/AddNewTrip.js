import React, { useEffect, useState } from 'react'
import { Form, Button, Select, Input, notification, DatePicker } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getBusListAction } from '../../../redux/actions/BusAction';
import { getStationListAction } from '../../../redux/actions/StationAction';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { addNewTripAction } from '../../../redux/actions/TripAction';
dayjs.extend(customParseFormat);

export default function AddNewTrip(props) {
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState('');
  let { arrBus } = useSelector(state => state.BusReducer);
  let { arrStation } = useSelector(state => state.StationReducer);
  const dateFormat = 'DD-MM-YYYY';
  const { RangePicker } = DatePicker;

  useEffect(() => {
    dispatch(getBusListAction())
    dispatch(getStationListAction())
  }, [dispatch]);
  const formik = useFormik({
    initialValues: {
      startTime: '',
      finishTime: '',
      ticketPrice: '',
      busId: '',
      fromStationId: '',
      toStationId: '',
      UploadImage: {},
    },
    onSubmit: async (values) => {

      let formData = new FormData();
      for (let key in values) {
        if (key !== 'UploadImage') {
          formData.append(key, values[key]);
        } else {
          formData.append('UploadImage', values['UploadImage']);
        }
      }
      console.table('formData', [...formData])
      dispatch(addNewTripAction(formData));

    }
  })

  const handleChangeBus = (value) => {
    formik.setFieldValue('busId', value)
    console.log('busId', value)
  }

  const handleChangeFromStation = (value) => {
    formik.setFieldValue('fromStationId', value)
  };

  const handleChangeToStation = (value) => {
    formik.setFieldValue('toStationId', value)
  };

  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    formik.setFieldValue('startTime', dateString[0])
    formik.setFieldValue('finishTime', dateString[1])
  };
  const onOk = (value) => {
    console.log('onOk: ', value);
  };


  const handleChangeFile = (e) => {
    let file = e.target.files[0];

    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      }
      formik.setFieldValue('UploadImage', file);
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
      <h3 className="text-2xl">Add New Trip</h3>
      <div className='row'>
        <Form.Item
          label="Start and Finish Time"
          style={{ minWidth: '100%' }}
          rules={[
            {
              required: true,
              message: 'Date time is required!',
              transform: (value) => value.trim(),
            },
          ]}
        >
          <RangePicker
            showTime={{
              format: 'HH:mm',
            }}
            format="YYYY-MM-DD HH:mm"
            onChange={onChange}
            onOk={onOk}
          />
        </Form.Item>

        <Form.Item
          label="Ticket Price"
          style={{ minWidth: '100%' }}
          rules={[
            {
              required: true,
              message: 'Ticket price is required!',
              transform: (value) => value.trim(),
            },
          ]}
        >
          <Input name="ticketPrice" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item
          label="Assigned Bus"
          style={{ minWidth: '100%' }}
          rules={[
            {
              required: true,
              message: 'Bus is required!',
              transform: (value) => value.trim(),
            },
          ]}
        >
          <Select options={arrBus?.map((item, index) => ({ key: index, label: item.busPlate, value: item.id }))} onChange={handleChangeBus} />
        </Form.Item>
        <Form.Item
          label="From Station"
          style={{ minWidth: '100%' }}
          rules={[
            {
              required: true,
              message: 'From Station is required!',
              transform: (value) => value.trim(),
            },
          ]}
        >
          <Select options={arrStation?.map((item, index) => ({ key: index, label: item.name, value: item.id }))} onChange={handleChangeFromStation} />
        </Form.Item>
        <Form.Item
          label="To Station"
          style={{ minWidth: '100%' }}
          rules={[
            {
              required: true,
              message: 'To Station is required!',
              transform: (value) => value.trim(),
            },
          ]}
        >
          <Select options={arrStation?.map((item, index) => ({ key: index, label: item.name, value: item.id }))} onChange={handleChangeToStation} />
        </Form.Item>
        <Form.Item
          label="Image"
          style={{ minWidth: '100%' }}
        >
          <input type="file" name="UploadImage" onChange={handleChangeFile} accept="image/png, image/jpeg,image/png" />
          <br />
          {imgSrc ? <img style={{ width: 200, height: 150, objectFit: 'cover', borderRadius: '6px' }} src={imgSrc} alt="..." /> : <img style={{ width: 200, border: '0.1px solid #ccc', borderRadius: '6px' }} src='/img/placeholder-image.jpg' alt="..." />}
        </Form.Item>
        <Form.Item label="Action" style={{ minWidth: '100%' }}>
          <Button htmlType="submit" >Add Bus</Button>
        </Form.Item>
      </div>

    </Form>
  )
}