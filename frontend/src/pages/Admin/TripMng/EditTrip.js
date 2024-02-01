import React, { useEffect, useState } from 'react'
import { Form, Button, Select, Input, DatePicker } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getEnableBusListAction } from '../../../redux/actions/BusAction';
import { getStationListAction } from '../../../redux/actions/StationAction';
import { getDriverAction } from '../../../redux/actions/DriverAction';
import { getTripByIdAction, updateTripAction } from '../../../redux/actions/TripAction';
import dayjs from 'dayjs';
import { DOMAIN } from '../../../util/settings/config';

export default function EditTrip(props) {
    const dispatch = useDispatch();
    const [imgSrc, setImgSrc] = useState('')
    const { RangePicker } = DatePicker;
    const { tripDetail } = useSelector(state => state.TripReducer);
    let { arrEnableBus } = useSelector(state => state.BusReducer);
    let { arrStation } = useSelector(state => state.StationReducer);
    let { arrDriver } = useSelector(state => state.DriverReducer);
    const [arrDriverNew, setArrDriverNew] = useState(null)
    const [arrEnableBusNew, setArrEnableBusNew] = useState(null)
    let { id } = props.match.params;
    useEffect(() => {
        dispatch(getTripByIdAction(id))
        dispatch(getEnableBusListAction())
        dispatch(getStationListAction())
        dispatch(getDriverAction())
    }, [dispatch])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            startTime: tripDetail.startTime,
            finishTime: tripDetail.finishTime,
            ticketPrice: tripDetail.ticketPrice,
            busId: tripDetail.busId,
            driverId: tripDetail.driverId,
            fromStationId: tripDetail.fromStationId,
            toStationId: tripDetail.toStationId,
            image: tripDetail.image,
        },
        onSubmit: async (values) => {
            let formData = new FormData();
            for (let key in values) {
                formData.append(key, values[key]);
            }
            console.table('formData', [...formData])
            dispatch(updateTripAction(id, formData));
        }
    })

    const handleChangeBus = (value) => {
        formik.setFieldValue('busId', value)
    }
    const handleChangeFromStation = (value, data) => {
        formik.setFieldValue('fromStationId', value)
    };
    const handleChangeToStation = (value, data) => {
        formik.setFieldValue('toStationId', value)
    };

    const handleChangeDriver = (value) => {
        formik.setFieldValue('driverId', value)
    };

    const onChangeDate = (value) => {
        formik.setFieldValue('startTime', value[0]);
        formik.setFieldValue('finishTime', value[1]);
        setArrDriverNew(arrDriver.filter((item) =>
            item.trips.filter((item2) => ((dayjs(item2.startTime).isBetween(dayjs(value[0]), dayjs(value[1]))
                || dayjs(item2.finishTime).isBetween(dayjs(value[0]), dayjs(value[1]))))).length > 0 ? false : true))
        setArrEnableBusNew(arrEnableBus.filter((item) =>
            item.trips.filter((item2) => ((dayjs(item2.startTime).isBetween(dayjs(value[0]), dayjs(value[1]))
                || dayjs(item2.finishTime).isBetween(dayjs(value[0]), dayjs(value[1]))))).length > 0 ? false : true))
    };

    const onOk = (value) => {
        formik.setFieldValue('startTime', value[0]);
        formik.setFieldValue('finishTime', value[1]);
        setArrDriverNew(arrDriver.filter((item) =>
            item.trips.filter((item2) => ((dayjs(item2.startTime).isBetween(dayjs(value[0]), dayjs(value[1]))
                || dayjs(item2.finishTime).isBetween(dayjs(value[0]), dayjs(value[1]))))).length > 0 ? false : true))
        setArrEnableBusNew(arrEnableBus.filter((item) =>
            item.trips.filter((item2) => ((dayjs(item2.startTime).isBetween(dayjs(value[0]), dayjs(value[1]))
                || dayjs(item2.finishTime).isBetween(dayjs(value[0]), dayjs(value[1]))))).length > 0 ? false : true))
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
        <div className="container">
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
                            disabledDate={d => d.isBefore(dayjs())}
                            showTime={{
                                format: 'HH:mm',
                            }}
                            defaultValue={[dayjs(formik.values.startTime), dayjs(formik.values.finishTime)]}
                            format="DD-MM-YYYY h:mm A"
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
                        <Input name="ticketPrice" type='number' prefix={"$"} onChange={formik.handleChange} value={formik.values.ticketPrice} />
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
                        <Select options={arrStation?.filter(x => x.id != formik.values.toStationId).map((item, index) => ({ key: index, label: item?.name, value: item.id }))} onChange={handleChangeFromStation} value={formik.values.fromStationId} placeholder='Please select From Station' />
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
                        <Select options={arrStation?.filter(x => x.id != formik.values.fromStationId).map((item, index) => ({ key: index, label: item.name, value: item.id }))} onChange={handleChangeToStation} value={formik.values.toStationId} placeholder='Please select To Station' />
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
                        <Select placeholder="Assign bus for this trip" options={
                            arrEnableBusNew?.filter(({ stations }) =>
                                stations.some(x => x.id == formik.values.fromStationId)).map((item, index) =>
                                    ({ key: index, label: item.busPlate + " (" + item.busType.name + ")", value: item.id })
                                )}
                            onChange={handleChangeBus} value={formik.values.busId} />
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
                        <Select placeholder="Assign driver for this trip" options={arrDriverNew?.map((item, index) => ({ key: index, label: item.fullName, value: item.id }))} value={formik.values.driverId} onChange={handleChangeDriver} />
                    </Form.Item>

                    <Form.Item label="Image" style={{ minWidth: '100%' }}>
                        <input type="file" name="UploadImage" onChange={handleChangeFile} accept="image/png, image/jpeg, image/png" />
                        <br />
                        <img style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: '50%' }} src={imgSrc === '' ? `${DOMAIN}/Images/Trip/${formik.values.image}` : imgSrc} alt="..." />
                    </Form.Item>
                    <Form.Item label="Action" style={{ minWidth: '100%' }}>
                        <Button htmlType="submit">Update Trip</Button>
                    </Form.Item>
                </div>

            </Form>
        </div>
    )
}