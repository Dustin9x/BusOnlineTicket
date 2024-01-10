import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addNewBusAction, getBusTypeListAction } from '../../../redux/actions/BusAction';

const AddNewBus = () => {
  const dispatch = useDispatch();
  let { arrBusType } = useSelector(state => state.BusReducer);
  const { TextArea } = Input;

  useEffect(() => {
    dispatch(getBusTypeListAction())
  }, [dispatch]);

  console.log('arrBusType', arrBusType)

  const formik = useFormik({
    initialValues: {
      busPlate: '',
      BusType: '',
      stations: [],
      note: '',
    },
    onSubmit: (values) => {
      if (values.busPlate == '' || values.busType == '') {
        notification.error({
          closeIcon: false,
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
        console.table('formData', [...formData])
        dispatch(addNewBusAction(formData));
      }

    }
  })

  const handleChangeBusType = (value) => {
    formik.setFieldValue('BusType', value)
  }


  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 16,
      }}
      layout="horizontal"
    >
      <h3 className="text-2xl">Add New Bus</h3>
      <div className='row'>
        <div className='col-8'>
          <Form.Item
            label="Bus Plate"
            name="busPlate"
            style={{ minWidth: '100%' }}
            rules={[
              {
                required: true,
                message: 'Bus Plate is required!',
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Input name="busPlate" onChange={formik.handleChange} />
          </Form.Item>
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
            <Select options={arrBusType?.map((item, index) => ({ key: index, label: item.name, value: item.id }))} onChange={handleChangeBusType} />
          </Form.Item>
          <Form.Item label="Note">
            <TextArea name="note" allowClear rows={4} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Action">
            <Button htmlType="submit" >Add Bus</Button>
          </Form.Item>
        </div>
      </div>

    </Form>
  );
};

export default AddNewBus;