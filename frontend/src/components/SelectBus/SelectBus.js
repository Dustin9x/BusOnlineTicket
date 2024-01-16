import { DatePicker, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EnvironmentOutlined } from "@ant-design/icons";

export default function SelectBus(props) {
  useEffect(() => {}, []);
  let { from } = useParams();
  let { to } = useParams();
  let { date } = useParams();

  const [From, setFrom] = useState(from);
  const [To, setTo] = useState(to);
  const [Date, setDate] = useState(date);
  const handleFromChange = (event) => {
    setFrom(event.target.value);
    console.log("trim:  ", "aaa ccc");
  };
  const handleToChange = (event) => {
    setTo(event.target.value);
  };
  const handleDateChange = (date, dateString) => {
    setDate(dateString);
  };
  const handleSubmit = (e) => {
    if (From.trim() === "") {
      alert("Sorry, Leaving from is required!!");
      e.preventDefault();
      return;
    }
    if (To.trim() === "") {
      alert("Sorry, Going to is required!!");
      e.preventDefault();
      return;
    }
    if (Date.trim() === "") {
      alert("Sorry, Journey date to is required!!");
      e.preventDefault();
      return;
    } else {
    }
  };
  return (
    <div className="w-100 p-2 rounded-xl bg-white">
      <form
        onSubmit={handleSubmit}
        autocomplete="off"
        className=" w-100"
        action={`/search/${From}/${To}/${Date}`}
      >
        <h4 className="w-100 text-left" style={{ color: "#1867aa" }}>
          Bus Ticket & Bus Schedule in whole Vietnam
        </h4>
        <div className="autocomplete  br3 cf w-100 flex flex-wrap justify-center">
          <div className="d-flex w-100 justify-around">
            <div className="w-80">
              <Input
                size="large"
                placeholder="Leaving from"
                prefix={<EnvironmentOutlined />}
                value={From}
                onChange={handleFromChange}
              />
            </div>

            <div
              id="btn"
              onclick="changeValue()"
              className="w-10 br3 mb0-l mb2-m flex justify-center items-center bg-white dim pointer"
              style={{ height: "2.5em", borderRadius: ".5rem !important" }}
            >
              <a className="f3">
                {" "}
                <i
                  className="fas fa-exchange-alt"
                  style={{ color: "#f8c300 !important" }}
                ></i>{" "}
              </a>
            </div>
            <div className="w-80">
              <Input
                size="large"
                placeholder="Going to"
                prefix={<EnvironmentOutlined />}
                value={To}
                onChange={handleToChange}
              />
            </div>
            <div className="ml-3">
              <DatePicker
                size="large"
                type="date"
                className="w-60"
                placeholder="Journey date"
                onChange={handleDateChange}
              />
            </div>
          </div>

          <div>
            <button
              className="w-100 px-5 py-2 mt-3 flex items-center focus:outline-none  rounded-full font-semibold  bg-red-50 text-red-700 hover:bg-red-100 focus:bg-red-500 active:bg-red-500 focus:text-white"
              type="submit"
              value="Search Ticket"
            >
              <span className="pl2">
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
