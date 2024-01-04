import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Radio, Checkbox, Slider, Button } from 'antd';
import dayjs from 'dayjs';
import SelectBus from '../../components/SelectBus/SelectBus';



export default function Search(props) {
  const dispatch = useDispatch();

  let searchValue = props.location.search.slice(8, props.location.search.length);

  useEffect(() => {

  }, [])

  const { Meta } = Card;

  const marks = {
    0: {
      label: <small>100.000đ</small>,
    },
    5000000: {
      style: { color: '#f50' },
      label: <small>5.000.000đ</small>,
    },
  };

  return (
    <div className='container' style={{ maxWidth: 1200 }}>
      <Card className='mx-2 mt-3'>
        <SelectBus />
      </Card>

      <div class="flex flex-row flex-wrap py-4">
        <aside class="w-full sm:w-1/3 md:w-1/4 px-2">
          <Card title="Sort">
            <Radio>Earliest departure</Radio>
            <Radio>Latest departure</Radio>
            <Radio>Lowest price</Radio>
            <Radio>Highest price</Radio>
          </Card>
          <Card title="Filter" className='mt-3'>
            <Slider range marks={marks} step={50000} min={100000} max={5000000} defaultValue={[500000, 3000000]} className='mx-4 mb-5' />
            <Checkbox onChange={""}>Limousine</Checkbox><br />
            <Checkbox onChange={""}>Luxury</Checkbox><br />
            <Checkbox onChange={""}>Cheap</Checkbox><br />
            <Checkbox onChange={""}>Volvo</Checkbox>
          </Card>
        </aside>
        <main role="main" class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
          <Card hoverable>
            <div class="row">
              <div style={{ position: 'absolute', right: 20, top: 20 }}>
                <p className='text-center font-bold text-2xl text-green-800'>Price: 200.000đ</p>
              </div>
              <div className='col-3'>
                <img src="https://source.unsplash.com/random/160x160" alt="" />
              </div>
              <div className='col-9'>
                <h3 className='text-2xl'>Ho Chi Minh - Da Nang</h3>
                <p>Limousine 11 seats</p>
                <div class="d-flex">
                  <div class="hour font-bold mr-1"><i class="fa-solid fa-circle-dot fa-sm w-4"></i>10:00</div>
                  <div class="place">• Ho Chi Minh</div>
                </div>
                <div class="d-flex">
                  <div class="hour font-bold mr-1"><i class="fa-solid fa-location-dot w-4"></i>10:00</div>
                  <div class="place">• Da Nang</div>
                </div>
                <h3 className='mt-3 font-bold text-emerald-800'>Transit time: 90 minutes</h3>
                <div style={{ position: 'absolute', right: 10, bottom: 0 }}>
                  <p className='text-center'>Only 3 seats left</p>
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
        </main>
      </div>
    </div>
  )
}
