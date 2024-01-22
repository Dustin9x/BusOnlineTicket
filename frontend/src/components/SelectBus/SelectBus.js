import { DatePicker, Select, Form, Input, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getStationListAction } from '../../redux/actions/StationAction';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export default function SelectBus(props) {
  const { arrStation } = useSelector(state => state.StationReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStationListAction())
  }, [dispatch]);

  console.log('props',props)
  let searchParams = new URLSearchParams(props.props.location?.search);

  const [From, setFrom] = useState(searchParams.get('from'));
  const [To, setTo] = useState(searchParams.get('to'));
  const [Date, setDate] = useState(searchParams.get('date') || '');

  const handleFromChange = (value) => {
    setFrom(value);
  };

  const handleToChange = (value) => {
    setTo(value);
  };

  const handleSubmit = (e) => {
    if (From == null || To == null) {
      notification.error({
        closeIcon: true,
        message: 'Error',
        description: (
          <>Please fill in 'Leaving from' and "Going to" to perfrom search!</>
        )
      });
    };
  }

  const swapStation = () => {
    setFrom(To);
    setTo(From);
  }

  return (
    <div className="w-100 p-2 rounded-xl bg-white">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        method="get"
        className=" w-100"
        action={`/search`}
      >
        <h4 className="w-100 text-left" style={{ color: "#1867aa" }} >
          Bus Ticket & Bus Schedule in whole Vietnam
        </h4>
        <div className="autocomplete  br3 cf w-100 flex flex-wrap justify-center">
          <div className="d-flex w-100 justify-around" >

            <div className="w-80" >
              <Form.Item>
                <Select
                  size={"large"}
                  id="fromFocus"
                  style={{ minWidth: '100%' }}
                  showSearch
                  value={From} required 
                  placeholder="Leaving from"
                  options={arrStation?.map((item, index) => ({ key: index, label: item.name, value: item.name }))}
                  onChange={handleFromChange}
                />
                <Input type="hidden" name="from" value={From} />
              </Form.Item>

            </div>

            <div id="btn" className="w-10 br3 mb0-l mb2-m flex justify-center items-center bg-white dim pointer" style={{ height: "3em", borderRadius: ".5rem !important", cursor: "pointer" }}  >
              <i onClick={swapStation} className="fas fa-exchange-alt pointer"></i>
            </div>

            <div className="w-80">
              <Select
                value={To}
                name="to"
                size={"large"}
                id="toFocus"
                style={{ minWidth: '100%' }}
                showSearch
                placeholder="Going to" options={arrStation?.map((item, index) => ({ key: index, label: item.name, value: item.name }))}
                onChange={handleToChange}
              />
              <Input type="hidden" name="to" value={To} />
            </div>

            <div className="ml-3" >
              <DatePicker
                name="date"
                defaultValue={Date && dayjs(Date, "DD-MM-YYYY")}
                format={"DD-MM-YYYY"}
                id="dateFocus"
                size="large"
                type="date"
                className="w-60"
                placeholder="Journey date"
              />
            </div>
          </div>

          <div>
            <button
              className="w-100 px-5 py-2 mt-3 flex items-center focus:outline-none  rounded-full font-semibold  bg-red-50 text-red-700 hover:bg-red-100 focus:bg-red-500 active:bg-red-500 focus:text-white"
              type="submit"
            >
              <i className="fas fa-bus f3 mr-2"></i>
              Search Buses
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
