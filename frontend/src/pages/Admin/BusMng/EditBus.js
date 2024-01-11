import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getBusByIdAction, getBusTypeListAction, updateBusByIdAction } from '../../../redux/actions/BusAction';
import { getStationListAction } from '../../../redux/actions/StationAction';

const EditBus = (props) => {
  const dispatch = useDispatch();
  const { busDetail } = useSelector(state => state.BusReducer)
  let { arrStation } = useSelector(state => state.StationReducer);
  let { arrBusType } = useSelector(state => state.BusReducer);
  const { TextArea } = Input;

  let { id } = props.match.params;
  useEffect(() => {
    dispatch(getBusTypeListAction())
    dispatch(getStationListAction())
    dispatch(getBusByIdAction(id))
  }, [dispatch, id])


  let defaultValue = [];
    if (localStorage.getItem('busStaionDefault')) {
      defaultValue = JSON.parse(localStorage.getItem('busStaionDefault')).split(",").map(Number);
    }
  
  console.log('defaultValue',defaultValue)

  const options = [];
  arrStation.forEach(element => {
    options.push({
      label: element.name,
      value: element.id
    });
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      busPlate: busDetail?.busPlate,
      busTypeId: busDetail?.busTypeId,
      stationId: busDetail?.stationId,
      note: busDetail?.note || '',
    },
    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      console.table('formData', [...formData])
      dispatch(updateBusByIdAction(id, formData))
      localStorage.removeItem("busStaionDefault");
    }
  })


  const handleChangeBusType = (value) => {
    formik.setFieldValue('busTypeId', value)
  }

  const handleChangeStation = (value) => {
    console.log('value',value)
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
      <h3 className="text-2xl">Edit Bus Type: {formik.values.busPlate}</h3>
      <div className='row'>
        <div className='col-8'>
          <Form.Item
            label="Bus Plate"
            style={{ minWidth: '100%' }}
            rules={[
              {
                required: true,
                message: 'Bus Plate is required!',
                transform: (value) => value.trim(),
              },
            ]}
          >
            <Input name="busPlate" onChange={formik.handleChange} value={formik.values.busPlate}/>
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
            <Select value={formik.values.busTypeId} options={arrBusType?.map((item, index) => ({ key: index, label: item.name, value: item.id }))} onChange={handleChangeBusType} />
          </Form.Item>
          <Form.Item
            label="Station"
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
              defaultValue={defaultValue}
              onChange={handleChangeStation}
              options={options}
            />
          </Form.Item>
          <Form.Item label="Note">
            <TextArea name="note" allowClear rows={4} onChange={formik.handleChange} value={formik.values.note}/>
          </Form.Item>
          <Form.Item label="Action">
            <Button htmlType="submit" >Add Bus</Button>
          </Form.Item>
        </div>
      </div>

    </Form>
  );
};

export default EditBus;