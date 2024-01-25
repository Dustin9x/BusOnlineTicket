import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input, Tabs, InputNumber, notification, Timeline } from 'antd';
import { UserOutlined, HomeOutlined, CreditCardOutlined, KeyOutlined } from '@ant-design/icons';
import './Detail.css'
import { CHUYEN_TAB_ACTIVE } from '../../redux/constants';
import _ from 'lodash';
import { TOKEN } from '../../util/settings/config';
import dayjs from 'dayjs';
import { bookSeatAction, bookTicketAction, orderConfirmAction } from '../../redux/actions/OrderAction';
import { Ticket } from './../../_core/models/Ticket';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import { getCurrentUserAction } from '../../redux/actions/UserAction';
import TicketLeaf from '../../components/TicketLeaf/TicketLeaf';
const { TabPane } = Tabs;
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.guess()


export default function Detail(props) {
    const { donHang } = useSelector(state => state.OrderReducer)
    const { disableTab } = useSelector(state => state.OrderReducer)
    const { tabActive } = useSelector(state => state.OrderReducer)
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
            <UserAvatar />
        </div>}
    </Fragment>

    return <div className='container p-4'>
        <Tabs tabBarExtraContent={operations} defaultActiveKey='1' activeKey={tabActive} onChange={(key) => {
            dispatch({
                type: CHUYEN_TAB_ACTIVE,
                number: key
            })
        }}>
            <TabPane disabled={!donHang || disableTab} tab='01 CONFIRM YOUR ORDER' key='1' >
                <SettlePayment {...props} />
            </TabPane>
            <TabPane disabled={!donHang || disableTab} tab='02 GET YOUR E-TICKET' key='2' >
                <KetQuaDatVe {...props} />
            </TabPane>
        </Tabs>
    </div>

}


export function SettlePayment(props) {
    let { donHang } = useSelector(state => state.OrderReducer)
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
    const totalTicket = donHang && donHang?.numberOfSeat - children - teenage - oldman;
    const totalPrice = donHang && donHang?.totalMoney;
    const discount = donHang && children * donHang?.ticketPrice + teenage * donHang?.ticketPrice * 0.5 + oldman * donHang?.ticketPrice * 0.3
    const finalPrice = totalPrice - discount;

    const onFinish = (values) => {
        if (children + teenage == donHang?.numberOfSeat) {
            notification.error({
                closeIcon: true,
                message: 'Error',
                description: (
                    <>
                        Children must be accompanied by an adult<br></br>
                        Must have at least one adult.
                    </>
                ),
            });
        } else {
            setShow(true)
        }

    };

    const handleSubmit = (values) => {
        if (values.otp == '123456') {
            const ticket = new Ticket();
            const timeStamp = dayjs().tz("Asia/Saigon").format("YYYYMMDDhhmmss")
            ticket.TripId = donHang.tripId;
            ticket.Code = timeStamp;
            ticket.BookDate = dayjs().tz("Asia/Saigon")
            ticket.UserId = donHang.userId;
            ticket.SeatsList = donHang.seatsList;
            ticket.TotalPrice = finalPrice;
            ticket.isCancel = false;
            ticket.Note = `${children} children + ${teenage} teenage + ${oldman} elder`

            donHang = { ...donHang, note: ticket.Note, code: ticket.Code, bookDate: ticket.BookDate}
            dispatch(orderConfirmAction(donHang))
            dispatch(bookSeatAction(ticket))
            dispatch(bookTicketAction(ticket))
        } else {
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
        <div className='container min-h-screen mt-2'>
            <div className="row alert alert-primary" role="alert">
                Please enter the number of passengers according to the classification below to receive additional incentives:
                <div className='w-full mt-3 mx-5'><b>Number of unclassified tickets: {totalTicket}</b></div>
                <ul className='d-flex justify-between mx-5'>
                    <li className="my-1"><i className="fa-solid fa-person fa-lg mr-2"></i>Under 5 years old (discount 100%): <InputNumber addonBefore={<UserOutlined />} onChange={handleChangeChildren} name="children" min={0} max={donHang?.numberOfSeat - teenage - oldman} className="p-2" type="number" /></li>
                    <li className="my-1"><i className="fa-solid fa-person fa-lg mr-2"></i>Between 5-12 years old (discount 50%): <InputNumber addonBefore={<UserOutlined />} onChange={handleChangeTeenage} name="teenage" min={0} max={donHang?.numberOfSeat - children - oldman} className="p-2" type="number" /></li>
                    <li className="my-1"><i className="fa-solid fa-person fa-lg mr-2"></i>Over 50 years old (discount 30%): <InputNumber addonBefore={<UserOutlined />} onChange={handleChangeOldman} name="oldman" min={0} max={donHang?.numberOfSeat - children - teenage} className="p-2" type="number" /></li>
                </ul>
                <div><small className='text-gray-700'>(*) Unclassified ticket will be considered as normal ticket with no discount.</small></div>
            </div>
            <div className='row'>
                <div className='col-6 w-full alert alert-light' style={{ height: 370 }}>
                    <p className="font-bold">Your order detail</p>
                    <div className='row'>
                        <div className="col-6">
                            <Timeline
                                items={[
                                    {
                                        color: 'red',
                                        children: (
                                            <>
                                                <div><b>{donHang?.fromStation}</b></div>
                                                <div>{dayjs(donHang?.startTime).format('DD-MM-YYYY h:mm A')}</div>
                                            </>
                                        ),
                                    },
                                    {
                                        children: (
                                            <>
                                                <div><b>{donHang?.toStation}</b></div>
                                                <div>{dayjs(donHang?.finishTime).format('DD-MM-YYYY h:mm A')}</div>
                                            </>
                                        ),
                                    },
                                ]}
                            />
                        </div>
                        <div className="pl-5 col-6">
                            <div className='d-flex justify-between'><div>Bus Plate:</div>{donHang?.busPlate}</div>
                            <div className='d-flex justify-between'><div>Bus Type:</div>{donHang?.busType} ({donHang?.numberOfSeat} seats)</div>
                            <div className='d-flex justify-between'><div>Driver:</div>{donHang?.driver}</div>
                            <div className='d-flex justify-between'><div>Ticket Price:</div><b>${donHang?.ticketPrice}/seat</b></div>
                            <div className='d-flex justify-between'><div >Your selected seats:</div><b>{donHang?.seatList}</b></div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='d-flex justify-between mt-3'>
                        <p className="font-bold">Total Price</p>
                        <h3 className='font-bold'>{totalPrice?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</h3>
                    </div>
                    <div className='d-flex justify-between'>
                        <p>Discount</p>
                        <h3>{discount?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</h3>
                    </div>
                    <hr></hr>
                    <div className='d-flex justify-between mt-3'>
                        <p className="font-bold">Final Price</p>
                        <h3 className='text-xl font-bold text-red-600'>{finalPrice?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</h3>
                    </div>
                    <p className='text-gray-400 m-2'>(*) Please check the information carefully before proceeding the next steps.</p>

                </div>
                <div className='col-6 '>
                    <div className='row ml-3 alert alert-light' style={{ height: 370 }}>
                        <div className='mx-auto'>
                            <h1 className='text-center text-xl my-5'>PAYMENT BY CREDIT CARD</h1>
                            {!show ? <Form
                                name="basic"
                                onFinish={onFinish}
                                autoComplete="off"
                                style={{ width: 370 }}
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
                                    style={{ width: 370 }}
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
                            <TicketLeaf donHang={donHang}/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
}