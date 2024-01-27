import React, { useState } from 'react';
import { Form, Input, Button,  Select, DatePicker } from 'antd';
import { addDriverAction } from '../../../redux/actions/DriverAction';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const { Option } = Select;



const AddDriver = () => {
    const dateFormat = 'DD-MM-YYYY';

    const dispatch = useDispatch();
    const [imgSrc, setImgSrc] = useState('');
    const formik = useFormik({
        initialValues: {
            fullName: '',
            nationalId: '',
            driverLicense: '',
            phone: '',
            email: '',
            password: '',
            yearOfBirth: '',
            placeOfBirth: '',
            note: '',
            enabled: '',
            isApprove:true,
            UploadImage: '',
            trips:[{id:0}]
        },
        onSubmit: async (values) => {
            let newDriver = new FormData();
            for (let key in values) {
                if(key !== "UploadImage"){
                    newDriver.append(key, values[key]);
                } else {
                    newDriver.append('UploadImage', values['UploadImage']);
                }
            }
            console.table('newDriver', [...newDriver])
            dispatch(addDriverAction(newDriver));
        }
    })

    const handleChangeFile = (e) => {
        let file = e.target.files[0];

        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImgSrc(e.target.result);
            }
            formik.setFieldValue('UploadImage', file);
        }
    }

    const handleChangeEnabled = (value) => {
        formik.setFieldValue('enabled', value)
    }

    const onOk = (values) => {
        let yearOfBirth = dayjs(values).format('YYYY-MM-DD');
        formik.setFieldValue('yearOfBirth', yearOfBirth);
    }

    const onChangeDate = (values) => {
        let yearOfBirth = dayjs(values).format('YYYY-MM-DD');
        formik.setFieldValue('yearOfBirth', yearOfBirth);
    }
    const disabledDate = (current) => {
        return current && current.add(18, 'year') > dayjs().endOf('day');
      };
    
    return (
        <div >
            <h3>Add New Driver</h3>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                onSubmitCapture={formik.handleSubmit}
            >
                <Form.Item label="Avatar">
                    <input type="file" name='UploadImage' onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
                    <br />
                    {imgSrc ? <img style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: '50%' }} src={imgSrc} alt="..." /> : <img style={{ width: 200, height: 200, border: '0.1px solid #ccc', borderRadius: '50%' }} src='/img/placeholder-image.jpg' alt="..." />}
                </Form.Item>
                
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: 'FullName can not be blank!',
                        },
                    ]}
                >
                    <Input name='fullName' onChange={formik.handleChange} placeholder="Full Name" />
                </Form.Item>

                <Form.Item
                    label="ID Nationnal"
                    name="nationalId"
                    rules={[
                        {
                            required: true,
                            message: 'ID Nationnal can not be blank!',
                        },
                    ]}
                >
                    <Input name='nationalId' onChange={formik.handleChange} placeholder="ID Nationnal" />
                </Form.Item>
                
                <Form.Item
                    label="Driver License"
                    name="driverLicense"
                    rules={[
                        {
                            required: true,
                            message: 'Driver License can not be blank!',
                        },
                    ]}
                >
                    <Input name='driverLicense' onChange={formik.handleChange} placeholder="Driver License" />
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Phone can not be blank!',
                        },
                    ]}
                >
                    <Input name='phone' type='number' onChange={formik.handleChange} placeholder="Phone" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                            message: 'E-mail is not format!',
                        },
                        {
                            required: true,
                            message: 'E-mail can not be blank!',
                        },
                    ]}
                >
                    <Input name='email' onChange={formik.handleChange} placeholder="Email" />
                </Form.Item>

                <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: 'Password is required!',
                            transform: (value) => value.trim(),
                          },
                        ]}
                      >
                        <Input.Password name='password' onChange={formik.handleChange} placeholder="Password" />
                      </Form.Item>
                <Form.Item    label="Year Of Birth"
                            rules={[
                                {
                                    required: true,
                                    message: 'Year Of Birth can not be blank!',
                                },
                            ]} >
                          <DatePicker disabledDate={disabledDate} defaultValue={dayjs(dayjs().endOf("day").subtract(18, 'year'), dateFormat)} format={dateFormat} onChange={onChangeDate} onOk={onOk} size='middle'  />
                     </Form.Item>

                    
                <Form.Item
                    label="Place Of Birth"
                    name="placeOfBirth"
                    rules={[
                        {
                            required: true,
                            message: 'Place Of Birth can not be blank!',
                        },
                    ]}
                >
                    <Input name='placeOfBirth' onChange={formik.handleChange} placeholder="Place Of Birth" />
                </Form.Item>

                <Form.Item
                    label="Note"
                    name="note"
                >
                    <Input name='note' onChange={formik.handleChange} placeholder="Note" />
                </Form.Item>
                

                <Form.Item
                    name="enabled"
                    label="Enabled"
                    rules={[
                        {
                            required: true,
                            message: 'Enabled can not be blank!',
                        },
                    ]}
                >
                    <Select name='enabled' onChange={handleChangeEnabled} placeholder="Option Enabled">
                        <Option value={true}>Enable</Option>
                        <Option value={false}>Disable</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Action">
                    <Button htmlType='submit' className='btn-primary bg-primary' type='primary' >Add Driver</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddDriver;