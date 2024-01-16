import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addNewStationAction } from '../../../redux/actions/StationAction';

const AddNewStation = () => {
  const dispatch = useDispatch();
  const { TextArea } = Input;

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
    },
    onSubmit: (values) => {
      if (values.name == '' || values.address == '') {
        notification.error({
          closeIcon: true,
          message: 'Error',
          description: (
            <>Please fill in all required fields.</>
          ),
        });
      } else {
        let formData = new FormData();
        for (let key in values) {
          formData.append(key, values[key]);
        }
          console.table('formData123', [...formData])
          dispatch(addNewStationAction(formData));
      }
      
    }
  })


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
      <h3 className="text-2xl">Add New Station</h3>
      <div className='row'>
        <div className='col-8'>
        <Form.Item
            label="Station Name"
            style={{ minWidth: '100%' }}
            rules={[
              {
                required: true,
                message: 'Station name is required!',
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Input name="name" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item
            label="Address"
            style={{ minWidth: '100%' }}
            rules={[
              {
                required: true,
                message: 'Address is required!',
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Input name="address" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Action">
            <Button htmlType="submit" >Add Station</Button>
          </Form.Item>
        </div>
      </div>

    </Form>
  );
};

export default AddNewStation;