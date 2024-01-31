import React, { useEffect } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addNewBusAction, getBusTypeListAction } from '../../../redux/actions/BusAction';
import { getStationListAction } from '../../../redux/actions/StationAction';

const AddNewBus = () => {
  const dispatch = useDispatch();
  let { arrBusType } = useSelector(state => state.BusReducer);
  let { arrStation } = useSelector(state => state.StationReducer);
  const { TextArea } = Input;

  useEffect(() => {
    dispatch(getBusTypeListAction())
    dispatch(getStationListAction())
  }, [dispatch]);


  const options = [];
  arrStation.forEach(element => {
    options.push({
      label: element.name,
      value: element.id
    });
  });

  const formik = useFormik({
    initialValues: {
      busPlate: '',
      busTypeId: '',
      stationId: [],
      note: '',
    },
    onSubmit: (values) => {
      if (values.busPlate == '' || values.busTypeId == '' || values.stationId == '') {
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
        console.table('formData', [...formData])
        dispatch(addNewBusAction(formData));
      }

    }
  })

  const handleChangeBusType = (value) => {
    formik.setFieldValue('busTypeId', value)
  }

  const handleChangeStation = (value) => {
    formik.setFieldValue('stationId', value)
  };

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
            name='busType'
            style={{ minWidth: '100%' }}
            rules={[
              {
                required: true,
                message: 'Bus Type is required!',
                transform: (value) => value.trim(),
              },
            ]}
          >
            {/* <Input name='busType' type='hidden'  /> */}
            <Select rules={[{required:true}]} options={arrBusType?.map((item, index) => ({ key: index, label: item.name, value: item.id }))} onChange={handleChangeBusType} />
          </Form.Item>
          <Form.Item
            label="Station"
            name='Station'
            style={{ minWidth: '100%' }}
            rules={[
              {
                required: true,
                message: 'Station is required!',
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{
                width: '100%',
              }}
              placeholder="Please select"
              onChange={handleChangeStation}
              options={options}
            />
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