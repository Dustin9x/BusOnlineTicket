import React, { useEffect, useState, useLocation } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Radio, Checkbox, Slider, Empty, AutoComplete } from "antd";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import SelectBus from "../../components/SelectBus/SelectBus";
import { getTripListOptionsAction } from "../../redux/actions/TripAction";
import { DOMAIN } from "../../util/settings/config";

const setInput = {
  sort: "",
  BusType: "",
  fromPrice: 0,
  toPrice: "",
  from: "",
  to: "",
  dayStart: "",
};

export default function Search(props) {
  const dispatch = useDispatch();

  // let searchValue = props.location.search.slice(
  //   8,
  //   props.location.search.length
  // );
  let { from } = useParams();
  let { to } = useParams();
  let { date } = useParams();

  useEffect(() => {
    setInput.from = from;
    setInput.to = to;
    setInput.dayStart = date;

    dispatch(getTripListOptionsAction(setInput));
  }, []);

  // const { Meta } = Card;

  const { arrTrip } = useSelector((state) => state.TripReducer);
  console.log("arr", arrTrip.length);

  const marks = {
    1: {
      label: <small>1 $</small>,
    },
    10000: {
      style: { color: "#f50" },
      label: <small>10.000$</small>,
    },
  };

  const handleOnChangeSort = (e) => {
    setInput.sort = e.target.value;
    console.log("check filter: ", setInput);
    dispatch(getTripListOptionsAction(setInput));
  };
  const handleOnChangeFilter = (event) => {
    if (event.target.checked && event.target.value != "undefine") {
      setInput.BusType += event.target.value + ",";
      console.log("check setInput.BusType1: ", setInput.BusType);
    } else {
      setInput.BusType = setInput.BusType.replace(event.target.value + ",", "");
      console.log("check setInput.BusType2: ", setInput.BusType);
    }
    console.log("check filter: ", setInput);

    dispatch(getTripListOptionsAction(setInput));
  };

  const handleOnChangePrice = (e) => {
    setInput.fromPrice = e[0];
    setInput.toPrice = e[1];
    console.log("check filter: ", setInput);
    dispatch(getTripListOptionsAction(setInput));
  };

  return (
    <div className="container" style={{ maxWidth: 1200 }}>
      <Card className="mx-2 mt-3">
        <SelectBus />
      </Card>

      <div class="flex flex-row flex-wrap py-4">
        <aside class="w-full sm:w-1/3 md:w-1/4 px-2">
          <Card title="Sort" onChange={(e) => handleOnChangeSort(e)}>
            <Radio.Group>
              {" "}
              {/* Enclose radio buttons within Radio.Group */}
              <Radio value="earliest-departure">Earliest departure</Radio>
              <Radio value="latest-departure">Latest departure</Radio>
              <Radio value="lowest-price">Lowest price</Radio>
              <Radio value="highest-price">Highest price</Radio>
              <Radio value="none">None</Radio>
            </Radio.Group>
          </Card>
          <Card title="Filter" className="mt-3">
            <Slider
              range
              marks={marks}
              step={5}
              min={1}
              max={10000}
              onChangeComplete={(e) => handleOnChangePrice(e)}
              defaultValue={[1000, 8000]}
              className="mx-4 mb-5"
            />
            {/* ...Other code... */}
            <Checkbox value="Express" onChange={(e) => handleOnChangeFilter(e)}>
              Express
            </Checkbox>
            <br />
            <Checkbox value="Luxury" onChange={(e) => handleOnChangeFilter(e)}>
              Luxury
            </Checkbox>
            <br />
            <Checkbox
              value="Volvo Non-AC"
              onChange={(e) => handleOnChangeFilter(e)}
            >
              Volvo Non-AC
            </Checkbox>
            <br />
            <Checkbox
              value="Volvo AC"
              onChange={(e) => handleOnChangeFilter(e)}
            >
              Volvo AC
            </Checkbox>
          </Card>
        </aside>
        <main role="main" class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
          {arrTrip.length > 0 ? (
            arrTrip?.map((item, index) => {
              const hours =
                (new Date(item.finishTime).getTime() -
                  new Date(item.startTime).getTime()) /
                (1000 * 60 * 60);
              return (
                <Card hoverable style={{ marginBottom: 10 }}>
                  <div class="row">
                    <div style={{ position: "absolute", right: 20, top: 20 }}>
                      <p className="text-center font-bold text-2xl text-green-800">
                        {item.ticketPrice} $
                      </p>
                    </div>
                    <div className="col-3">
                      <img src={`${DOMAIN}/Images/Trip/${item.image}`} alt="" />
                    </div>
                    <div className="col-9">
                      <h3 className="text-2xl">
                        {item.fromStation.name} -{item.toStation.name}
                      </h3>
                      <p>
                        {item.bus.busType.name} {item.bus.busType.numberOfSeat}{" "}
                        seats
                      </p>
                      <div class="d-flex">
                        <div class="hour font-bold mr-1">
                          <i class="fa-solid fa-circle-dot fa-sm w-4"></i>
                          {item.startTime}
                        </div>
                        <div class="place">• {item.fromStation.name}</div>
                      </div>
                      <div class="d-flex">
                        <div class="hour font-bold mr-1">
                          <i class="fa-solid fa-location-dot w-4"></i>
                          {item.finishTime}
                        </div>
                        <div class="place">•{item.toStation.name}</div>
                      </div>
                      <h3 className="mt-3 font-bold text-emerald-800">
                        {hours} Hours
                      </h3>
                      <div
                        style={{ position: "absolute", right: 10, bottom: 0 }}
                      >
                        <p className="text-center">Only 3 seats left</p>
                        <button
                          className="px-5 py-2 mt-3 flex items-center focus:outline-none  rounded-full font-semibold  bg-red-50 text-red-700 hover:bg-red-100 focus:bg-red-500 active:bg-red-500 focus:text-white"
                          type="submit"
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
              );
            })
          ) : (
            <Card hoverable>
              <div
                class="row"
                style={{ justifyContent: "center", height: 400 }}
              >
                <Empty style={{ marginTop: 100 }} />
              </div>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
