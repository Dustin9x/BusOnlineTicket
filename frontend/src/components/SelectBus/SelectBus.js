import { DatePicker, Input,Select,Form } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EnvironmentOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { getStationListAction } from '../../redux/actions/StationAction';
import { formatTimeStr } from "antd/es/statistic/utils";
import dayjs from "dayjs";

export default function SelectBus(props) {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStationListAction())
  }, []);

  let { arrStation } = useSelector(state => state.StationReducer);
  let { from } = useParams();
  let { to } = useParams();
  let { date } = useParams();


  const [From, setFrom] = useState(from!="undefined"?from:null);
  const [To, setTo] = useState(to!="undefined"?to:null);
  const [Date, setDate] = useState(date!="undefined"?date:null);

  
  const handleFromChange = (value) => {
    setFrom(value);
  };
  const handleToChange = (value) => {
    setTo(value);
  };
  const handleDateChange = (date, dateString) => {
  
    if(dateString==""){
      setDate(null);
    }
    else{
      setDate(dateString);
    }
  };
  const handleSubmit = (e) => {
    if(From==null){
      alert("from is required");
      e.preventDefault();
      return;
    }
    if(To==null){
      alert("from is required");
      e.preventDefault();
      return;
    }
    if(Date==null){
      alert("Date is required");
      e.preventDefault();
      return;
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
            
               <Form.Item
                style={{ minWidth: '100%' }}
                rules={[
                  {
                    required: true,
                    message: 'To Station is required!',
                    transform: (value) => value.trim(),
                  },
                ]}
               >
                  <Select    
                    showSearch
                    value={From} required placeholder="Leaving from" 
                    options={arrStation?.map((item, index) => ({ key: index, label: item.name, value: item.name }))}  
                    onChange={handleFromChange}/>
              </Form.Item>
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
                 <Form.Item
                  style={{ minWidth: '100%' }}
                  rules={[
                        {
                          required: true,
                          message: 'To Station is required!',
                          transform: (value) => value.trim(),
                        },
                      ]}
                    >
                    <Select value={To} 
                    showSearch
                    placeholder="Going to"   options={arrStation?.map((item, index) => ({ key: index, label: item.name, value: item.name }))}   
                    onChange={handleToChange}/>
                  </Form.Item>
            </div>
            <div className="ml-3">
              <DatePicker
                value={Date!=null?dayjs(Date):""}
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
