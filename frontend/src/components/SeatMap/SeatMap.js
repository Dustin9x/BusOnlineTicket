import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTripByIdAction } from "../../redux/actions/TripAction";
import { Button, Timeline } from "antd";
import { DAT_VE } from "../../redux/constants";
import dayjs from 'dayjs';
import _ from 'lodash';
import { orderConfirmAction } from "../../redux/actions/OrderAction";
import { OrderDetail } from "../../_core/models/OrderDetail";


export default function SeatMap(props) {
    const { selectingSeats } = useSelector(state => state.OrderReducer)
    const { tripDetail } = useSelector(state => state.TripReducer)
    const { userLogin } = useSelector(state => state.UserReducer)
    const dispatch = useDispatch();
    let { tripId } = props
    const numberOfSeat = tripDetail?.bus?.busType?.numberOfSeat;
    const occupiedSeats = tripDetail?.seats?.map(s => s.name);
    useEffect(() => {
        dispatch(getTripByIdAction(tripId))
    }, [])

    console.log('numberOfSeat', numberOfSeat)
    console.log('occupiedSeats', occupiedSeats)

    function RenderSeatCodes9() {
        const seatCodes9 = [
            "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09"
        ];
        return (
            <div className="row">
                <div className='col-6 offset-3 mx-auto px-5'>
                    <div className='row mt-15 seatfloor'>
                        {seatCodes9?.map((ghe, index) => {
                            let classGheDangDat = '';
                            let indexGheDD = selectingSeats?.findIndex(gheDD => gheDD === ghe);
                            if (indexGheDD != -1) {
                                classGheDangDat = 'seatSelected'
                            }
                            let disable = false;
                            let classOccupied = '';
                            let indexOccupied = occupiedSeats?.findIndex(gheDD => gheDD === ghe);
                            if (indexOccupied != -1) {
                                disable = true;
                                classOccupied = 'seatOccupied'
                            }
                            return <div key={index} className="col-4 flex">
                                <Button disabled={disable} type='link' className={`seat p-0 ${classGheDangDat} ${classOccupied}`}
                                    onClick={() => {
                                        dispatch({
                                            type: DAT_VE,
                                            gheDuocChon: ghe
                                        })
                                    }}
                                >
                                    <small>{ghe}</small>
                                </Button>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        )
    }


    function RenderSeatCodes12() {
        const seatCodes12 = [
            "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12"
        ];
        return (
            <div className="row">
                <div className='col-6 offset-3 mx-auto px-5'>
                    <div className='row seatfloor'>
                        {seatCodes12?.map((ghe, index) => {
                            let classGheDangDat = '';
                            let indexGheDD = selectingSeats?.findIndex(gheDD => gheDD === ghe);
                            if (indexGheDD != -1) {
                                classGheDangDat = 'seatSelected'
                            }
                            let disable = false;
                            let classOccupied = '';
                            let indexOccupied = occupiedSeats?.findIndex(gheDD => gheDD === ghe);
                            if (indexOccupied != -1) {
                                disable = true;
                                classOccupied = 'seatOccupied'
                            }
                            return <div key={index} className="col-4 flex">
                                <Button disabled={disable} type='link' className={`seat p-0 ${classGheDangDat} ${classOccupied}`}
                                    onClick={() => {
                                        dispatch({
                                            type: DAT_VE,
                                            gheDuocChon: ghe
                                        })
                                    }}
                                >
                                    <small>{ghe}</small>
                                </Button>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        )
    }

    function RenderSeatCodes30() {
        const seatCodes30 = [
            "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12", "A13", "A14", "A15",
            "A16", "A17", "A18", "A19", "A20", "A21", "A22", "A23", "A24", "A25", "A26", "A27", "A28", "A29", "A30",
        ];
        return (
            <div className="row">
                <div className='col-6 offset-3 mx-auto px-5'>
                    <div className='row seatfloor'>
                        {seatCodes30?.map((ghe, index) => {
                            let classGheDangDat = '';
                            let indexGheDD = selectingSeats?.findIndex(gheDD => gheDD === ghe);
                            if (indexGheDD != -1) {
                                classGheDangDat = 'seatSelected'
                            }
                            let disable = false;
                            let classOccupied = '';
                            let indexOccupied = occupiedSeats?.findIndex(gheDD => gheDD === ghe);
                            if (indexOccupied != -1) {
                                disable = true;
                                classOccupied = 'seatOccupied'
                            }
                            return <div key={index} className="col-4 flex" style={{ margin: '-4px auto' }}>
                                <Button disabled={disable} type='link' className={`seat p-0 ${classGheDangDat} ${classOccupied}`}
                                    onClick={() => {
                                        dispatch({
                                            type: DAT_VE,
                                            gheDuocChon: ghe
                                        })
                                    }}
                                >
                                    <small>{ghe}</small>
                                </Button>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        )
    }

    function RenderSeatCodes42() {
        const seatCodes42 = [
            "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17", "A18", "A19", "A20", "A21",
            "B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B09", "B10", "B11", "B12", "B13", "B14", "B15", "B16", "B17", "B18", "B19", "B20", "B21"
        ];
        return (
            <div className="row">
                <div className='col-6 px-5'>
                    <h2 className='text-center'>Floor 1</h2>
                    <div className='row seatfloor'>
                        {seatCodes42?.slice(0, 21).map((ghe, index) => {
                            let classGheDangDat = '';
                            let indexGheDD = selectingSeats?.findIndex(gheDD => gheDD === ghe);
                            if (indexGheDD != -1) {
                                classGheDangDat = 'seatSelected'
                            }
                            let disable = false;
                            let classOccupied = '';
                            let indexOccupied = occupiedSeats?.findIndex(gheDD => gheDD === ghe);
                            if (indexOccupied != -1) {
                                disable = true;
                                classOccupied = 'seatOccupied'
                            }
                            return <div key={index} className="col-4 flex">
                                <Button disabled={disable} type='link' className={`seat p-0 ${classGheDangDat} ${classOccupied}`}
                                    onClick={() => {
                                        dispatch({
                                            type: DAT_VE,
                                            gheDuocChon: ghe
                                        })
                                    }}
                                >
                                    <small>{ghe}</small>
                                </Button>
                            </div>
                        })}
                    </div>
                </div>
                <div className='col-6 px-5'>
                    <h2 className='text-center'>Floor 2</h2>
                    <div className='row seatfloor'>
                        {seatCodes42?.slice(21).map((ghe, index) => {
                            let classGheDangDat = '';
                            let indexGheDD = selectingSeats?.findIndex(gheDD => gheDD === ghe);
                            if (indexGheDD != -1) {
                                classGheDangDat = 'seatSelected'
                            }
                            let disable = false;
                            let classOccupied = '';
                            let indexOccupied = occupiedSeats?.findIndex(gheDD => gheDD === ghe);
                            if (indexOccupied != -1) {
                                disable = true;
                                classOccupied = 'seatOccupied'
                            }
                            return <div key={index} className="col-4 flex">
                                <Button disabled={disable} type='link' className={`seat p-0 ${classGheDangDat} ${classOccupied}`}
                                    onClick={() => {
                                        dispatch({
                                            type: DAT_VE,
                                            gheDuocChon: ghe
                                        })
                                    }}
                                >
                                    <small>{ghe}</small>
                                </Button>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        )
    }

    const renderSeatSelected = () => {
        return _.sortBy(selectingSeats).map((gheDD, index) => {
            return (<b key={index} className='mr-1'>{gheDD}</b>).props.children
        }).join(', ')
    }

    const seatLeft = numberOfSeat - occupiedSeats?.length

    const totalMoney = selectingSeats?.length * tripDetail?.ticketPrice

    return (
        <div>
            <div class="alert alert-success" role="alert" style={{height: '135px'}}>
                <div className='row'>
                    <div className="col-6">
                        <Timeline
                            items={[
                                {
                                    color: 'red',
                                    children: (
                                        <>
                                            <div><b>{tripDetail?.fromStation?.name}</b></div>
                                            <div>{dayjs(tripDetail?.startTime).format('DD-MM-YYYY h:mm A')}</div>
                                        </>
                                    ),
                                },
                                {
                                    children: (
                                        <>
                                            <div><b>{tripDetail?.toStation?.name}</b></div>
                                            <div>{dayjs(tripDetail?.finishTime).format('DD-MM-YYYY h:mm A')}</div>
                                        </>
                                    ),
                                },
                            ]}
                        />
                    </div>
                    <div className="pl-5 col-6">
                        <div className='d-flex justify-between'><div>Bus Plate:</div>{tripDetail?.bus?.busPlate}</div>
                        <div className='d-flex justify-between'><div>Bus Type:</div>{tripDetail?.bus?.busType?.name} ({tripDetail?.bus?.busType?.numberOfSeat} seats)</div>
                        <div className='d-flex justify-between'><div>Driver:</div>{tripDetail?.driver?.fullName}</div>
                        <div className='d-flex justify-between'><div>Ticket Price:</div><b>${tripDetail?.ticketPrice}/seat</b></div>
                        <div className='d-flex justify-between'><div>Available:</div><b>{seatLeft} seats left</b></div>
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-3">
                    <ul className="my-10 ml-4 flex flex-wrap">
                        <li className='flex items-center'>
                            <div className="seat mr-2" style={{ width: 25, height: 25 }}></div><small>Available</small>
                        </li>
                        <li className='flex items-center'>
                            <div className="seat seatSelected mr-2" style={{ width: 25, height: 25 }}></div><small>Selecting</small>
                        </li>
                        <li className='flex items-center'>
                            <div className="seat seatOccupied text-gray-400 mr-2" style={{ width: 25, height: 25 }}></div><small>Occupied</small>
                        </li>
                    </ul>
                </div>
                <div className="col-9">
                    <div className="mx-10">
                        {numberOfSeat == 42
                            ? <RenderSeatCodes42 />
                            : numberOfSeat == 30
                                ? <RenderSeatCodes30 />
                                : numberOfSeat == 12
                                    ? <RenderSeatCodes12 />
                                    : <RenderSeatCodes9 />}
                    </div>
                </div>
                <div className="w-100 flex justify-between items-center mt-3 mx-3">
                    <div className="w-100 flex justify-between items-center">
                        <div>You're selecting: <b>{renderSeatSelected()}</b></div>
                        <div className='text-red-400 text-lg font-bold mr-2'>${totalMoney.toLocaleString()}</div>
                    </div>

                    <div className="" style={{ width: 170 }}>
                        {selectingSeats?.length == 0
                            ? <button type="button" disabled className="focus:outline-none text-white bg-purple-300 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm py-2.5 w-full">Continue</button>
                            : <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm py-2.5 w-full"
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