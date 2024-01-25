import React, { useEffect, useState } from 'react'
import { Avatar, Button, Modal, Table, Tabs, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getTripListByDriverId } from '../../redux/actions/TripAction';
import { getDriverByIdAction } from '../../redux/actions/DriverAction';
import { DOMAIN } from '../../util/settings/config';
import dayjs from 'dayjs';
import { history } from '../../App';
import ProfileDriver from './ProfileDriver';

export default function DetailTripOfDriver() {
  let Id = {}
  if (localStorage.getItem("driverId")) {
    Id = localStorage.getItem("driverId")
  } else {
    history.push("/loginDriver")

  }
  const dispatch = useDispatch();
  let { arrTrip } = useSelector(state => state.TripReducer);
  const { driverDetail } = useSelector(state => state.DriverReducer);
  useEffect(() => {
    dispatch(getTripListByDriverId(Id));
    dispatch(getDriverByIdAction(Id))
  }, [])
  const [count, setCount] = useState(0);
  const [second, setSecond] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
       const timee =dayjs(data2?.startTime).diff(dayjs(), 'second');
       const interval = setInterval(() => {
      setCount(count+1);
      setSecond(timee);
    }, 1000); 
 
    return () => clearTimeout(interval); 
  }, [count]);

  const seconds = second;
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const TripNotComplete = arrTrip.filter(item => item.driverId == Id && dayjs() < dayjs(item.startTime)).sort((a, b) => {
    const aDate = Date.parse(a.finishTime);
    const bDate = Date.parse(b.finishTime);
    return aDate - bDate;
  });;

  const TripComplete = arrTrip.filter(item => item.driverId == Id && Date.now() > dayjs(item.finishTime)).sort((a, b) => {
    const aDate = Date.parse(a.finishTime);
    const bDate = Date.parse(b.finishTime);
    return bDate - aDate;
  });;

  const tripNow=arrTrip.filter(item =>     ( item.driverId == Id && dayjs() > dayjs(item.startTime))
                                        && ( item.driverId == Id && Date.now() < dayjs(item.finishTime)));
  const data2 = TripNotComplete ? TripNotComplete[0] : "";




  const columns = [
    {
      title: 'Trip Code',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <>
          {data2.id == item.id ? <span style={{ color: "red", fontSize:"17px" }} color="magenta">PHTV{item.id}</span> : <span color="magenta">PHTV{item.id}</span>}

        </>
      },
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text, item, index) => {
        return item.image != "null" || item.image != null
          ? <img key={index} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '50%' }} src={`${DOMAIN}/Images/Trip/${item.image}`} alt={item.image} />
          : <Avatar size={40} style={{ fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={"H"} />
      }
    },
    {
      title: 'From Station',
      dataIndex: 'fromStation',
      key: 'fromStation',
      sorter: (a, b) => a.toStation?.name.length - b.toStation?.name.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <>
          {data2.id == item.id ? <span style={{ color: "red" ,fontSize:"17px"}} color="magenta">{item.fromStation?.name}</span> : <span color="magenta">{item.fromStation?.name}</span>}

        </>
      },
    },
    {
      title: 'To Station',
      dataIndex: 'toStation',
      key: 'toStation',
      sorter: (a, b) => a.toStation?.name.length - b.toStation?.name.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <>
          {data2.id == item.id ? <span style={{ color: "red" ,fontSize:"17px"}} color="magenta">{item.toStation?.name}</span> : <span color="magenta">{item.toStation?.name}</span>}

        </>
      },
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      sorter: (a, b) => dayjs(a.startTime) - dayjs(b.startTime),
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <>
          {data2.id == item.id ? <span style={{ color: "red" ,fontSize:"17px"}} color="magenta">{item.startTime}</span> : <span color="magenta">{item.startTime}</span>}
        </>
      },
    },
    {
      title: 'Finish Time',
      dataIndex: 'finishTime',
      key: 'finishTime',
      sorter: (a, b) => dayjs(a.finishTime) - dayjs(b.finishTime),
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <>
          {data2.id == item.id ? <span style={{ color: "red" ,fontSize:"17px"}} color="magenta">{item.finishTime}</span> : <span color="magenta">{item.finishTime}</span>}
        </>
      },

    },
    {
      title: 'Ticket Price',
      dataIndex: 'ticketPrice',
      key: 'ticketPrice',
      sorter: (a, b) => a.ticketPrice - b.ticketPrice,
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <>
          {data2.id == item.id ? <span style={{ color: "red" ,fontSize:"17px"}} color="magenta">${item.ticketPrice}</span> : <span color="magenta">${item.ticketPrice}</span>}
        </>
      },
    },
    {
      title: 'Assigned Driver',
      dataIndex: 'driver',
      key: 'driver',
      sorter: (a, b) => a.driver.length - b.driver.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <>
          {data2.id == item.id ? <span style={{ color: "red" ,fontSize:"17px"}} color="magenta">{item.driver?.fullName}</span> : <span color="magenta">{item.driver?.fullName}</span>}
        </>
      },
    },
    {
      title: 'Assigned Bus',
      dataIndex: 'bus',
      key: 'bus',
      render: (text, item) => {
        return <>
          {Date.now() > dayjs(item.finishTime) ? <Tag color="magenta" style={{ fontSize:"15px"}} >{item.bus.busPlate}</Tag> : <Tag style={{ fontSize:"15px"}}  color="blue">{item.bus.busPlate}</Tag>}

        </>

      },
    },
  ];
 
  const items = [
    {
      key: '1',
      label: <span className='ml-1'>The trip is about to leave</span>,
      children: <Table columns={columns} dataSource={TripNotComplete} rowKey={'id'} />,
    },
    {
      key: '2',
      label: 'The trip has been completed',
      children: <Table columns={columns} dataSource={TripComplete} rowKey={'id'} />,
    }]


  return <div>

    <div style={{ margin: 20 }} >
    
      <div >
        <div className='flex justify-content-space-between align-items-center'>
          <div  onClick={() => setOpen(true)} className='text-lg flex w-full cursor-pointer' >

            {driverDetail?.avatar != ""
              ? <span><img style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }} src={`${DOMAIN}/Images/Driver/${driverDetail.avatar}`} alt={driverDetail.avatar} /></span>
              : <span> <Avatar size={50} style={{ fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={driverDetail?.fullName?.substr(0,1)} /> </span>}   <div style={{ margin: 10, width:'100%' }}> {driverDetail?.fullName} </div>
          </div>
        
          <div className='flex justify-content-end' style={{ width: "160vh" }} >
            <Button style={{ width: 90 }} type="text" href="/home" className="font-semibold rounded-full bg-red-400" onClick={() => {
              localStorage.removeItem("driverId")
              history.push("/loginDriver")
            }}>Logout</Button>
          </div>
        </div>
      </div>
      <div className='text-center text-red-500 font-sans mb-3'>Next departure time:  {d}(d)--{h}(h)--{m}(m)--{s}(s)</div>
      <Modal
        title={"Information driver:  "+driverDetail.fullName}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <ProfileDriver></ProfileDriver>
      </Modal>
      <div className='text-center text-red-500 font-sans mb-3 '>Current journey</div>
      {tripNow.length>0? <Table dataSource={tripNow} columns={columns} sort={false}  pagination={false}/>:""}
      <Tabs defaultActiveKey="1" items={items} />
    </div>

  </div>
}