import logo from './logo.svg';
import './App.css';
import { createBrowserHistory } from 'history';
import { Switch, Router } from 'react-router-dom';

import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Detail from './pages/Detail/Detail';
import { MovieTemplate } from './templates/HomeTemplate/MovieTemplate';
import CheckOutTemplate from './templates/CheckOutTemplate';
import Checkout from './pages/Checkout/Checkout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

import UserTemplate from './templates/UserTemplate';
import Loading from './components/Loading/Loading';
import { AdminTemplate } from './templates/AdminTemplate';
import AddNew from './pages/Admin/BusMng/AddNewBus';
import Edit from './pages/Admin/BusMng/Edit';
import ShowTime from './pages/Admin/BusMng/ShowTime';
import UserMng from './pages/Admin/UserMng/AdminUserMng';
import UserEdit from './pages/Admin/UserMng/UserEdit';
import AddUser from './pages/Admin/UserMng/AddUser';
import Profile from './pages/Profile/Profile';
import {ProfileTemplate} from './templates/ProfileTemplate';
import OrderHistory from './pages/Admin/UserMng/OrderHistory';
import EditTheatreChild from './pages/Admin/TheatreChildMng/EditTheatreChild';
import Search from './pages/Search/Search';
import FeedbackMng from './pages/Admin/FeedbackMng/FeedbackMng';
import EditFeedback from './pages/Admin/FeedbackMng/EditFeedback';
import AdminUserMng from './pages/Admin/UserMng/AdminUserMng';
import RevenueMonth from './pages/Admin/Revenue/RevenueMonth';
import RevenueMovie from './pages/Admin/Revenue/RevenueMovie';
import UserOrder from './pages/Admin/UserMng/UserOrder';
import OrderList from './pages/Admin/Revenue/OrderList';
import AboutUs from './pages/AboutUs/AboutUs';
import Recruitment from './pages/Recruitment/Recruitment';
import GeneralTerms from './pages/Terms/GeneralTerms';
import TermsOfTransaction from './pages/Terms/TermsOfTransaction';
import ForgetPassword from './pages/Login/ForgetPassword';
import BusMng from './pages/Admin/BusMng/BusMng';
import StationMng from './pages/Admin/StationMng/StationMng';
import DriverMng from './pages/Admin/UserMng/DriverMng';
import AddTheatreChild from './pages/Admin/TheatreChildMng/AddTheatreChild';
import TripMng from './pages/Admin/TheatreChildMng/TripMng';
import { Alert, Space } from 'antd';
import AddNewBus from './pages/Admin/BusMng/AddNewBus';
import BusTypeMng from './pages/Admin/BusMng/BusTypeMng/BusTypeMng';
import AddNewBusType from './pages/Admin/BusMng/BusTypeMng/AddNewBusType';
import EditBusType from './pages/Admin/BusMng/BusTypeMng/EditBusType';


export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading/>
      
      <Switch>
        <HomeTemplate path='/home' exact Component={Home} />
        <HomeTemplate path='/contact' exact Component={Contact} />
        <MovieTemplate path='/detail/:id' exact Component={Detail} />
        <CheckOutTemplate path='/checkout/:id' exact Component={Checkout} />

        {/* Footer */}
        <HomeTemplate path='/about' exact Component={AboutUs} />
        <HomeTemplate path='/recruitment' exact Component={Recruitment} />
        <HomeTemplate path='/terms' exact Component={GeneralTerms} />
        <HomeTemplate path='/termsoftransaction' exact Component={TermsOfTransaction} />

        <UserTemplate path='/login' exact Component={Login} />
        <UserTemplate path='/register' exact Component={Register} />
        <UserTemplate path='/forgetPassword' exact Component={ForgetPassword} />

        <ProfileTemplate path='/users' exact Component={Profile} />
        <ProfileTemplate path='/users/profile' exact Component={Profile} />
        <ProfileTemplate path='/users/edit/:id' exact Component={UserEdit} />
        <ProfileTemplate path='/users/ordershistory' exact Component={OrderHistory} />

        {/* Nguoi dung - user */}
        <AdminTemplate path='/admin' exact Component={UserMng} />
        <AdminTemplate path='/admin/adminusers' exact Component={AdminUserMng} />
        <AdminTemplate path='/admin/driver' exact Component={DriverMng} />
        <AdminTemplate path='/admin/users/edit/:id' exact Component={UserEdit} />
        <AdminTemplate path='/admin/users/adduser' exact Component={AddUser} />
        <AdminTemplate path='/users/order/:id' exact Component={UserOrder} />

        {/* Bus */}
        <AdminTemplate path='/admin/busmng' exact Component={BusMng} />
        <AdminTemplate path='/admin/moviemng/addnew' exact Component={AddNewBus} />
        <AdminTemplate path='/admin/moviemng/edit/:id' exact Component={Edit} />
        <AdminTemplate path='/admin/moviemng/showtime/:id' exact Component={ShowTime} />

        {/* Bus Type */}
        <AdminTemplate path='/admin/bustypemng' exact Component={BusTypeMng} />
        <AdminTemplate path='/admin/bustypemng/addnew' exact Component={AddNewBusType} />
        <AdminTemplate path='/admin/bustypemng/edit/:id' exact Component={EditBusType} />

        {/* Station */}
        <AdminTemplate path='/admin/stationmng' exact Component={StationMng} />
        <AdminTemplate path='/admin/moviemng/addnew' exact Component={AddNew} />
        <AdminTemplate path='/admin/moviemng/edit/:id' exact Component={Edit} />
        <AdminTemplate path='/admin/moviemng/showtime/:id' exact Component={ShowTime} />

        {/* Trip */}
        <AdminTemplate path='/admin/tripmng' exact Component={TripMng} />
        <AdminTemplate path='/admin/theatremng/addtheatrechild' exact Component={AddTheatreChild} />
        <AdminTemplate path='/admin/theatremng/edit/:id' exact Component={EditTheatreChild} />

        {/* Doanh Thu */}
        <AdminTemplate path='/admin/orderlist' exact Component={OrderList} />
        <AdminTemplate path='/admin/revenuemonth' exact Component={RevenueMonth} />
        <AdminTemplate path='/admin/revenuemovie' exact Component={RevenueMovie} />

        {/* Feedback */}
        <AdminTemplate path='/admin/feedbackmng' exact Component={FeedbackMng} />
        <AdminTemplate path='/admin/editfeedback/:id' exact Component={EditFeedback} />


        <HomeTemplate path='/' exact Component={Home} />
        <HomeTemplate path='/search/*' exact Component={Search} />
        <HomeTemplate Component={Home} />
      </Switch>
    </Router>

  );
}

export default App;
