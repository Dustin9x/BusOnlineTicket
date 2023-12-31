import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Radio, Checkbox, Slider } from 'antd';
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
    <div className='container' style={{ maxWidth: 1200}}>
      <Card className='mx-2 mt-3'>
      <SelectBus/>
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
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </main>
      </div>
    </div>
  )
}
