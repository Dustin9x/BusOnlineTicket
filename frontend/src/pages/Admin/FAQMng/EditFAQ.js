import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, InputNumber, Switch, Button } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

const EditFAQ = (props) => {
  const dispatch = useDispatch();
  const { busTypeDetail } = useSelector(state => state.BusReducer)

  let { id } = props.match.params;
  useEffect(() => {
    // dispatch(getBusTypeByIdAction(id));
  }, [dispatch, id])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: busTypeDetail?.name,
      numberOfSeat: busTypeDetail?.numberOfSeat
    },
    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      // dispatch(updateBusTypeByIdAction(id, formData))
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
      <h3 className="text-2xl">Edit Bus Type: {formik.values.name}</h3>
      <div className='row'>
        <div className='col-8'>
          <Form.Item
            label="Bus Type"
            style={{ minWidth: '100%' }}
            rules={[
              {
                required: true,
                message: 'Bus Type is required!',
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Input name="name" onChange={formik.handleChange} value={formik.values.name} />
          </Form.Item>
          <Form.Item
            label="Number Of Seat"
            style={{ minWidth: '100%' }}
            rules={[
              {
                required: true,
                message: 'Number of seat is required!',
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Input name="numberOfSeat" onChange={formik.handleChange} value={formik.values.numberOfSeat} />
          </Form.Item>
          <Form.Item label="Action">
            <Button htmlType="submit">Update</Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default EditFAQ;