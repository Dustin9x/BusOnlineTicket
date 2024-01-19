import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTripByIdAction } from "../../redux/actions/TripAction";
import { Button } from "antd";
import { DAT_VE } from "../../redux/constants";


export default function SeatMap(props) {
    const { selectingSeats } = useSelector(state => state.OrderReducer)
    const { tripDetail } = useSelector(state => state.TripReducer)
    const dispatch = useDispatch();
    let { tripId } = props
    useEffect(() => {
        dispatch(getTripByIdAction(tripId))
    }, [])

    let numberOfSeat = 9;
            

    let occupiedSeats = tripDetail?.seats?.map(s => s.name);

    function RenderSeatCodes9 () {
        const seatCodes9 = [
            "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09"
        ];
        return (
            <div className="row">
                <div className='col-6 offset-3 mx-auto px-5'>
                    <div className='row mt-15'>
                        {seatCodes9?.map((ghe, index) => {
                            let classSelecting = '';
                            let indexSelectSeat = selectingSeats?.findIndex(gheDD => gheDD === ghe);
                            if (indexSelectSeat != -1) {
                                classSelecting = 'seatSelected'
                            }

                            let classOccupied = '';
                            let indexOccupied = occupiedSeats?.findIndex(gheDD => gheDD === ghe);
                            if (indexOccupied != -1) {
                                classOccupied = 'seatOccupied'
                            }

                            return <div key={index} className="col-4 flex">
                                <Button disabled={indexOccupied != -1} type='link' className={`seat my-5 p-0 ${classSelecting} ${classOccupied}`}
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


    function RenderSeatCodes12 () {
        const seatCodes12 = [
            "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12"
        ];
        return (
            <div className="row">
                <div className='col-6 offset-3 mx-auto px-5'>
                    <div className='row'>
                        {seatCodes12?.map((ghe, index) => {
                            let classSelecting = '';
                            let indexSelectSeat = selectingSeats?.findIndex(gheDD => gheDD === ghe);
                            if (indexSelectSeat != -1) {
                                classSelecting = 'seatSelected'
                            }

                            let classOccupied = '';
                            let indexOccupied = occupiedSeats?.findIndex(gheDD => gheDD === ghe);
                            if (indexOccupied != -1) {
                                classOccupied = 'seatOccupied'
                            }

                            return <div key={index} className="col-6 flex">
                                <Button disabled={indexOccupied != -1} type='link' className={`seat p-0 ${classSelecting} ${classOccupied}`}
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
    
    function RenderSeatCodes30 () {
        const seatCodes30 = [
            "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12", "A13", "A14", "A15",
            "A16", "A17", "A18", "A19", "A20", "A21", "A22", "A23", "A24", "A25", "A26", "A27", "A28", "A29", "A30",
        ];
        return (
            <div className="row">
                <div className='col-6 offset-3 mx-auto px-5'>
                    <div className='row'>
                        {seatCodes30?.map((ghe, index) => {
                            let classSelecting = '';
                            let indexSelectSeat = selectingSeats?.findIndex(gheDD => gheDD === ghe);
                            if (indexSelectSeat != -1) {
                                classSelecting = 'seatSelected'
                            }

                            let classOccupied = '';
                            let indexOccupied = occupiedSeats?.findIndex(gheDD => gheDD === ghe);
                            if (indexOccupied != -1) {
                                classOccupied = 'seatOccupied'
                            }

                            return <div key={index} className="col-4 flex">
                                <Button disabled={indexOccupied != -1} type='link' className={`seat p-0 ${classSelecting} ${classOccupied}`}
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

    function RenderSeatCodes40 () {
        const seatCodes40 = [
            "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17", "A18", "A19", "A20", "A21",
            "B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B09", "B10", "B11", "B12", "B13", "B14", "B15", "B16", "B17", "B18", "B19", "B20", "B21"
        ];
        return (
            <div className="row">
                <div className='col-6 px-5'>
                    <h2 className='text-center'>Floor 1</h2>
                    <div className='row'>

                        {seatCodes40?.slice(0, 21).map((ghe, index) => {
                            let classSelecting = '';
                            let indexSelectSeat = selectingSeats?.findIndex(gheDD => gheDD === ghe);
                            if (indexSelectSeat != -1) {
                                classSelecting = 'seatSelected'
                            }

                            let classOccupied = '';
                            let indexOccupied = occupiedSeats?.findIndex(gheDD => gheDD === ghe);
                            if (indexOccupied != -1) {
                                classOccupied = 'seatOccupied'
                            }

                            return <div key={index} className="col-4 flex">
                                <Button disabled={indexOccupied != -1} type='link' className={`seat p-0 ${classSelecting} ${classOccupied}`}
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
                        {seatCodes40?.slice(21).map((ghe, index) => {
                            let classGheDangDat = '';
                            let indexGheDD = selectingSeats?.findIndex(gheDD => gheDD === ghe);
                            if (indexGheDD != -1) {
                                classGheDangDat = 'seatSelected'
                            }
                            let classOccupied = '';
                            let indexOccupied = occupiedSeats?.findIndex(gheDD => gheDD === ghe);
                            if (indexOccupied != -1) {
                                classOccupied = 'seatOccupied'
                            }
                            return <div key={index} className="col-4 flex">
                                <Button disabled={ghe.nguoiDat} type='link' className={`seat p-0 ${classGheDangDat} ${classOccupied}`}
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

    return (
        <div className="row">
            {numberOfSeat == 40 
            ? <RenderSeatCodes40/> 
            : numberOfSeat == 30 
                ? <RenderSeatCodes30/> 
                : numberOfSeat == 12 
                    ? <RenderSeatCodes12/>
                    : <RenderSeatCodes9/>}
        </div>
    )
}