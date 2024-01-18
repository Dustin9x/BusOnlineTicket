import { Badge, Descriptions, Input } from "antd";
import React, { useEffect, useRef } from "react";
import { SearchOutlined } from '@ant-design/icons';


export default function CheckTicket() {

  return (
    <div className="w-100 p-4 rounded-xl bg-white">
      <form autoComplete="off" className=" w-100" action="/bus/schedule/">
        <div className="autoComplete w-100 justify-center">
          <h4 className="tc-l tl f4 w-100 ttn" style={{ color: "#1867aa" }}>
            Checking your Bus Ticket here
          </h4>
          <div className="d-flex w-100">
            <div style={{ flex: 1 }}>
              <Input size="large" placeholder="Input your ticket number" prefix={<SearchOutlined />} />
            </div>
            <button
              className="ml-5 px-5 py-2 flex items-center focus:outline-none  rounded-full font-semibold  bg-red-50 text-red-700 hover:bg-red-100 focus:bg-red-500 active:bg-red-500 focus:text-white"
              type="submit"
              value="Search Ticket"
            >
              <span className="pl2">
                <i className="fa-solid fa-ticket"></i>
              </span>
              <span className="ml-2 flex-auto">Check ticket</span>
            </button>
          </div>
        </div>
      </form>
      <div className="pt-3">
        <Descriptions title="Ticket Info">
          <Descriptions.Item label="Customer">Nguyen Van An</Descriptions.Item>
          <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
          <Descriptions.Item label="Route">Ho Chi Minh - Da Nang</Descriptions.Item>
          <Descriptions.Item label="Departure Time">12:00 15-12-2023</Descriptions.Item>
          <Descriptions.Item label="Arrival Time">12:00 16-12-2023</Descriptions.Item>
          <Descriptions.Item label="Bus Number">59A1-56789</Descriptions.Item>
          <Descriptions.Item label="Status"><span  className="text-red-500 font-semibold">Already departed</span>  </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  )
}