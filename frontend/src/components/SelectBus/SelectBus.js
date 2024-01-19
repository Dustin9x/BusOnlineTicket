import { DatePicker,Select,Form } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getStationListAction } from '../../redux/actions/StationAction';
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
  const [trueOrFalse, setTrueOrFalse] = useState(true);
  
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
      alert("Sorry, Fields 'Leaving from' cannot be left blank!!");
      const myInput = document.getElementById('fromFocus');
        myInput.focus();
      e.preventDefault();
      return;
    }
    if(To==null){
      alert("Sorry, Fields 'Going to' cannot be left blank!!");
      const myInput = document.getElementById('toFocus');
        myInput.focus();
      e.preventDefault();
      return;
    }
    if(Date==null){
      alert("Sorry, Fields 'Journey date' cannot be left blank!!");
      const myInput = document.getElementById('dateFocus');
        myInput.focus();
      e.preventDefault();
      return;
    }
  };
 const handleChangeTrueOrFalse = ()=>{
setTrueOrFalse(!trueOrFalse)
console.log("check ", trueOrFalse);
 }
  return (
    <div className="w-100 p-2 rounded-xl bg-white">
      <form
        onSubmit={handleSubmit}
        autocomplete="off"
        className=" w-100"
        action={`/search/${From}/${To}/${Date}`}
      >
        <h4 className="w-100 text-left" style={{ color: "#1867aa" }} >
          Bus Ticket & Bus Schedule in whole Vietnam
        </h4>
        <div className="autocomplete  br3 cf w-100 flex flex-wrap justify-center">
          <div className="d-flex w-120 justify-around" >
            {trueOrFalse?  <div className="w-80" >
               <Form.Item
                style={{ minWidth: '100%' }}
               >
                  <Select    
                    style={{height:40}}
                    id="fromFocus"
                    showSearch
                    value={From} required placeholder="Leaving from" 
                    options={arrStation?.map((item, index) => ({ key: index, label: item.name, value: item.name }))}  
                    onChange={handleFromChange}/>
              </Form.Item>
            </div> :   <div className="w-80">
                 <Form.Item
                  style={{ minWidth: '100%'}}
                    >
                    <Select value={To} 
                    style={{height:40}}
                    id="toFocus"
                    showSearch
                    placeholder="Going to"   options={arrStation?.map((item, index) => ({ key: index, label: item.name, value: item.name }))}   
                    onChange={handleToChange}/>
                  </Form.Item>
            </div>}
          

            <div id="btn"  className="w-10 br3 mb0-l mb2-m flex justify-center items-center bg-white dim pointer" style={{ height: "3em", borderRadius: ".5rem !important" , cursor: "pointer"}}  >
                <i onClick={handleChangeTrueOrFalse}  className="fas fa-exchange-alt pointer"></i>
           </div>
            {trueOrFalse? <div className="w-80">
                 <Form.Item
                  style={{ minWidth: '100%'}}
                    >
                    <Select value={To} 
                    style={{height:40}}
                    id="toFocus"
                    showSearch
                    placeholder="Going to"   options={arrStation?.map((item, index) => ({ key: index, label: item.name, value: item.name }))}   
                    onChange={handleToChange}/>
                  </Form.Item>
            </div>  :  <div className="w-80" >
               <Form.Item
                style={{ minWidth: '100%' }}
               >
                  <Select    
                    style={{height:40}}
                    id="fromFocus"
                    showSearch
                    value={From} required placeholder="Leaving from" 
                    options={arrStation?.map((item, index) => ({ key: index, label: item.name, value: item.name }))}  
                    onChange={handleFromChange}/>
              </Form.Item>
            </div> }
            <div className="ml-3" >
              <DatePicker
                value={Date!=null?dayjs(Date):""}
                id="dateFocus"
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
