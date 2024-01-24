import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getStationByIdAction, updateStationByIdAction } from '../../../redux/actions/StationAction';

const EditStation = (props) => {
  const dispatch = useDispatch();
  const { stationDetail } = useSelector(state => state.StationReducer)

  let { id } = props.match.params;
  useEffect(() => {
    dispatch(getStationByIdAction(id));
  }, [dispatch, id])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: stationDetail?.name,
      address: stationDetail?.address,
    },
    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      console.table('formData', [...formData])
      dispatch(updateStationByIdAction(id, formData))
    }
  })


  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
    >
      <h3 className="text-2xl">Edit Station: {formik.values.name}</h3>
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
            <Input name="name" onChange={formik.handleChange} value={formik.values.name}/>
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
            <Input name="address" onChange={formik.handleChange} value={formik.values.address}/>
          </Form.Item>
          <Form.Item label="Action">
            <Button htmlType="submit" >Update Station</Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default EditStation;