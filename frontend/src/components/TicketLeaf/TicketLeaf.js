import { QRCode } from "antd"
import dayjs from "dayjs"
import './Ticket.css'

export default function TicketLeaf(props) {
    const { donHang } = props

    const code = donHang?.code;
    const fromStation = donHang?.fromStation || donHang?.trips?.fromStation.name;
    const toStation = donHang?.toStation || donHang?.trips?.toStation.name;
    const email = donHang?.email || donHang?.users?.email;
    const bookDate = donHang?.bookDate;
    const seatList = donHang?.seatsList;
    const startTime = donHang?.startTime || donHang.trips.startTime;
    const note = donHang?.note;

    return (
        <div className="flex justify-center">
            <div className="card cardLeft">
                <h1>Code: <span className='font-bold'>{code}</span></h1>
                <div className="row mt-1">
                    <div className="col-5">
                        <div className="title">
                            <span>Route</span>
                            <h2>{fromStation} - {toStation}</h2>
                        </div>
                    </div>
                    <div className="col-7">
                        <div className="title">
                            <span>Booking date</span>
                            <h2>{dayjs(bookDate).format('DD-MM-YYYY h:mm A')}</h2>
                        </div>
                    </div>
                </div>

                <div className="name">
                    <span>Customer</span>
                    <h2>{email}</h2>
                </div>
                <div className='row'>
                    <div className='col-5'>
                        <div className="seatList w-full">
                            <span>seat</span>
                            <h2>{seatList}</h2>
                        </div>
                        <div className="time w-full">
                            <span>Departure Time</span>
                            <h2>{dayjs(startTime).format('DD-MM-YYYY h:mm A')}</h2>
                        </div>
                    </div>
                    <div className='col-7'>
                        <div className="time">
                            <span>Note</span>
                            <h2>{note}</h2>
                        </div>
                    </div>
                </div>


            </div>
            <div className="card cardRight">
                <div className="eye" />
                <div className="number">
                    <span>seat</span>
                    <h3>{seatList}</h3>
                </div>
                <QRCode size={110} className='mx-auto' value={
                    'Ticket: ' + email +
                    ', Route: ' + fromStation + ' ' + toStation +
                    ', Day: ' + dayjs(startTime).format('DD-MM-YYYY') +
                    ', Seat: ' + seatList +
                    ', Note: ' + note
                } />
            </div>
        </div>
    )
}