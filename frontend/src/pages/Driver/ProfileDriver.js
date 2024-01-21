import React, { useEffect, useState } from 'react';
import { Avatar, Button, Checkbox, Form, Input, Typography, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// import { layThongTinNguoiDungAction } from '../../redux/actions/DriverAction';
import { DOMAIN, USER_LOGIN } from '../../util/settings/config';
import { getDriverByIdAction, updateDriver } from '../../redux/actions/DriverAction';
import { useFormik } from 'formik';
import { history } from '../../App';


const ProfileDriver = () => {
  const dispatch = useDispatch();
  const { driverDetail } = useSelector(state => state.DriverReducer);
  let id = {}
  if (localStorage.getItem("driverId")) {
    id = JSON.parse(localStorage.getItem("driverId"))
  } else {
    history.push("/loginDriver")

  }
  console.log('Id', id)
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    dispatch(getDriverByIdAction(id))
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: driverDetail?.fullName,
      nationalId: driverDetail?.nationalId,
      driverLicense: driverDetail?.driverLicense,
      password: "",
      phone: driverDetail?.phone,
      email: driverDetail?.email,
      yearOfBirth: driverDetail?.yearOfBirth,
      placeOfBirth: driverDetail?.placeOfBirth,
      note: driverDetail?.note,
      enabled: driverDetail?.enabled,
      avatar: driverDetail?.avatar,
      trips: [{ id: 0 }]
    },
    onSubmit: async (values) => {
      let newDriver = new FormData();
      for (let key in values) {
        if (key !== "avatar") {
          newDriver.append(key, values[key]);
        } else {
          newDriver.append("avatar", values["avatar"]);
        }
      }
      console.table("newDriver", [...newDriver]);
      dispatch(updateDriver(id, newDriver));
    },
  });
  const profile = driverDetail;
  console.log('profile', profile)


  const onChangeCheck = (e) => {
    setChecked("check: ", e.target.checked);

  };

  const handleChangePass = (e) => {
    // setNewPassword(e.target.value)
  }

  return (
    <div >
      <h3 className='mb-5'>Infomation: {profile?.email}</h3>
      <div className='row mx-10'>
        <div className='col-4'>
          {/* {profile.avatar ? <img style={{width:200, height:200, objectFit: 'cover', borderRadius: '50%'}} src={profile.avatar} alt={profile.avatar} /> : <Avatar size={200} style={{ fontSize: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={userLogin.name.substr(0, 1)} />} */}
          {profile?.avatar == null || profile?.avatar == ""
            ? <Avatar size={200} style={{ fontSize: '200px', lineHeight: '170px' }} icon={"H"} />
            : <div style={{ minWidth: '40px', minHeight: 40, width: 200, height: 200, backgroundSize: 'cover', borderRadius: '50%', backgroundImage: `url(${DOMAIN + "/Images/Driver/" + profile?.avatar})` }} />
          }
        </div>
        <div className='col-4'>
          <div className='col-12'>
            {/* <Typography>
              <pre>Tên Đăng Nhập: {profile?.email}</pre>
            </Typography> */}
          </div>
          <div className='col-12'>
            <Typography>
              <pre>Email: {profile?.email}</pre>
            </Typography>
          </div>
          <div className='col-12'>
            <Typography>
              <pre>Phone: {profile?.phone}</pre>
            </Typography>
          </div>
          <div className='col-12'>
            <Typography>
              <pre>Full Name: {profile.fullName}</pre>
            </Typography>
          </div>
          <div className='col-12'>
            <Typography>
              <pre>National Id: {profile.nationalId}</pre>
            </Typography>
          </div>
          <div className='col-12'>
            <Typography>
              <pre>Driver License: {profile.driverLicense}</pre>
            </Typography>
          </div>
          <div className='col-12'>
            <Form.Item label="Change password?">
              <Checkbox checked={checked} onChange={onChangeCheck}></Checkbox>
            </Form.Item>

            {checked ? (
              <div className='col-12'>
                <Form labelCol={{ span: 4, }} wrapperCol={{ span: 14, }} layout="horizontal" onSubmitCapture={formik.handleSubmit} >
                  <Form.Item rules={[{
                    required: true,
                    message: "Password  cannot be blank!",
                  },]}  >
                    <Input.Password name="password" onChange={formik.handleChange} value={formik.values.password} placeholder="Password" />
                  </Form.Item>
                  <Form.Item label="Action">
                    <Button htmlType="submit" className="btn-primary bg-primary" type="primary" > Change</Button>
                  </Form.Item>
                </Form>
              </div>
            ) : (
              ""
            )}
          </div>


        </div>
        <div className='col-4'>

          <div className='col-12'>
            <Typography>
              <pre>YOB: {profile.yearOfBirth}</pre>
            </Typography>
          </div>
          <div className='col-12'>
            <Typography>
              <pre>Place of birth: {profile.placeOfBirth}</pre>
            </Typography>
          </div>
          <div className='col-12'>
            <Typography>
              <pre>Enabled: {profile.enabled ? "true" : "false"}</pre>
            </Typography>
          </div>
          <div className='col-12'>
            <Typography>
              <pre>Type account: Driver</pre>
            </Typography>
          </div>
          <div className='col-12'>
            <Typography>
              <pre>Note: {profile.note}</pre>
            </Typography>
          </div>

        </div>
      </div>
    </div>
  );
};


export default ProfileDriver;