import React, { useState } from 'react'
import { Button, Checkbox, DatePicker, Form, Input, Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { addDriverByUserAction } from '../../redux/actions/DriverAction';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { isBetween } from 'dayjs/plugin/isBetween';
dayjs.extend(customParseFormat);
const { Option } = Select;

export default function RegisterDriver(props) {
  const dateFormat = 'DD-MM-YYYY';
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
        dispatch(addDriverByUserAction(newDriver));
    }
})

  const dispatch = useDispatch();

  const handleChangeFile = (e) => {
    let file = e.target.files[0];

    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setImgSrc(e.target.result);//Hình base 64
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


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    
    <div className="py-8 px-8 bg-white rounded-2xl shadow-xl z-20" >
        <div><h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Sign Up</h1></div>
        <Form     onSubmitCapture={formik.handleSubmit}>
            <div style={{  display: "flex",  justifyContent: "space-between"}}>  
                <div
                      name="basic"
                      className='d-flex flex-col'
                      labelCol={{
                        span: 8,
                      }}
                      wrapperCol={{
                        span: 24,
                      }}
                      style={{
                        maxWidth: 350,
                        width: 350,
                        marginRight:10
                      }}
                      initialValues={{
                        remember: false,
                      }}
                    
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                  

                      <Form.Item
                        name="email"
                        label=""
                        rules={[
                          {
                            type: 'email',
                            message: 'E-mail is invalid!',
                          },
                          {
                            required: true,
                            message: 'E-mail is required!',
                            transform: (value) => value.trim(),
                          },
                        ]}
                      >
                        <Input name='email' onChange={formik.handleChange} className="d-flex block text-sm py-2.5 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Email" />
                      </Form.Item>

                      <Form.Item
                        label=""
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: 'Password is required!',
                            transform: (value) => value.trim(),
                          },
                        ]}
                      >
                        <Input.Password  className="d-flex block text-sm py-2.5 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Password" />
                      </Form.Item>

                      <Form.Item
                        name="password_confirmation"
                        label=""
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'Please re-enter your password!',
                            transform: (value) => value.trim(),
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('Password do not match, please try again!'));
                            },
                          }),
                        ]}
                      >
                        <Input.Password name="password" onChange={formik.handleChange} className="d-flex block text-sm py-2.5 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Password confirm" />
                      </Form.Item>

                      <Form.Item
                        label=""
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: 'Name is required!',
                            transform: (value) => value.trim(),
                          },
                        ]}
                      >
                        <Input  name="fullName" onChange={formik.handleChange} className="d-flex block text-sm py-2.5 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Fullname" />
                        
                      </Form.Item>

                    

                      <Form.Item label="Avatar" >
                          <input type="file" name='UploadImage' onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
                          <br />
                          {imgSrc ? <img style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: '50%' }} src={imgSrc} alt="..." /> : <img style={{ width: 200, height: 200, border: '0.1px solid #ccc', borderRadius: '50%' }} src='/img/placeholder-image.jpg' alt="..." />}
                      </Form.Item>
                </div>
                  <div
                  name="basic"
                  className='d-flex flex-col'
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  style={{
                    maxWidth: 350,
                    width: 350,
                    marginLeft:10
                  }}
                  initialValues={{
                    remember: false,
                  }}
          
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                
                  <Form.Item
                    name="Phone"
                    label=""
                    rules={[
                      {
                        required: true,
                        message: 'Phone is required!',
                        transform: (value) => value.trim(),
                      },
                    ]}
                  >
                    <Space.Compact  style={{ marginTop:"8px", height: '43px' }}  >
                    <Input  disabled style={{ width: '20%' }} value={"+84"} />
                    <Input name="phone" onChange={formik.handleChange} style={{ width: '80%' }} defaultValue="" />
                  </Space.Compact>
                </Form.Item>

                  
                    <Form.Item
                        label=""
                        name="National"
                        rules={[
                          {
                            required: true,
                            message: 'Name is required!',
                            transform: (value) => value.trim(),
                          },
                        ]}
                      >
                        <Input name='nationalId' style={{height:"44px"}} onChange={formik.handleChange}  className="d-flex block text-sm py-2.5 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="National" />
                        
                      </Form.Item>

                  
                      <Form.Item
                        label=""
                        name="Driver License"
                        rules={[
                          {
                            required: true,
                            message: 'Driver License is required!',
                            transform: (value) => value.trim(),
                          },
                        ]}
                      >
                        <Input name='driverLicense' style={{height:"44px"}} onChange={formik.handleChange} className="d-flex block text-sm py-2.5 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Driver License" />
                        
                      </Form.Item>

                  <Form.Item
                    label=""
                    name="Place Of Birth"
                    rules={[
                      {
                        required: true,
                        message: 'Place is required!',
                        transform: (value) => value.trim(),
                      },
                    ]}
                  >
                    <Input name='placeOfBirth' style={{height:"43px"}} onChange={formik.handleChange} className="d-flex block text-sm py-2.5 px-4 mt-2 rounded-lg w-full border outline-none" placeholder="Place Of Birth" />
                    
                  </Form.Item>
                  <Form.Item
                    >
                          <DatePicker format={dateFormat} onChange={onChangeDate} onOk={onOk} style={{height:"44px" , marginRight:'58px'}} />
                          <Select name='enabled' style={{width:"40%",height:"44px"}} onChange={handleChangeEnabled} placeholder="Option Enabled">
                              <Option value={true}>Enable</Option>
                              <Option value={false}>Disable</Option>
                          </Select>
                      </Form.Item>

                      <Form.Item   name="note" >
                          <Input name='note'style={{height:"43px"}} onChange={formik.handleChange} placeholder="Note" />
                      </Form.Item>
                      
                  <div className="text-center">
                    <button htmlType='submit' className="py-2 w-64 text-base text-white bg-red-400 rounded-full">Sign Up</button>
                    <div className="mt-2 text-sm">Already registered? <a href='loginDriver' className="underline  cursor-pointer"> Sign In</a></div>
                  </div>
                </div>
              </div>
        </Form>
         
        
    </div>
  )
}
