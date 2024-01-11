import React, { useEffect } from 'react'
import { Form, Button, Select, Input, notification } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachTinhThanhAction, themCumRapAction } from '../../../redux/actions/QuanLyRapAction';

export default function AddNewTrip(props) {
    let { tinhThanh } = useSelector(state => state.RapReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layDanhSachTinhThanhAction())
    }, [dispatch])
    const formik = useFormik({
        initialValues: {
            startTime: '',
            finishTime: '',
            ticketPrice: '',
            busId: '',
            fromStationId: '',
            toStationId: '',
            bus: []
        },
        onSubmit: async (values) => {
            if (values.startTime == '' || values.finishTime == '' || values.ticketPrice == '') {
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
                dispatch(themCumRapAction(formData));
            }
            
        }
    })


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
            {/* <Select options={arrBusType?.map((item, index) => ({ key: index, label: item.name, value: item.id }))} onChange={handleChangeBusType} /> */}
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
              placeholder="Please select"
              onChange={""}
              options={""}
            />
          </Form.Item>
          <Form.Item label="Action">
            <Button htmlType="submit" >Add Bus</Button>
          </Form.Item>
        </div>
      </div>

    </Form>
    )
}