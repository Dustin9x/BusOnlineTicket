import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom'
import { Button, Avatar, Popover, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { TOKEN, USER_LOGIN } from '../../../util/settings/config';
import { history } from '../../../App';
import { useDispatch, useSelector } from 'react-redux';
import UserAvatar from '../../../components/UserAvatar/UserAvatar';

export default function Header(props) {
    let accessToken = {}
    if (localStorage.getItem(TOKEN)) {
        accessToken = localStorage.getItem(TOKEN)
    }
    

    const renderLogin = () => {
        if (_.isEmpty(accessToken)) {
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
                    <ul className="items-stretch hidden space-x-3 lg:flex ml-20">
                        <li className="flex">
                            <NavLink to="/home" style={{ textDecoration: 'none' }} className="flex items-center font-medium -mb-0.5 border-b-2 px-4 border-transparent hover:text-red-400" activeClassName="border-b-2 text-red-400">Home</NavLink>
                        </li>
                        <li className="flex">
                            <NavLink to="/news" style={{ textDecoration: 'none' }} className="flex items-center font-medium -mb-0.5 border-b-2 px-4 border-transparent hover:text-red-400" activeClassName="border-b-2 text-red-400">News</NavLink>
                        </li>
                        <li className="flex">
                            <NavLink to="/contact" style={{ textDecoration: 'none' }} className="flex items-center font-medium -mb-0.5 border-b-2 px-4 border-transparent hover:text-red-400" activeClassName="border-b-2 text-red-400">Contact Us</NavLink>
                        </li>

                    </ul>

                    <div className="items-center flex-shrink-0 hidden lg:flex">
                        <Input allowClear placeholder="Search" id='search' className='rounded-full mr-3' prefix={<SearchOutlined />} onPressEnter={(e) => {
                            if (e.target.value.trim() !== '') {
                                // dispatch(layKetQuaTimKiem(e.target.value));
                                history.push(`/search/?search=${e.target.value}`);
                                var url = new URL("http://localhost:3000/search/?search=hihi");
                                url.searchParams.set('search', e.target.value);
                            }
                        }} />
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
