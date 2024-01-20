import { Button, Avatar, Popover } from 'antd';
import { DOMAIN, TOKEN, USER_LOGIN } from '../../util/settings/config';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUserAction } from '../../redux/actions/UserAction';

export default function UserAvatar(props) {
    let { userLogin } = useSelector(state => state.UserReducer);
    const dispatch = useDispatch();
    
    let accessToken = {}
    if (localStorage.getItem(TOKEN)) {
        accessToken = localStorage.getItem(TOKEN)
    }

    useEffect(() => {
        dispatch(getCurrentUserAction(accessToken))
    }, []);

    const content = (
        <div style={{ width: 200 }}>
            {(userLogin?.role == 'Admin') ? <Button type="text" className='w-full text-left' href="/admin/tripmng">Super Admin</Button> : ''}
            {(userLogin?.role == 'Mod') ? <Button type="text" className='w-full text-left' href="/admin/tripmng">Admin Page</Button> : ''}
            <Button type="text" href="/users/profile" className='w-full text-left'>Profile</Button>
            <Button type="text" href="/home" className='w-full text-left' onClick={() => {
                localStorage.removeItem(TOKEN)
                window.location.reload()
            }}>Logout</Button>
        </div>
    );

    return <Popover placement="bottomRight" title={userLogin.email} content={content} trigger="click">
        <Button className='rounded-full bg-slate-300 p-0 d-flex justify-center items-center w-full h-full' style={{ width: 40, height: 40 }}>
            {userLogin?.avatar == null || userLogin?.avatar == ""
                ? <Avatar size={40} style={{ fontSize: '28px', lineHeight: '32px' }} icon={userLogin?.email?.substr(0,1)} />
                : <div style={{ minWidth: 40, minHeight: 40, backgroundSize: 'cover', borderRadius: '50%', backgroundImage: `url(${DOMAIN + "/Images/User/" + userLogin.avatar})` }} />
            }
        </Button>
    </Popover>
}