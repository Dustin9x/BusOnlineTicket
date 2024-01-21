import { Card, Modal } from "antd"
import { DOMAIN } from "../../util/settings/config"
import { useState } from "react";
import SeatMap from "../SeatMap/SeatMap";
import { useDispatch } from "react-redux";
import { DELETE_SELECTING_SEATS } from "../../redux/constants";


export default function TripCard(props) {
    const dispatch = useDispatch();
    let { tripDetail } = props

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const hours = (new Date(tripDetail.finishTime).getTime() - new Date(tripDetail.startTime).getTime()) / (1000 * 60 * 60);

    const numberOfSeat = tripDetail?.bus?.busType?.numberOfSeat;
    const occupiedSeats = tripDetail?.seats && Object.keys(tripDetail?.seats).length;
    const seatLeft = numberOfSeat - occupiedSeats;

    return (
        <div>
            <Card hoverable style={{ marginBottom: 10 }}>
                <div className="row">
                    <div style={{ position: "absolute", right: 20, top: 20 }}>
                        <p className="text-center font-bold text-2xl text-green-800">
                            {tripDetail.ticketPrice.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                        </p>
                    </div>
                    <div className="col-3">
                        <img className="w-100 h-100 object-fit-cover border rounded" src={`${DOMAIN}/Images/Trip/${tripDetail.image}`} alt={tripDetail.image} />
                    </div>
                    <div className="col-9">
                        <h3 className="text-2xl">{tripDetail.fromStation.name} - {tripDetail.toStation.name}</h3>
                        <p>{tripDetail.bus.busType.name} {tripDetail.bus.busType.numberOfSeat} seats</p>
                        <div className="d-flex">
                            <div className="hour font-bold mr-1">
                                <i className="fa-solid fa-circle-dot fa-sm w-4"></i>
                                {tripDetail.startTime}
                            </div>
                            <div className="place">• {tripDetail.fromStation.name}</div>
                        </div>
                        <div className="d-flex">
                            <div className="hour font-bold mr-1">
                                <i className="fa-solid fa-location-dot w-4"></i>
                                {tripDetail.finishTime}
                            </div>
                            <div className="place">• {tripDetail.toStation.name}</div>
                        </div>
                        <h3 className="mt-3 font-bold text-emerald-800">
                            {hours} Hours
                        </h3>
                        <div style={{ position: "absolute", right: 10, bottom: 0 }}>
                            <p className="text-center">{seatLeft} seats left</p>
                            <button
                                className="px-5 py-2 flex items-center focus:outline-none  rounded-full font-semibold  bg-red-50 text-red-700 hover:bg-red-100 focus:bg-red-500 active:bg-red-500 focus:text-white"
                                type="submit"
                                onClick={showModal}
                            >
                                <span className="pl2">
                                    <i className="fas fa-bus f3"></i>
                                </span>
                                <span className="ml-2 flex-auto">Book Now</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
            <Modal
                title={`Trip Code: PHTV${tripDetail.id}`}
                open={isModalOpen}
                destroyOnClose={true}
                width={800}
                onOk={handleOk}
                onCancel={handleCancel}
                afterClose={()=>{
                    dispatch({
                        type: DELETE_SELECTING_SEATS
                    })
                }}
                footer={null}
            >
                <SeatMap tripId={tripDetail.id} tripDetail={tripDetail}/>
            </Modal>
        </div>

    )
}