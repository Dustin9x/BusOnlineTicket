import { DatePicker, Input } from "antd";
import React, { useEffect, useRef } from "react";
import { EnvironmentOutlined } from '@ant-design/icons';

export default function SelectBus(props) {
  useEffect(() => { }, []);

  return (
    <div className="w-100 p-4 rounded-xl bg-white">
      <div className="w-100" style={{ color: "#1867aa" }} id="Infos"></div>
      <form autocomplete="off" className=" w-100" action="/bus/schedule/">
        <div className="autocomplete  br3 cf w-100 flex flex-wrap justify-center">
          <h4 className="tc-l tl f4 w-100 ttn" style={{ color: "#1867aa" }}>
            Bus Ticket & Bus Schedule in whole Vietnam
          </h4>
          <div className="d-flex w-100 justify-around">
            <div className="w-80">
              <Input size="large" placeholder="From" prefix={<EnvironmentOutlined />} />
            </div>

            <div
              id="btn"
              onclick="changeValue()"
              className="w-10 br3 mb0-l mb2-m flex justify-center items-center bg-white dim pointer"
              style={{ height: "2.5em", borderRadius: ".5rem !important" }}
            >
              <a className="f3"> <i class="fas fa-exchange-alt" style={{ color: "#f8c300 !important" }} ></i> </a>
            </div>
            <div className="w-80">
              <Input size="large" placeholder="To" prefix={<EnvironmentOutlined />} />
            </div>
            <div className="ml-3">
              <DatePicker size="large" className="w-60" placeholder="Departure date" onChange={""} />
            </div>
          </div>


          <div>
            <button
              className="w-100 px-5 py-2 mt-3 flex items-center focus:outline-none  rounded-full font-semibold  bg-red-50 text-red-700 hover:bg-red-100 focus:bg-red-500 active:bg-red-500 focus:text-white"
              type="submit"
              value="Search Ticket"
            >
              <span class="pl2">
                <i className="fas fa-bus f3"></i>
              </span>
              <span className="ml-2 flex-auto">Search Buses</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
