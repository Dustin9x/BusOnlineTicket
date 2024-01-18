import { Button, Avatar, Popover } from 'antd';
import { TOKEN, USER_LOGIN } from '../../util/settings/config';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUserAction } from '../../redux/actions/UserAction';

export default function UserAvatar(props) {
    let { userLogin } = useSelector(state => state.UserReducer);
    console.log('userLogin123', userLogin)
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
            {(userLogin.role === 'Super') ? <Button type="text" className='w-full text-left' href="/admin/moviemng">Super Admin</Button> : ''}
            {(userLogin.role === 'QuanTri') ? <Button type="text" className='w-full text-left' href="/admin/moviemng">Admin Page</Button> : ''}
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
                : <div style={{ minWidth: '40px', minHeight: 40, backgroundSize: 'cover', borderRadius: '50%', backgroundImage: `url(${userLogin?.avatar})` }} />
            }
        </Button>
    </Popover>
}