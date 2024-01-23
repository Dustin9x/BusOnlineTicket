import { Badge, Descriptions, Form, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { checkTicketAction } from "../../redux/actions/OrderAction";
import dayjs from "dayjs";
import { values } from 'lodash';
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)


export default function CheckTicket() {
  const dispatch = useDispatch()
  const [code, setCode] = useState(null)
  const { ticketDetail } = useSelector(state => state.OrderReducer)

  const handleOnChange = (e) => {
    const searchCode = e.target.value;
    setCode(searchCode.trim());

  }

  const handleSubmit = () => {
    if (code !== null) {
      dispatch(checkTicketAction(code.split(' ')));
    }
  }

  let remainHour = dayjs(ticketDetail?.trips?.startTime).diff(dayjs(new Date()), 'hour')


  return (
    <div className="w-100 p-4 rounded-xl bg-white">

      <div>
        <div className="autoComplete w-100 justify-center">
          <h4 className="tc-l tl f4 w-100 ttn" style={{ color: "#1867aa" }}>
            Checking your Bus Ticket here
          </h4>
          <div className="d-flex w-100">
            <div style={{ flex: 1 }}>
              <Input size="large" onChange={handleOnChange} value={code} placeholder="Input your ticket number" prefix={<SearchOutlined />} />
            </div>
            <button
              className="ml-5 px-5 py-2 flex items-center focus:outline-none  rounded-full font-semibold  bg-red-50 text-red-700 hover:bg-red-100 focus:bg-red-500 active:bg-red-500 focus:text-white"
              type="submit"
              value="Search Ticket"
              onClick={handleSubmit}
            >
              <span className="pl2">
                <i className="fa-solid fa-ticket"></i>
              </span>
              <span className="ml-2 flex-auto">Check ticket</span>
            </button>
          </div>
        </div>
      </div>

      {ticketDetail != null && ticketDetail != "undefined" ? <div className="pt-3">
        <Descriptions title="Ticket Info">
          <Descriptions.Item label="Customer">{ticketDetail.users.email}</Descriptions.Item>
          <Descriptions.Item label="Seat List">{ticketDetail.seatsList}</Descriptions.Item>
          <Descriptions.Item label="Route">{ticketDetail.trips.fromStation.name} - {ticketDetail.trips.toStation.name}</Descriptions.Item>
          <Descriptions.Item label="Departure Time">{dayjs(ticketDetail.trips.startTime).format("DD-MM-YYYY h:mm A")}</Descriptions.Item>
          <Descriptions.Item label="Arrival Time">{dayjs(ticketDetail.trips.finishTime).format("DD-MM-YYYY h:mm A")}</Descriptions.Item>
          <Descriptions.Item label="Bus Number">{ticketDetail.trips.bus.busPlate}</Descriptions.Item>
          <Descriptions.Item label="Status"><span className="text-green-500 font-semibold">{remainHour < 0 ? "Your bus already departed" : `Your bus is going to depart on next ${remainHour} hour(s)`}</span>  </Descriptions.Item>
        </Descriptions>
      </div> : ""}

    </div>
  )
}