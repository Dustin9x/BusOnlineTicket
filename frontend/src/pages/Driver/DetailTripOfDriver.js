import React, { Fragment, useEffect } from 'react'
import { EditOutlined, DeleteOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Avatar, Button, Table, Tabs, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { getTripListAction } from '../../redux/actions/TripAction';
import { getDriverByIdAction, updateDriver } from '../../redux/actions/DriverAction';
import { DOMAIN } from '../../util/settings/config';
import dayjs from 'dayjs';
import { history } from '../../App';


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
    dispatch(getTripListAction())
    dispatch(getDriverByIdAction(Id))
  }, [])


  const TripNotComplete = arrTrip.filter(item => item.driverId == Id && Date.now() <= dayjs(item.finishTime)).sort((a, b) => {
    const aDate = Date.parse(a.finishTime);
    const bDate = Date.parse(b.finishTime);
    return aDate - bDate;
  });;

  const TripComplete = arrTrip.filter(item => item.driverId == Id && Date.now() > dayjs(item.finishTime)).sort((a, b) => {
    const aDate = Date.parse(a.finishTime);
    const bDate = Date.parse(b.finishTime);
    return bDate - aDate;
  });;

  const data2 = TripNotComplete ? TripNotComplete[0] : "";
  console.log("check data filter: ", driverDetail);

  const columns = [
    {
      title: 'Trip Code',

      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.tripCode.length - b.tripCode.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <>
          {data2.id == item.id ? <span style={{ color: "red" }} color="magenta">PHTV{item.id}</span> : <span color="magenta">PHTV{item.id}</span>}

        </>
      },
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      sorter: (a, b) => a.tripCode.length - b.tripCode.length,
      sortDirections: ['descend', 'ascend'],
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
      sorter: (a, b) => a.fromStation?.length - b.fromStation?.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <>
          {data2.id == item.id ? <span style={{ color: "red" }} color="magenta">{item.fromStation?.name}</span> : <span color="magenta">{item.fromStation?.name}</span>}

        </>
      },
    },
    {
      title: 'To Station',
      dataIndex: 'toStation',
      key: 'toStation',
      sorter: (a, b) => a.toStation?.length - b.toStation?.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <>
          {data2.id == item.id ? <span style={{ color: "red" }} color="magenta">{item.toStation?.name}</span> : <span color="magenta">{item.toStation?.name}</span>}

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
          {data2.id == item.id ? <span style={{ color: "red" }} color="magenta">{item.startTime}</span> : <span color="magenta">{item.startTime}</span>}
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
          {data2.id == item.id ? <span style={{ color: "red" }} color="magenta">{item.finishTime}</span> : <span color="magenta">{item.finishTime}</span>}
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
          {data2.id == item.id ? <span style={{ color: "red" }} color="magenta">{item.ticketPrice}</span> : <span color="magenta">{item.ticketPrice}</span>}
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
          {data2.id == item.id ? <span style={{ color: "red" }} color="magenta">{item.driver?.fullName}</span> : <span color="magenta">{item.driver?.fullName}</span>}
        </>
      },
    },
    {
      title: 'Assigned Bus',
      dataIndex: 'bus',
      key: 'bus',
      sorter: (a, b) => a.bus.length - b.bus.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <>
          {Date.now() > dayjs(item.finishTime) ? <Tag color="magenta">{item.bus.busPlate}</Tag> : <Tag color="blue">{item.bus.busPlate}</Tag>}

        </>

      },
    },
  ];

  const style = {
    ".ant-table-row-header:nth-of-type(1) .ant-table-cell": {
      fontWeight: "bold",
    },
  }; const items = [
    {
      key: '1',
      label: 'The trip is about to leave',
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
          <div className='text-lg flex' >

            {driverDetail?.avatar == ""
              ? <a href='/profileDriver'><img style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '50%' }} src={`${DOMAIN}/Images/Trip/${driverDetail.image}`} alt={driverDetail.image} /></a>
              : <a href='/profileDriver'> <Avatar size={40} style={{ fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={"H"} /> </a>}   <span style={{ margin: 5 }}> {driverDetail?.fullName} </span>


          </div>
          <div className='flex justify-content-end' style={{ width: "160vh" }} >
            <Button style={{ width: 90 }} type="text" href="/home" className="font-semibold rounded-full bg-red-400" onClick={() => {
              localStorage.removeItem("driverId")
              history.push("/loginDriver")
            }}>Logout</Button>
          </div>
        </div>

      </div>
      <Tabs defaultActiveKey="1" items={items} />;
    </div>

  </div>
}