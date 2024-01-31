import React, { Fragment, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { Button } from 'antd';
import _ from 'lodash';
import { TOKEN } from '../../../util/settings/config';
import { useDispatch, useSelector } from 'react-redux';
import UserAvatar from '../../../components/UserAvatar/UserAvatar';
import { getCurrentUserAction } from '../../../redux/actions/UserAction';

export default function Header(props) {
    let { userLogin } = useSelector(state => state.UserReducer);
    const dispatch = useDispatch();
    let accessToken = {}
    if (localStorage.getItem(TOKEN)) {
        accessToken = localStorage.getItem(TOKEN)
    }

    useEffect(() => {
        if (accessToken != null) {
            dispatch(getCurrentUserAction(accessToken))
        }
    }, [accessToken, dispatch]);

    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <Button type="link" href="/register" className="text-white">Sign Up</Button>
                <Button type="primary" href="/login" className="font-semibold rounded-full bg-red-400">Sign In</Button>
            </Fragment>
        } else {
            return <UserAvatar />
        }

    }

    return (
        <div>
            <header className="p-4  text-gray-100 w-full " style={{ backgroundColor: '#22577a' }}>
                <div className="container flex justify-between h-16 mx-auto">
                    <NavLink rel="noopener noreferrer" to="/" aria-label="Back to homepage" className="flex items-center p-2">
                        <div className='d-flex' >
                            <img src='/img/logo.png' alt='logo' style={{ width: '170px', height: '100%' }} />
                        </div>
                    </NavLink>
                    <ul className="w-full h-full text-right flex justify-end">
                        <li className="flex">
                            <NavLink to="/news" style={{ textDecoration: 'none' }} className="flex items-center font-medium -mb-0.5 border-b-2 px-4 border-transparent hover:text-red-400"><i className="fa-solid fa-newspaper mr-2"></i>Lastest News</NavLink>
                        </li>
                        <li className="flex">
                            <NavLink to="/registerDriver" style={{ textDecoration: 'none' }} className="flex items-center font-medium -mb-0.5 border-b-2 px-4 border-transparent hover:text-red-400"><i className="fa-solid fa-bus mr-2"></i> Become Our Driver</NavLink>
                        </li>
                        <li className="flex">
                            <div className="flex items-center font-medium -mb-0.5 border-b-2 px-4 border-transparent"><i className="fa-solid fa-phone mr-2"></i>Hotline: 19001800</div>
                        </li>
                    </ul>

                    <div className="items-center flex-shrink-0 hidden lg:flex">
                        {renderLogin()}
                    </div>
                    <button className="p-4 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-100">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </header>

        </div>
    )
}
