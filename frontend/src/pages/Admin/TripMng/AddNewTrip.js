import React, { useEffect, useState } from 'react'
import { Form, Button, Select, Input, notification, DatePicker } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getBusListAction } from '../../../redux/actions/BusAction';
import { getStationListAction } from '../../../redux/actions/StationAction';
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import { addNewTripAction } from '../../../redux/actions/TripAction';
import { getDriverAction } from '../../../redux/actions/DriverAction';
dayjs.extend(isBetween)
dayjs.extend(customParseFormat);



const FromTo={
  from:0,
  to:0,
}
export default function AddNewTrip(props) {
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState('')
  const [arrBusNew, setArrBusNew] = useState(null)
  const [arrBusNewEnd, setArrBusNewEnd] = useState(null)
  const [arrDriverNew, setArrDriverNew] = useState(null)
  let { arrBus } = useSelector(state => state.BusReducer);
  let { arrStation } = useSelector(state => state.StationReducer);
  let { arrDriver } = useSelector(state => state.DriverReducer);
  const dateFormat = 'DD-MM-YYYY';
  const { RangePicker } = DatePicker;



  useEffect(() => {
    dispatch(getBusListAction())
    dispatch(getStationListAction())
    dispatch(getDriverAction())
  }, [dispatch]);
  const formik = useFormik({
    initialValues: {
      startTime: '',
      finishTime: '',
      ticketPrice: '',
      busId: '',
      driverId: '',
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
  const handleChangeFromStation = (value,data) => {
    formik.setFieldValue('fromStationId', value)
    FromTo.from=value;
    if(formik.values.startTime==""||formik.values.finishTime==""){
      alert("Please enter Start and Finish Time!!!")
      const focus = document.getElementById('date');
      focus.focus();
    return;
    }
    

    setArrBusNewEnd ( arrBusNew.filter((item) => item.stationId==FromTo.from||item.stationId==FromTo.to ));
  };
  const handleChangeToStation = (value, data) => {
    FromTo.to=value;
    formik.setFieldValue('toStationId', value)
    if(formik.values.startTime==""||formik.values.finishTime==""){
      alert("Please enter Start and Finish Time!!!")
      const focus = document.getElementById('date');
      focus.focus();
    return;
    }

    FromTo.to=value;
    formik.setFieldValue('toStationId', value)

    setArrBusNewEnd ( arrBusNew.filter((item) => item.stationId==FromTo.from||item.stationId==FromTo.to ));
  };

  const handleChangeDriver = (value) => {
    formik.setFieldValue('driverId', value)
  };

  const onChangeDate = (value, dateString) => {
    if(dateString[0]===""){
      setArrBusNewEnd(null)
    }
    formik.setFieldValue('startTime', dateString[0])
    formik.setFieldValue('finishTime', dateString[1])
 
    setArrDriverNew ( arrDriver.filter((item) => 
             item.trips.filter((item2)=> ( (dayjs(item2.startTime).isBetween(dayjs(dateString[0]),dayjs(dateString[1]))  
               ||  dayjs(item2.finishTime).isBetween(dayjs(dateString[0]),dayjs(dateString[1])))  )).length >0 ?false:true  )  
      );



    setArrBusNew ( arrBus.filter((item) => 
       item.trips.filter((item2)=> ( (dayjs(item2.startTime).isBetween(dayjs(dateString[0]),dayjs(dateString[1]))  
        ||  dayjs(item2.finishTime).isBetween(dayjs(dateString[0]),dayjs(dateString[1])))  )).length >0 ?false:true  )  
      );

      if((FromTo.from!=0 || FromTo.to!=0)&& arrBusNew!=null){
        setArrBusNewEnd ( arrBusNew.filter((item) => item.stationId==FromTo.from||item.stationId==FromTo.to ));
      }
    
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
          id='date'
            showTime={{
              format: 'HH:mm',
            }}
            format="YYYY-MM-DD HH:mm"
            onChange={onChangeDate}
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
          <Select options={ arrStation?.map((item, index) =>({ key: index, label: item?.name, value: item.id }))} onChange={handleChangeFromStation} placeholder='Please enter Start and Finish Time!!' />
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
          <Select options={arrStation?.map((item, index) => ({ key: index, label: item.name, value: item.id }))} onChange={handleChangeToStation} placeholder='Please enter Start and Finish Time!!' />
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
          <Select placeholder="Please enter Station, Start and Finish time!!" options={arrBusNewEnd!=null? arrBusNewEnd?.map(( item, index) => ( { key: index, label: item.busPlate, value: item.id })) :arrBusNewEnd?.map(( item, index) => ( { key: index, label: item.busPlate, value: item.id }))} onChange={handleChangeBus} />
        </Form.Item>

        <Form.Item
          label="Assigned Driver"
          style={{ minWidth: '100%' }}
          rules={[
            {
              required: true,
              message: 'Driver is required!',
              transform: (value) => value.trim(),
            },
          ]}
        >
          <Select placeholder="Please enter Start Date and End Date!!" options={arrDriverNew?.map((item, index) => ({ key: index, label: item.fullName, value: item.id }))} onChange={handleChangeDriver} />
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
          <Button htmlType="submit" >Add Trip</Button>
        </Form.Item>
      </div>

    </Form>
  )
}