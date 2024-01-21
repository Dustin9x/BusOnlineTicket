import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Radio, Checkbox, Slider } from "antd";
import { useParams } from "react-router-dom";
import SelectBus from "../../components/SelectBus/SelectBus";
import { getTripListOptionsAction } from "../../redux/actions/TripAction";
import TripCard from "../../components/TripCard/TripCard";

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
  let { from, to, date } = useParams();

  useEffect(() => {
    setInput.from = from;
    setInput.to = to;
    setInput.dayStart = date;

    dispatch(getTripListOptionsAction(setInput));
  }, [dispatch]);

  const { arrTrip } = useSelector((state) => state.TripReducer);

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
    dispatch(getTripListOptionsAction(setInput));
  };

  const handleOnChangeFilter = (event) => {
    if (event.target.checked && event.target.value != "undefine") {
      setInput.BusType += event.target.value + ",";
    } else {
      setInput.BusType = setInput.BusType.replace(event.target.value + ",", "");
    }

    dispatch(getTripListOptionsAction(setInput));
  };

  const handleOnChangePrice = (e) => {
    setInput.fromPrice = e[0];
    setInput.toPrice = e[1];
    dispatch(getTripListOptionsAction(setInput));
  };

  return (
    <div className="container" style={{ maxWidth: 1200 }}>
      <Card className="mx-2 mt-3">
        <SelectBus />
      </Card>

      <div className="flex flex-row flex-wrap py-4">
        <div className="w-full sm:w-1/3 md:w-1/4 px-2">
          <Card title="Sort" onChange={(e) => handleOnChangeSort(e)}>
            <Radio.Group>
              <Radio value="earliest-departure">Earliest departure</Radio>
              <Radio value="latest-departure">Latest departure</Radio>
              <Radio value="lowest-price">Lowest price</Radio>
              <Radio value="highest-price">Highest price</Radio>
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
            <Checkbox value="Express" onChange={(e) => handleOnChangeFilter(e)}>Express</Checkbox><br />
            <Checkbox value="Luxury" onChange={(e) => handleOnChangeFilter(e)}>Luxury</Checkbox><br />
            <Checkbox value="Volvo Non-AC" onChange={(e) => handleOnChangeFilter(e)}>Volvo Non-AC</Checkbox><br />
            <Checkbox value="Volvo AC" onChange={(e) => handleOnChangeFilter(e)}>Volvo AC</Checkbox>
          </Card>
        </div>
        <div className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
          {arrTrip?.map((item, index) => {
            return (<div key={index}>
              <TripCard tripDetail={item} />
            </div>

            );
          })}
        </div>
      </div>
    </div>
  )
}