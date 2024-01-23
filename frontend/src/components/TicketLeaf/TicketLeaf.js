import { QRCode } from "antd"
import dayjs from "dayjs"
import { useSelector } from "react-redux"


export default function TicketLeaf(props) {
    const { ticket } = useSelector(state => state.OrderReducer)
    const { donHang } = props

    console.log('ticket da dat',ticket)
    return (
        <div>
            <div className="card cardLeft">
                {/* <h1>Trip: <span className='font-bold'>PHTV{donHang?.tripId}</span></h1> */}
                <h1>Trip: <span className='font-bold'>PHTV{ticket?.Id}</span></h1>
                <div className="title">
                    <span>Route</span>
                    <h2>{donHang?.fromStation} - {donHang?.toStation}</h2>
                </div>
                <div className="name">
                    <span>Customer</span>
                    <h2>{donHang?.email}</h2>
                </div>
                <div className='row'>
                    <div className='col-4'>
                        <div className="seatList">
                            <span>seat</span>
                            <h2>{donHang?.seatList}</h2>
                        </div>
                        <div className="time">
                            <span>Time</span>
                            <h2>{dayjs(donHang?.startTime).format('DD-MM-YYYY h:mm A')}</h2>
                        </div>
                    </div>
                    <div className='col-8'>
                        <div className="time">
                            <span>Note</span>
                            <h2>{donHang.Note}</h2>
                        </div>
                    </div>
                </div>


            </div>
            <div className="card cardRight">
                <div className="eye" />
                <div className="number">
                    <span>seat</span>
                    <h3>{donHang?.seatList}</h3>
                </div>
                <QRCode size={110} className='mx-auto' value={
                    'Ticket: ' + donHang?.email +
                    ', Route: ' + donHang?.fromStation + ' ' + donHang?.toStation +
                    ', Day: ' + dayjs(donHang?.startTime).format('DD-MM-YYYY') +
                    ', Seat: ' + donHang?.seatList +
                    ', Note: ' + donHang?.Note
                } />
            </div>
        </div>
    )
}