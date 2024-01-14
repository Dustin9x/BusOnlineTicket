import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Button, Card, Form, Input, Pagination, Popover, QRCode, Tabs, notification } from 'antd';
import { UserOutlined, HomeOutlined, CreditCardOutlined, KeyOutlined } from '@ant-design/icons';
import './Detail.css'
import { CHUYEN_TAB_ACTIVE, DAT_VE } from '../../redux/constants';
import _ from 'lodash';
import { OrderDetail } from '../../_core/models/OrderDetail';
// import { layThongTinNguoiDungAction } from '../../redux/actions/DriverAction';
import { datVeAction, layDonHangTheoUserAction } from '../../redux/actions/QuanLyDonHangAction';
import { TOKEN, USER_LOGIN } from '../../util/settings/config';
import dayjs from 'dayjs';
import { history } from './../../App';
import { getTripByIdAction } from '../../redux/actions/TripAction';
import { orderConfirmAction } from '../../redux/actions/OrderAction';
import { values } from 'lodash';
const { TabPane } = Tabs;


export default function Detail(props) {
    const { disableTab } = useSelector(state => state.OrderReducer)
    const { disableTab1 } = useSelector(state => state.OrderReducer)
    const { tabActive } = useSelector(state => state.OrderReducer)
    const { donHang } = useSelector(state => state.OrderReducer)
    const { profile } = useSelector(state => state.UserReducer)

    let userLogin = {}
    if (localStorage.getItem(USER_LOGIN)) {
        userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
    }
    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch(layThongTinNguoiDungAction(userLogin.id))
        dispatch({
            type: CHUYEN_TAB_ACTIVE,
            number: '1'
        })
    }, [])


    const content = (
        <div style={{ width: 200 }}>
            {(userLogin.role === 'Super') ? <Button type="text" className='w-full text-left' href="/admin/moviemng">Super Admin</Button> : ''}
            {(userLogin.role === 'QuanTri') ? <Button type="text" className='w-full text-left' href="/admin/users">Trang Quản Trị</Button> : ''}
            <Button type="text" href="/users/profile" className='w-full text-left'>Trang Cá Nhân</Button>
            <Button type="text" href="/home" className='w-full text-left' onClick={() => {
                localStorage.removeItem(USER_LOGIN)
                localStorage.removeItem(TOKEN)
                window.location.reload()
            }}>Đăng Xuất</Button>
        </div>
    );

    const operations = <Fragment>
        {_.isEmpty(userLogin) ? <Fragment>
            <Button type="text" href="/register" className="text-white">Sign Up</Button>
            <Button type="primary" href="/login" className="font-semibold bg-violet-400">Sign In</Button>
        </Fragment> : <div className="d-flex">
            <Button type="link" href="/"><HomeOutlined style={{ fontSize: '24px' }} /></Button>
            <Popover placement="bottomRight" title={userLogin.taiKhoan} content={content} trigger="click">
                <Button className='rounded-full bg-slate-300 p-0 d-flex justify-center items-center w-full h-full' style={{ width: 40, height: 40 }}>
                    {profile?.avatar !== null ?
                        <div style={{ minWidth: '40px', minHeight: 40, backgroundSize: 'cover', borderRadius: '50%', backgroundImage: `url(${profile?.avatar})` }} />
                        : <Avatar size={40} style={{ fontSize: '28px', lineHeight: '32px' }} icon={"H"} />
                    }
                    {/* <Avatar size={40} style={{ fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={userLogin.name.substr(0, 1)} /> */}
                </Button>
            </Popover>
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
    const { danhSachGheDangChon } = useSelector(state => state.OrderReducer)
    const { tripDetail } = useSelector(state => state.TripReducer)
    const dispatch = useDispatch();
    let { id } = props.match.params;
    useEffect(() => {
        dispatch(getTripByIdAction(id))
    }, [])

    console.log('tripDetail', tripDetail)

    const renderSeat = () => {

        const seatCodes = [
            "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12",
            "B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B09", "B10", "B11", "B12",
        ];


        return (
            <div className="row">
                <div className='col-6 px-5'>
                    <h2 className='text-center'>Floor 1</h2>
                    <div className='row'>
                        {seatCodes?.slice(0, 12).map((ghe, index) => {
                            let classGheDangDat = '';
                            let indexGheDD = danhSachGheDangChon?.findIndex(gheDD => gheDD === ghe);
                            if (indexGheDD != -1) {
                                classGheDangDat = 'seatSelected'
                            }
                            return <div key={index} className="col-4">
                                <Button disabled={ghe.nguoiDat} type='link' className={`seat p-0 ${classGheDangDat}`}
                                    onClick={() => {
                                        dispatch({
                                            type: DAT_VE,
                                            gheDuocChon: ghe
                                        })
                                    }}
                                >
                                    {ghe}
                                </Button>
                            </div>

                        })}
                    </div>
                </div>
                <div className='col-6 px-5'>
                    <h2 className='text-center'>Floor 2</h2>
                    <div className='row'>
                        {seatCodes?.slice(12, 24).map((ghe, index) => {
                            let classGheDangDat = '';
                            let indexGheDD = danhSachGheDangChon?.findIndex(gheDD => gheDD === ghe);
                            if (indexGheDD != -1) {
                                classGheDangDat = 'seatSelected'
                            }
                            return <div key={index} className="col-4">
                                <Button disabled={ghe.nguoiDat} type='link' className={`seat p-0 ${classGheDangDat}`}
                                    onClick={() => {
                                        dispatch({
                                            type: DAT_VE,
                                            gheDuocChon: ghe
                                        })
                                    }}
                                >
                                    {ghe}
                                </Button>
                            </div>

                        })}
                    </div>
                </div>
            </div>
        )
    }

    const renderSeatSelected = () => {
        return _.sortBy(danhSachGheDangChon).map((gheDD, index) => {
            return (<b key={index} className='mr-1'>{gheDD}</b>).props.children
        }).join(', ')
    }

    const totalMoney = danhSachGheDangChon?.length * tripDetail?.ticketPrice

    return (
        <div className='container min-h-screen'>
            <div className='grid grid-cols-12'>
                <div className='col-span-8 mx-20 my-2'>
                    <ul className="showcase mb-10">
                        <li className='mr-5'>
                            <div className="seat mr-2" style={{ width: 25, height: 25 }}></div><small>Available</small>
                        </li>
                        <li className='mr-5'>
                            <div className="seat seatSelected mr-2" style={{ width: 25, height: 25 }}></div><small>Selecting</small>
                        </li>
                        <li>
                            <div className="seat seatOccupied px-2.5 py-1 text-gray-400 mr-2" style={{ width: 25, height: 25 }}>x</div><small>Occupied</small>
                        </li>
                    </ul>

                    <div className='d-flex justify-center'>
                        <div>{renderSeat()}</div>
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
                        <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-full"
                            onClick={() => {
                                const orderDetail = new OrderDetail();
                                orderDetail.tripId = props.match.params.id;
                                orderDetail.busId = tripDetail.busId;
                                orderDetail.driverId = tripDetail.driverId;
                                orderDetail.driver = tripDetail.driver.fullName;
                                orderDetail.busPlate = tripDetail.bus.busPlate;
                                orderDetail.fromStation = tripDetail.fromStation.name;
                                orderDetail.toStation = tripDetail.toStation.name;
                                orderDetail.startTime = tripDetail.startTime;
                                orderDetail.finishTime = tripDetail.finishTime;
                                orderDetail.seatList = renderSeatSelected();
                                orderDetail.numberOfSeat = danhSachGheDangChon?.length;
                                orderDetail.ticketPrice = tripDetail.ticketPrice;
                                orderDetail.totalMoney = totalMoney;
                                orderDetail.userId = userLogin.id;
                                orderDetail.email = userLogin.email;
                                dispatch(orderConfirmAction(orderDetail))
                            }}
                        >Continue</button>
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
    const [disable, setDisable] = useState(true);

    const handleChangeChildren = (e) => {
        setChildren(e.target.value)
    }
    const handleChangeTeenage = (e) => {
        setTeenage(e.target.value)
    }
    const handleChangeOldman = (e) => {
        setOldman(e.target.value)
    }
    const totalTicket = donHang.numberOfSeat - children - teenage - oldman;
    const finalPrice = donHang.totalMoney - children*donHang.ticketPrice - teenage*donHang.ticketPrice*0.5 - oldman*donHang.ticketPrice*0.7
    const onFinish = (values) => {
        setShow(true)
    };
    const onSubmit = (values) => {
        if (values === '123456') {
            dispatch(datVeAction(donHang))
        }
    };

    const dispatch = useDispatch();
    return (
        <div className='container min-h-screen mt-5'>
            <div className='row'>
                <div className='col-6'>
                    <div className=''>
                        <Card className='m-2 w-full bg-indigo-400'>
                            <p className="font-bold">Your order detail</p>
                            <div className='d-flex justify-between'><div >From Station:</div><b>{donHang?.fromStation}</b></div>
                            <div className='d-flex justify-between'><div >To Station:</div><b>{donHang?.toStation}</b></div>
                            <div className='d-flex justify-between'><div >Estimate Depature Time:</div><b>{dayjs(donHang?.startTime).format('DD-MM-YYYY')}</b></div>
                            <div className='d-flex justify-between'><div >Estimate Arrival Time:</div><b>{dayjs(donHang?.finishTime).format('DD-MM-YYYY')}</b></div>
                            <div className='d-flex justify-between'><div >Bus Plate:</div><b>{donHang?.busPlate}</b></div>
                            <div className='d-flex justify-between'><div >Driver:</div><b>{donHang?.driver}</b></div>
                            <div className='d-flex justify-between'><div >Your selected seats:</div><b>{donHang?.seatList}</b></div>
                        </Card>
                    </div>
                    <Card className='m-2 w-full bg-orange-400'>
                        <div className='d-flex justify-between'><p className="font-bold">Total Price</p><h3 className=' text-xl font-bold'>{finalPrice.toLocaleString()} đ</h3></div>
                        
                        Please enter the number of passengers according to the classification below to receive additional incentives:
                        
                        <ul>
                            <li className="my-1"> * Under 5 years old (discount 100%): <input onChange={handleChangeChildren} name="children" min={0} style={{width:40}} value={children} className="p-1" type="number"/></li>
                            <li className="my-1"> * Between 5-12 years old (discount 50%): <input onChange={handleChangeTeenage} name="teenage" min={0} style={{width:40}} value={teenage} className="p-1" type="number"/></li>
                            <li className="my-1"> * Over 50 years old (discount 30%): <input onChange={handleChangeOldman} name="oldman" min={0} style={{width:40}} value={oldman} className="p-1" type="number"/></li>
                        </ul>
                        <b>Number of unclassified tickets: {totalTicket}</b><br/>
                        <small className='text-gray-700'>(*) Unclassified ticket will be considered as normal ticket with no discount.</small>
                        {totalTicket<0 ? notification.error({
                            closeIcon: false,
                            message: 'Error',
                            description: (
                                <>You have exceeded your number of Seat.</>
                            ),
                        }) : '' }
                        
                    </Card>
                    <p className='text-gray-400 m-2'>(*) Please check the information carefully, orders once placed will not be canceled or refunded.</p>

                </div>
                <div className='col-6'>
                    <div className='row'>
                        <div className='col-6 mx-auto'>
                            <h1 className='text-center text-xl mb-5'>THANH TOÁN BẰNG THẺ TÍN DỤNG</h1>
                            {!show ? <Form
                                name="basic"
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <Form.Item
                                    name="otp"
                                    rules={[
                                        {
                                            required: true,
                                            type: 'string',
                                            min: 16,
                                            max: 19,
                                            message: 'Số thẻ gồm 16-19 số và không được để trống!',
                                        },
                                    ]}
                                >
                                    <Input size="large" onInput={e => e.target.value = e.target.value.replace(/(\d{4})(\d+)/g, '$1 $2').trim()} placeholder='Số Thẻ' prefix={<CreditCardOutlined />} />
                                </Form.Item>

                                <Form.Item
                                    name="chuThe"
                                    rules={[
                                        {
                                            required: true,
                                            type: 'string',
                                            message: 'Tên chủ thẻ không được để trống!',
                                        },
                                    ]}
                                >
                                    <Input size="large" placeholder='Tên Chủ Thẻ Không Dấu' onInput={e => {
                                        e.target.value = e.target.value.toUpperCase()
                                        e.target.value = e.target.value.normalize("NFD")
                                        e.target.value = e.target.value.replace(/[\u0300-\u036f]/g, "")
                                        e.target.value = e.target.value.replace(/đ/g, "d")
                                        e.target.value = e.target.value.replace(/Đ/g, "D");
                                    }} prefix={<UserOutlined />} />
                                </Form.Item>
                                {
                                    totalTicket<0 ?
                                    <button type="primary" disabled className='focus:outline-none text-white bg-purple-300 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 w-full' 
                                htmlType="submit">Please re-classified your tickets</button>
                                : <button type="primary" className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 w-full' 
                                htmlType="submit">Continue</button>
                                }
                            </Form>
                                : <Form onFinish={onSubmit} >
                                    <Form.Item
                                        rules={[
                                            {
                                                required: true,
                                                type: 'string',
                                                min: 6,
                                                max: 6,
                                                message: 'OTP gồm 6 số và không được để trống!',
                                            },
                                        ]}
                                    >
                                        <Input size="large" placeholder='Nhập OTP' prefix={<KeyOutlined />} />
                                    </Form.Item>
                                    <div className='mt-5 d-flex justify-center'>
                                        <button type="button" style={{ width: 350 }} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-full"
                                        onClick={() => {
                                            dispatch(datVeAction(donHang))
                                        }}
                                    >Xác Nhận Thanh Toán</button>
                                        
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
    const { Meta } = Card;
    const { donHang } = useSelector(state => state.OrderReducer)
    const { arrDonHang } = useSelector(state => state.OrderReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        const action = layDonHangTheoUserAction(donHang?.userId);
        dispatch(action)
    }, [])

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const reverseArrDonHang = arrDonHang.slice().reverse()
    const currentArrDonHang = reverseArrDonHang.slice(indexOfFirstPost, indexOfLastPost);


    let lastTicket = arrDonHang[arrDonHang.length - 1];
    return <div className='row'>
        <div className='col-12'>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Lịch Sử Đặt Vé</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Xin cám ơn bạn đã ủng hộ dịch vụ của chúng tôi, chúc bạn có những trải nghiệm tuyệt vời</p>
                    </div>
                    <div className="container">
                        {arrDonHang.length < 1 || arrDonHang == undefined ? <p className='text-xl text-center w-full'>Chưa có đơn hàng nào</p> :
                            <div>
                                <div className='row'>
                                    <div className='col-6 ml-auto mr-auto mt-3 '>
                                        <h1 className='text-center text-lg mb-5'>Vé vừa mua</h1>
                                        <Card
                                            hoverable
                                            className='bg-red-100 p-2 d-flex'
                                            style={{
                                                width: '100%',
                                            }}
                                            cover={<div>
                                                <small className='text-right'>Ngày đặt vé: {dayjs(lastTicket.create_at).format('DD-MM-YYYY')}</small>
                                                <QRCode value={
                                                    'Mã đơn: ' + lastTicket.maOrder +
                                                    ', Phim: ' + lastTicket.phim +
                                                    ', Ngày: ' + dayjs(lastTicket.ngayChieu).format('DD-MM-YYYY') +
                                                    ', Suất: ' + lastTicket.gioChieu.substr(0, 5) +
                                                    ', Ghế: ' + lastTicket.danhSachGhe
                                                }
                                                />
                                            </div>
                                            }
                                        >
                                            <Meta className='font-bold' title={lastTicket.phim} />
                                            <div className='mt-2 text-gray-500'>
                                                <div>Ngày chiếu: {dayjs(lastTicket.ngayChieu).format('DD-MM-YYYY')}</div>
                                                <div>Giờ chiếu: {lastTicket.gioChieu.substr(0, 5)}</div>
                                                <div>Ghế: {lastTicket.danhSachGhe}</div>
                                                <div className='font-bold'>Bạn cần xuất trình vé điện tử này để vào phòng chiếu</div>
                                            </div>

                                        </Card>
                                        <h1 className='text-center text-lg mt-20'>Vé đã mua</h1>
                                    </div>
                                </div>
                                <div className='row'>
                                    {currentArrDonHang.slice(0, -1)?.map((item, index) => {
                                        return <div className='col-6 mt-3 '>
                                            <Card
                                                hoverable
                                                className='bg-teal-100 p-2 d-flex'
                                                style={{
                                                    width: '100%',
                                                }}
                                                cover={<div>
                                                    <small className='text-right'>Ngày đặt vé: {dayjs(item.create_at).format('DD-MM-YYYY')}</small>
                                                    <QRCode value={
                                                        'Mã đơn: ' + item.maOrder +
                                                        ', Phim: ' + item.phim +
                                                        ', Ngày: ' + dayjs(item.ngayChieu).format('DD-MM-YYYY') +
                                                        ', Suất: ' + item.gioChieu.substr(0, 5) +
                                                        ', Ghế: ' + item.danhSachGhe
                                                    }
                                                    />
                                                </div>
                                                }
                                            >

                                                <Meta className='font-bold' title={item.phim} />
                                                <div className='mt-2 text-gray-500'>
                                                    <div>Ngày chiếu: {dayjs(item.ngayChieu).format('DD-MM-YYYY')}</div>
                                                    <div>Giờ chiếu: {item.gioChieu.substr(0, 5)}</div>
                                                    <div>Ghế: {item.danhSachGhe}</div>
                                                    <div className='font-bold'>Bạn cần xuất trình vé điện tử này để vào phòng chiếu</div>
                                                </div>

                                            </Card>
                                        </div>
                                    })}
                                </div>
                                <Pagination className='d-flex justify-center line-clamp-3 my-20' pageSize={postsPerPage} currentPage={currentPage} total={arrDonHang.length} onChange={(page) => { setCurrentPage(page) }} />
                            </div>
                        }
                    </div>
                </div>
            </section>
        </div>
    </div>
}