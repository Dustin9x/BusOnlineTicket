import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

const AddNewFAQ = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      numberOfSeat: '',
    },
    onSubmit: (values) => {
      if (values.name == '' || values.numberOfSeat == '') {
        notification.error({
          closeIcon: false,
          message: 'Error',
          description: (
            <>
              Please fill in all required fields.
            </>
          ),
        });
      } else {
        let formData = new FormData();
        for (let key in values) {
          formData.append(key, values[key]);
        }
        console.table('formData', [...formData])
        // dispatch(addBusTypeAction(formData));
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
      <h3 className="text-2xl">Add New Bus Type</h3>
      <div className='row'>
        <div className='col-8'>
          <Form.Item
            label="Bus Type"
            name="name"
            style={{ minWidth: '100%' }}
            rules={[
              {
                required: true,
                message: 'Bus Type is required!',
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Input name="name" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item
            label="Number Of Seat"
            name="numberOfSeat"
            style={{ minWidth: '100%' }}
            rules={[
              {
                required: true,
                message: 'Number of seat is required!',
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Input type='number' name="numberOfSeat" onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Action">
            <Button htmlType="submit" >Add Bus Type</Button>
          </Form.Item>
        </div>
      </div>

    </Form>
  );
};

export default AddNewFAQ;