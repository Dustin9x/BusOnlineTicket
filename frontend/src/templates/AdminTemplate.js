import { Fragment, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { HomeOutlined, UserOutlined, BuildFilled, QuestionOutlined, LineChartOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button } from 'antd';
import { Avatar, Popover } from 'antd';
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { TOKEN, USER_LOGIN } from "../util/settings/config";
import { history } from "../App";
import UserAvatar from "../components/UserAvatar/UserAvatar";
import { getCurrentUserAction } from "../redux/actions/UserAction";
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}


export const AdminTemplate = (props) => { //path, exact, Component
  const dispatch = useDispatch();
  let { userLogin } = useSelector(state => state.UserReducer);
  const { Component, ...restProps } = props;
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer }, } = theme.useToken();

  const selectedKeys = ['/admin/busmng', '/admin/stationmng', '/admin/theatremng', '/admin/theatrechildmng', '/admin/users',]
  const selectedKey = (selectedKeys.indexOf(props.path) + 1).toString();


  let accessToken = {}
  if (localStorage.getItem(TOKEN)) {
    accessToken = localStorage.getItem(TOKEN)
  } else {
    history.replace('/')
  }

  useEffect(() => {
    dispatch(getCurrentUserAction(accessToken))
    window.scrollTo(0, 0);
  }, [dispatch])

  if (userLogin && (userLogin?.role !== 'Admin' && userLogin?.role !== 'Mod')) {
    history.replace('/')
  }



  const itemsAdmin = [
    getItem('Bus Management', 'sub1', <UserOutlined />, [
      getItem('Bus Management', '1', <NavLink className='text-decoration-none' to="/admin/busmng"><i className="fas fa-bus f3"></i></NavLink>),
      getItem('Bus Type Management', '2', <NavLink className='text-decoration-none' to="/admin/bustypemng"><i className="fas fa-bus f3"></i></NavLink>),
    ]),
    getItem('Station Management', '3', <NavLink className='text-decoration-none' to="/admin/stationmng"><i className="fa-solid fa-location-dot"></i></NavLink>),
    getItem('Trip Management', '4', <NavLink className='text-decoration-none' to="/admin/tripmng"><BuildFilled /></NavLink>),
    getItem('Top Route Management', '5', <NavLink className='text-decoration-none' to="/admin/promotripmng"><BuildFilled /></NavLink>),
    getItem('User Management', 'sub2', <UserOutlined />, [
      getItem('Moderator', '6', <NavLink className='text-decoration-none' to="/admin/modmng"><UserOutlined /></NavLink>),
      getItem("Customer", "7", <NavLink className="text-decoration-none" to="/admin/adminusers"><UserOutlined /></NavLink>),
    ]),
    getItem('Driver Management', 'sub3', <UserOutlined />, [
      getItem('Drivers', '8', <NavLink className='text-decoration-none' to="/admin/drivermng"><UserOutlined /></NavLink>),
      getItem("Register Drivers", "9", <NavLink className="text-decoration-none" to="/admin/regdrivermng"><UserOutlined /></NavLink>),
    ]),
    getItem('Revenue', 'sub4', <LineChartOutlined />, [
      getItem('Danh Sách Đơn Hàng', '10', <NavLink className='text-decoration-none' to="/admin/orderlist"><LineChartOutlined /></NavLink>),
      getItem('Revenue By Month', '11', <NavLink className='text-decoration-none' to="/admin/revenuemonth"><LineChartOutlined /></NavLink>),
      getItem('Revunue By Route', '12', <NavLink className='text-decoration-none' to="/admin/revenuemovie"><LineChartOutlined /></NavLink>),
    ]),
    getItem('FAQ Management', '13', <NavLink className='text-decoration-none' to="/admin/faqmng"><QuestionOutlined /></NavLink>),
  ]


  const itemsMod = [
    getItem('Bus Management', '1', <NavLink className='text-decoration-none' to="/admin/busmng"><i className="fas fa-bus f3"></i></NavLink>),
    getItem('Station Management', '3', <NavLink className='text-decoration-none' to="/admin/stationmng"><i className="fa-solid fa-location-dot"></i></NavLink>),
    getItem('Trip Management', '4', <NavLink className='text-decoration-none' to="/admin/tripmng"><BuildFilled /></NavLink>),
    getItem('Promote Trip Management', '5', <NavLink className='text-decoration-none' to="/admin/promotripmng"><BuildFilled /></NavLink>),
    getItem('Drivers', '8', <NavLink className='text-decoration-none' to="/admin/drivermng"><UserOutlined /></NavLink>),
    getItem('FAQ Management', '13', <NavLink className='text-decoration-none' to="/admin/faqmng"><QuestionOutlined /></NavLink>),
  ]



  const operations = <Fragment>
    <div className="d-flex">
      <Button type="link" href="/"><HomeOutlined style={{ fontSize: '24px' }} /></Button>
      <UserAvatar />
    </div>
  </Fragment>

  return <Route {...restProps} render={(propsRoute, index) => {
    return <Fragment key={index}>
      <Layout style={{ minHeight: '100vh', }}>
        <Sider collapsible width={300} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical text-white text-2xl text-center my-10" >Admin Page</div>
          <Menu theme="dark" defaultSelectedKeys={selectedKey} mode="inline" items={userLogin?.role === "Admin" ? itemsAdmin : itemsMod} />
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
          <Content style={{ margin: '16px' }} >
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, }} >
              <Component {...propsRoute} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  }} />
}