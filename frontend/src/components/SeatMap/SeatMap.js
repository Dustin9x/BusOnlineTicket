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

    let occupiedSeats = tripDetail?.seats?.map(s => s.name);
    const seatCodes = [
        "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12", "A13", "A14", "A15",
        "B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B09", "B10", "B11", "B12", "B13", "B14", "B15",
    ];

    return (
        <div className="row">
            <div className='col-6 px-5'>
                <h2 className='text-center'>Floor 1</h2>
                <div className='row'>

                    {seatCodes?.slice(0, 15).map((ghe, index) => {
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
                    {seatCodes?.slice(15, 30).map((ghe, index) => {
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