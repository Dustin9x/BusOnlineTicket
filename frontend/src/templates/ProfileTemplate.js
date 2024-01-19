import { Fragment, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { HomeOutlined, SmileOutlined, HistoryOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button, Avatar, Popover } from 'antd';
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { TOKEN, USER_LOGIN } from "../util/settings/config";
import { history } from "../App";
import UserAvatar from "../components/UserAvatar/UserAvatar";
// import { layThongTinNguoiDungAction } from "../redux/actions/DriverAction";
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}



export const ProfileTemplate = (props) => { //path, exact, Component
  const dispatch = useDispatch();
  const { Component, ...restProps } = props;
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer }, } = theme.useToken();
  
  const selectedKeys = ['/users/profile', '/users/ordershistory']
  const selectedKey = (selectedKeys.indexOf(props.path) + 1).toString();

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dispatch])


  // if (!localStorage.getItem(USER_LOGIN)) {
  //   alert('Bạn không có quyền truy cập trang này!')
  //   history.push('/')
  // }

  const items = [
    getItem('Thông Tin Cá Nhân', '1', <NavLink className='text-decoration-none' to="/users/profile"><SmileOutlined /></NavLink>),
    getItem('Lịch Sử Mua Vé', '2', <NavLink className='text-decoration-none' to="/users/ordershistory"><HistoryOutlined /></NavLink>),
  ];

  const operations = <Fragment>
  <div className="d-flex">
    <Button type="link" href="/"><HomeOutlined style={{ fontSize: '24px' }} /></Button>
    <UserAvatar/>
  </div>
</Fragment>


  return <Route {...restProps} render={(propsRoute) => { //props.location, props.history, props.match
    return <Fragment>
      <Layout style={{ minHeight: '100vh' }} >
        <Sider width={300} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical text-white text-2xl text-center my-10" >Trang Cá Nhân</div>
          <Menu theme="dark" defaultSelectedKeys={selectedKey} mode="inline" items={items} />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
              paddingRight: '30px'
            }}
          >
            <div>{operations}</div>
          </Header>
          <Content
            style={{
              margin: '16px',
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              <Component {...propsRoute} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  }} />
}