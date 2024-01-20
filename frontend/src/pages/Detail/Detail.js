import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Button, Card, Form, Input, Pagination, Popover, QRCode, Tabs, InputNumber, notification } from 'antd';
import { UserOutlined, HomeOutlined, CreditCardOutlined, KeyOutlined } from '@ant-design/icons';
import './Detail.css'
import './Ticket.css'
import { CHUYEN_TAB_ACTIVE, DAT_VE } from '../../redux/constants';
import _ from 'lodash';
import { OrderDetail } from '../../_core/models/OrderDetail';
// import { layThongTinNguoiDungAction } from '../../redux/actions/DriverAction';
import { datVeAction, layDonHangTheoUserAction } from '../../redux/actions/QuanLyDonHangAction';
import { TOKEN, USER_LOGIN } from '../../util/settings/config';
import dayjs from 'dayjs';
import { history } from './../../App';
import { getTripByIdAction } from '../../redux/actions/TripAction';
import { bookSeatAction, bookTicketAction, getTicketByUserAction, orderConfirmAction } from '../../redux/actions/OrderAction';
import { values } from 'lodash';
import { Ticket } from './../../_core/models/Ticket';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import { getCurrentUserAction } from '../../redux/actions/UserAction';
import SeatMap from '../../components/SeatMap/SeatMap';
const { TabPane } = Tabs;


export default function Detail(props) {
    const { disableTab } = useSelector(state => state.OrderReducer)
    const { disableTab1 } = useSelector(state => state.OrderReducer)
    const { tabActive } = useSelector(state => state.OrderReducer)
    const { donHang } = useSelector(state => state.OrderReducer)
    const { userLogin } = useSelector(state => state.UserReducer);
    const dispatch = useDispatch();
    
    let accessToken = {}
    if (localStorage.getItem(TOKEN)) {
        accessToken = localStorage.getItem(TOKEN)
    }

    useEffect(() => {
        dispatch(getCurrentUserAction(accessToken))
    }, []);


    useEffect(() => {
        // dispatch(layThongTinNguoiDungAction(userLogin.id))
        dispatch({
            type: CHUYEN_TAB_ACTIVE,
            number: '1'
        })
    }, [])


    const operations = <Fragment>
        {_.isEmpty(userLogin) ? <Fragment>
            <Button type="text" href="/register" className="text-white">Sign Up</Button>
            <Button type="primary" href="/login" className="font-semibold bg-violet-400">Sign In</Button>
        </Fragment> : <div className="d-flex">
            <Button type="link" href="/"><HomeOutlined style={{ fontSize: '24px' }} /></Button>
            <UserAvatar/>
        </div>}
    </Fragment>

    return <div className='container p-4'>
        <Tabs tabBarExtraContent={operations} defaultActiveKey='1' activeKey={tabActive} onChange={(key) => {
            dispatch({
                type: CHUYEN_TAB_ACTIVE,
                number: key
            })
        }}>
            <TabPane disabled={!donHang || disableTab1} tab='01 SELECT SEAT' key='1' >
                <Checkout {...props} />
            </TabPane>
            <TabPane disabled={!donHang || disableTab} tab='02 CONFIRM YOUR ORDER' key='2' >
                <SettlePayment {...props} />
            </TabPane>
            <TabPane disabled={!donHang || disableTab} tab='03 GET YOUR E-TICKET' key='3' >
                <KetQuaDatVe {...props} />
            </TabPane>
        </Tabs>
    </div>

}


function Checkout(props) {
    const { userLogin } = useSelector(state => state.UserReducer)
    const { selectingSeats } = useSelector(state => state.OrderReducer)
    const { tripDetail } = useSelector(state => state.TripReducer)
    const dispatch = useDispatch();
    let { id } = props.match.params;
    useEffect(() => {
        dispatch(getTripByIdAction(id))
    }, [])

    const renderSeatSelected = () => {
        return _.sortBy(selectingSeats).map((gheDD, index) => {
            return (<b key={index} className='mr-1'>{gheDD}</b>).props.children
        }).join(', ')
    }

    const totalMoney = selectingSeats?.length * tripDetail?.ticketPrice

    return (
        <div className='container min-h-screen'>
            <div className='grid grid-cols-12'>
                <div className='col-span-8 mx-20 my-2'>
                    <ul className="flex showcase my-10">
                        <li className='flex items-center mr-5'>
                            <div className="seat mr-2" style={{ width: 25, height: 25 }}></div><small>Available</small>
                        </li>
                        <li className='flex items-center mr-5'>
                            <div className="seat seatSelected mr-2" style={{ width: 25, height: 25 }}></div><small>Selecting</small>
                        </li>
                        <li className='flex items-center'>
                            <div className="seat seatOccupied text-gray-400 mr-2" style={{ width: 25, height: 25 }}></div><small>Occupied</small>
                        </li>
                    </ul>

                    <div className='d-flex justify-center'>
                        {/* <SeatMap tripId={tripDetail.id}/> */}
                    </div>
                </div>
                <div className='col-span-4'>
                    <Card className='m-2'>
                        <h3 className='text-lg font-bold'>Trip Code: PHTV{tripDetail.id}</h3>
                        <div className='d-flex justify-between'><div >From Station:</div><b>{tripDetail?.fromStation?.name}</b></div>
                        <div className='d-flex justify-between'><div >To Station:</div><b>{tripDetail?.toStation?.name}</b></div>
                        <div className='d-flex justify-between'><div >Estimate Depature Time:</div><b>{dayjs(tripDetail?.startTime).format('DD-MM-YYYY')}</b></div>
                        <div className='d-flex justify-between'><div >Estimate Arrival Time:</div><b>{dayjs(tripDetail?.finishTime).format('DD-MM-YYYY')}</b></div>
                        <div className='d-flex justify-between'><div >Bus Plate:</div><b>{tripDetail?.bus?.busPlate}</b></div>
                        <div className='d-flex justify-between'><div >Bus Type:</div><b>{tripDetail?.bus?.busType?.name}</b></div>
                        <div className='d-flex justify-between'><div >Driver:</div><b>{tripDetail?.driver?.fullName}</b></div>
                    </Card>
                    <Card className='m-2'>
                        <p>You're selecting:</p>
                        <b>{renderSeatSelected()}</b>
                    </Card>
                    <Card className='m-2'>
                        <p>Total Price</p>
                        <h3 className='text-red-400 text-xl font-bold'>{totalMoney.toLocaleString()} đ</h3>
                    </Card>
                    <div className='m-2'>
                        {selectingSeats?.length == 0
                            ? <button type="button" disabled className="focus:outline-none text-white bg-purple-300 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 w-full">Please select seat first</button>
                            : <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 w-full"
                                onClick={() => {
                                    const orderDetail = new OrderDetail();
                                    orderDetail.tripId = parseInt(props.match.params.id);
                                    orderDetail.busId = tripDetail.busId;
                                    orderDetail.driverId = tripDetail.driverId;
                                    orderDetail.driver = tripDetail.driver?.fullName;
                                    orderDetail.busPlate = tripDetail.bus?.busPlate;
                                    orderDetail.busType = tripDetail.bus?.busType.name;
                                    orderDetail.fromStation = tripDetail.fromStation?.name;
                                    orderDetail.toStation = tripDetail.toStation?.name;
                                    orderDetail.startTime = tripDetail.startTime;
                                    orderDetail.finishTime = tripDetail.finishTime;
                                    orderDetail.seatList = renderSeatSelected();
                                    orderDetail.numberOfSeat = selectingSeats?.length;
                                    orderDetail.ticketPrice = tripDetail.ticketPrice;
                                    orderDetail.totalMoney = totalMoney;
                                    orderDetail.userId = userLogin.id;
                                    orderDetail.email = userLogin.email;
                                    dispatch(orderConfirmAction(orderDetail))
                                }}
                            >Continue</button>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}


export function SettlePayment(props) {
    const { donHang } = useSelector(state => state.OrderReducer)
    const [show, setShow] = useState(false);
    const [children, setChildren] = useState(0);
    const [teenage, setTeenage] = useState(0);
    const [oldman, setOldman] = useState(0);

    const handleChangeChildren = (value) => {
        setChildren(value)
    }
    const handleChangeTeenage = (value) => {
        setTeenage(value)
    }
    const handleChangeOldman = (value) => {
        setOldman(value)
    }
    const totalTicket = donHang.numberOfSeat - children - teenage - oldman;
    const finalPrice = donHang.totalMoney - children * donHang.ticketPrice - teenage * donHang.ticketPrice * 0.5 - oldman * donHang.ticketPrice * 0.3
    const onFinish = (values) => {
        setShow(true)
    };

    const handleSubmit = (values) => {
        if (values.otp == '123456') {
            const ticket = new Ticket();
            ticket.TripId = donHang.tripId;
            ticket.UserId = donHang.userId;
            ticket.SeatsList = donHang.seatList;
            ticket.TotalPrice = finalPrice;
            ticket.isCancel = false;
            console.log('ticket', ticket)
            dispatch(bookSeatAction(ticket))
            dispatch(bookTicketAction(ticket))
        }else{
            notification.error({
                closeIcon: true,
                message: 'Error',
                description: (
                    <>OTP is incorrect</>
                ),
            });
        }
    };

    const dispatch = useDispatch();
    return (
        <div className='container min-h-screen mt-5'>
            <Card className='m-2 w-full bg-red-400'>
                Please enter the number of passengers according to the classification below to receive additional incentives:
                <ul className='d-flex justify-between'>
                    <li className="my-1"><i className="fa-solid fa-person fa-lg mr-2"></i>Under 5 years old (discount 100%): <InputNumber addonBefore={<UserOutlined />} onChange={handleChangeChildren} name="children" min={0} max={donHang?.numberOfSeat - teenage - oldman} className="p-2" type="number" /></li>
                    <li className="my-1"><i className="fa-solid fa-person fa-lg mr-2"></i>Between 5-12 years old (discount 50%): <InputNumber addonBefore={<UserOutlined />} onChange={handleChangeTeenage} name="teenage" min={0} max={donHang?.numberOfSeat - children - oldman} className="p-2" type="number" /></li>
                    <li className="my-1"><i className="fa-solid fa-person fa-lg mr-2"></i>Over 50 years old (discount 30%): <InputNumber addonBefore={<UserOutlined />} onChange={handleChangeOldman} name="oldman" min={0} max={donHang?.numberOfSeat - children - teenage} className="p-2" type="number" /></li>
                </ul>
                <b>Number of unclassified tickets: {totalTicket}</b><br />
                <small className='text-gray-700'>(*) Unclassified ticket will be considered as normal ticket with no discount.</small>

            </Card>
            <div className='row'>
                <div className='col-6'>
                    <div className=''>
                        <Card className='m-2 w-full'>
                            <p className="font-bold">Your order detail</p>
                            <div className='d-flex justify-between'><div >From Station:</div><b>{donHang?.fromStation}</b></div>
                            <div className='d-flex justify-between'><div >To Station:</div><b>{donHang?.toStation}</b></div>
                            <div className='d-flex justify-between'><div >Estimate Depature Time:</div><b>{dayjs(donHang?.startTime).format('DD-MM-YYYY')}</b></div>
                            <div className='d-flex justify-between'><div >Estimate Arrival Time:</div><b>{dayjs(donHang?.finishTime).format('DD-MM-YYYY')}</b></div>
                            <div className='d-flex justify-between'><div >Bus Plate:</div><b>{donHang?.busPlate}</b></div>
                            <div className='d-flex justify-between'><div >Bus Type:</div><b>{donHang?.busType}</b></div>
                            <div className='d-flex justify-between'><div >Driver:</div><b>{donHang?.driver}</b></div>
                            <div className='d-flex justify-between'><div >Your selected seats:</div><b>{donHang?.seatList}</b></div>
                        </Card>
                    </div>
                    <Card className='m-2 w-full bg-indigo-300'>
                        <div className='d-flex justify-between'><p className="font-bold">Total Price</p><h3 className=' text-xl font-bold'>{finalPrice.toLocaleString()} đ</h3></div>
                    </Card>
                    <p className='text-gray-400 m-2'>(*) Please check the information carefully, orders once placed will not be canceled or refunded.</p>

                </div>
                <div className='col-6'>
                    <div className='row'>
                        <div className='col-6 mx-auto'>
                            <h1 className='text-center text-xl my-5'>PAYMENT BY CREDIT CARD</h1>
                            {!show ? <Form
                                name="basic"
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <Form.Item
                                    name="cardnumber"
                                    rules={[
                                        {
                                            required: true,
                                            type: 'string',
                                            min: 16,
                                            max: 19,
                                            message: 'Card number must have 16-19 digits and can not be blank!',
                                        },
                                    ]}
                                >
                                    <Input size="large" onInput={e => e.target.value = e.target.value.replace(/(\d{4})(\d+)/g, '$1 $2').trim()} placeholder='Card number' prefix={<CreditCardOutlined />} />
                                </Form.Item>

                                <Form.Item
                                    name="cardholder"
                                    rules={[
                                        {
                                            required: true,
                                            type: 'string',
                                            message: 'Card holder can not be blank',
                                        },
                                    ]}
                                >
                                    <Input size="large" placeholder='Card holder name' onInput={e => {
                                        e.target.value = e.target.value.toUpperCase()
                                        e.target.value = e.target.value.normalize("NFD")
                                        e.target.value = e.target.value.replace(/[\u0300-\u036f]/g, "")
                                        e.target.value = e.target.value.replace(/đ/g, "d")
                                        e.target.value = e.target.value.replace(/Đ/g, "D");
                                    }} prefix={<UserOutlined />} />
                                </Form.Item>
                                <button type="submit" className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 w-full'
                                >Continue</button>
                            </Form>
                                : <Form
                                    name="basic"
                                    onFinish={handleSubmit}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        name="otp"
                                        rules={[
                                            {
                                                required: true,
                                                type: 'string',
                                                min: 6,
                                                max: 6,
                                                message: 'OTP have 6 digit and can not be blank!',
                                            },
                                        ]}
                                    >
                                        <Input size="large" placeholder='Enter OTP' prefix={<KeyOutlined />} />
                                    </Form.Item>
                                    <div className='mt-5 d-flex justify-center'>
                                        <button type="submit" style={{ width: 350 }} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-full"

                                        >Confirm Payment</button>

                                    </div>
                                </Form>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export function KetQuaDatVe(props) {
    const { donHang } = useSelector(state => state.OrderReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        
    }, [])

    return <div className='row'>
        <div className='col-12'>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Successfully Order</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Thank you for supporting our service, wish you a wonderful experience.</p>
                    </div>
                    <div className="container">
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">You don't need to print out of my bus ticket to board the bus. You can show your E-ticket or e-ticket on your mobile device before boarding the bus. 
                    Additionally, It is advisable to carry a government issued Identity card to verify your identity and your companies before boarding the bus to enjoy your discount.</p>
                        <div className="cardWrap">
                            <div className="card cardLeft">
                                <h1>Trip: <span className='font-bold'>PHTV{donHang?.tripId}</span></h1>
                                <div className="title">
                                    <span>Route</span>
                                    <h2>{donHang?.fromStation} - {donHang?.toStation}</h2>
                                </div>
                                <div className="name">
                                    <span>Customer</span>
                                    <h2>{donHang?.email}</h2>
                                </div>
                                <div className="seatList">
                                    <span>seat</span>
                                    <h2>{donHang?.seatList}</h2>
                                </div>
                                <div className="time">
                                    <span>time</span>
                                    <h2>{dayjs(donHang?.startTime).format('DD-MM-YYYY')}</h2>
                                </div>
                                
                            </div>
                            <div className="card cardRight">
                                <div className="eye" />
                                <div className="number">
                                    <span>seat</span>
                                    <h3>{donHang?.seatList}</h3>
                                </div>
                                <QRCode size={100} className='mx-auto' value={
                                    'Ticket: ' + donHang?.email +
                                    ', Route: ' + donHang?.fromStation + ' ' + donHang?.toStation +
                                    ', Day: ' + dayjs(donHang?.startTime).format('DD-MM-YYYY') +
                                    ', Seat: ' + donHang?.seatList
                                } />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
}