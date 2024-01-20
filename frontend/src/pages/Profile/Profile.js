import React, { useEffect } from 'react';
import { Avatar, Button, Typography, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DOMAIN, TOKEN, USER_LOGIN } from '../../util/settings/config';
import { getCurrentUserAction, getUserByIdAction } from '../../redux/actions/UserAction';
const Profile = () => {
  const dispatch = useDispatch();
  const { userLogin } = useSelector(state => state.UserReducer);

  let accessToken = {}
  if (localStorage.getItem(TOKEN)) {
    accessToken = localStorage.getItem(TOKEN)
  }

  useEffect(() => {
    dispatch(getCurrentUserAction(accessToken))
  }, []);

  return (
    <div >
      <h3 className='mb-5'>User Information:</h3>
      <div className='row mx-10'>
        <div className='col-4'>
          {userLogin?.avatar == null || userLogin?.avatar == ""
            ? <Avatar size={200} style={{ fontSize: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={userLogin?.email?.substr(0, 1)} />
            : <div style={{ minWidth: '40px', minHeight: 40, width: 200, height: 200, backgroundSize: 'cover', borderRadius: '50%', backgroundImage: `url(${DOMAIN + "/Images/User/" + userLogin.avatar})` }} />
          }
        </div>
        <div className='col-8'>
          <div className='col-6'>
            <Typography>
              <pre>Account: {userLogin?.email}</pre>
            </Typography>
          </div>
          <div className='col-6'>
            <Typography>
              <pre>Full Name: {userLogin.fullname}</pre>
            </Typography>
          </div>
          <div className='col-6'>
            <Button href={`/users/edit/${userLogin?.id}`} className='btn-primary bg-primary mt-3 px-5' type='primary' onClick={() => {
              dispatch(getUserByIdAction(userLogin?.id))
            }}>Update Information</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;