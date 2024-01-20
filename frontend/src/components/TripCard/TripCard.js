import { Card, Modal } from "antd"
import { DOMAIN } from "../../util/settings/config"
import { useState } from "react";
import SeatMap from "../SeatMap/SeatMap";


export default function TripCard(props) {
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

    return (
        <div>
            <Card hoverable style={{ marginBottom: 10 }}>
                <div class="row">
                    <div style={{ position: "absolute", right: 20, top: 20 }}>
                        <p className="text-center font-bold text-2xl text-green-800">
                            ${tripDetail.ticketPrice}
                        </p>
                    </div>
                    <div className="col-3">
                        <img src={`${DOMAIN}/Images/Trip/${tripDetail.image}`} alt="" />
                    </div>
                    <div className="col-9">
                        <h3 className="text-2xl">{tripDetail.fromStation.name} -{tripDetail.toStation.name}</h3>
                        <p>{tripDetail.bus.busType.name} {tripDetail.bus.busType.numberOfSeat}{" "}seats</p>
                        <div class="d-flex">
                            <div class="hour font-bold mr-1">
                                <i class="fa-solid fa-circle-dot fa-sm w-4"></i>
                                {tripDetail.startTime}
                            </div>
                            <div class="place">• {tripDetail.fromStation.name}</div>
                        </div>
                        <div class="d-flex">
                            <div class="hour font-bold mr-1">
                                <i class="fa-solid fa-location-dot w-4"></i>
                                {tripDetail.finishTime}
                            </div>
                            <div class="place">•{tripDetail.toStation.name}</div>
                        </div>
                        <h3 className="mt-3 font-bold text-emerald-800">
                            {hours} Hours
                        </h3>
                        <div style={{ position: "absolute", right: 10, bottom: 0 }}>
                            <p className="text-center">Only 3 seats left</p>
                            <button
                                className="px-5 py-2 mt-3 flex items-center focus:outline-none  rounded-full font-semibold  bg-red-50 text-red-700 hover:bg-red-100 focus:bg-red-500 active:bg-red-500 focus:text-white"
                                type="submit"
                                onClick={showModal}
                            >
                                <span class="pl2">
                                    <i className="fas fa-bus f3"></i>
                                </span>
                                <span className="ml-2 flex-auto">Book</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
            <Modal title="Seat Map" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <SeatMap tripId={tripDetail.id} tripDetail={tripDetail} />
            </Modal>
        </div>

    )
}