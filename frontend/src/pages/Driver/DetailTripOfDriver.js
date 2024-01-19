import React, { Fragment, useEffect } from 'react'
import { EditOutlined, DeleteOutlined,AppstoreOutlined } from '@ant-design/icons';
import { Avatar, Button, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { deleteTripAction, getTripListAction } from '../../redux/actions/TripAction';
import { DOMAIN } from '../../util/settings/config';
import dayjs from 'dayjs';


export default function DetailTripOfDriver() {
  const dispatch = useDispatch();
  let { arrTrip } = useSelector(state => state.TripReducer);
  useEffect(() => {
    dispatch(getTripListAction())
  }, [])
  let Id = {}
  if (localStorage.getItem("driverLogin")) {
    Id = localStorage.getItem("driverLogin")
  }

  const data = arrTrip.filter(item=>item.driverId==Id && Date.now()<= dayjs(item.finishTime)).sort((a, b) => {
    const aDate = Date.parse(a.finishTime);
    const bDate = Date.parse(b.finishTime);
    return aDate - bDate;
  });;

  const dataOld = arrTrip.filter(item=>item.driverId==Id && Date.now()> dayjs(item.finishTime)).sort((a, b) => {
    const aDate = Date.parse(a.finishTime);
    const bDate = Date.parse(b.finishTime);
    return  bDate-aDate ;
  });;

  const data2= data?data[0]:"";
  console.log("check data filter: ", data);

  const columns = [
    {
      title: 'Trip Code',
      
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.tripCode.length - b.tripCode.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return<>
        {data2.id==item.id? <span style={{color:"red" }} color="magenta">PHTV{item.id}</span>:<span  color="magenta">PHTV{item.id}</span> }
       
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
        {data2.id==item.id?  <span  style={{color:"red"}} color="magenta">{item.fromStation?.name}</span>: <span color="magenta">{item.fromStation?.name}</span>}
       
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
        {data2.id==item.id? <span  style={{color:"red"}} color="magenta">{item.toStation?.name}</span>: <span color="magenta">{item.toStation?.name}</span>}
       
        </> 
      },
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      sorter: (a, b) => dayjs(a.startTime) - dayjs( b.startTime),
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <>
        {data2.id==item.id? <span  style={{color:"red"}} color="magenta">{item.startTime}</span>: <span color="magenta">{item.startTime}</span>}
        </>
      },
    },
    {
      title: 'Finish Time',
      dataIndex: 'finishTime',
      key: 'finishTime',
      sorter: (a, b) => dayjs(a.finishTime) - dayjs( b.finishTime),
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <>
        {data2.id==item.id? <span  style={{color:"red"}} color="magenta">{item.finishTime}</span>: <span color="magenta">{item.finishTime}</span>}
        </>
      },
      
    },
    {
      title: 'Ticket Price',
      dataIndex: 'ticketPrice',
      key: 'ticketPrice',
      sorter: (a, b) => a.ticketPrice -  b.ticketPrice,
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <>
        {data2.id==item.id? <span  style={{color:"red"}} color="magenta">{item.ticketPrice}</span>: <span color="magenta">{item.ticketPrice}</span>}
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
        {data2.id==item.id? <span  style={{color:"red"}} color="magenta">{item.driver?.fullName}</span>: <span color="magenta">{item.driver?.fullName}</span>}
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
        return   <>
        {Date.now()>dayjs(item.finishTime)? <Tag  color="magenta">{item.bus.busPlate}</Tag>: <Tag  color="blue">{item.bus.busPlate}</Tag>}
        
        </>
  
      },
    },
    
    // {
    //   title: 'Action',
    //   render: (text, trip) => {
    //     return <Fragment>
    //       <Button><AppstoreOutlined />Seat Map</Button>
    //       <Button key={1} href={`/admin/theatremng/edit/${trip.maRap}`} type="link" icon={<EditOutlined />} onClick={() => {
    //         localStorage.setItem('theatreParams', JSON.stringify(trip));
    //       }}></Button>
    //       <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
    //         if (window.confirm('Do you want to delete trip PHTV' + trip.id + '?')) {
    //           dispatch(deleteTripAction(trip.id))
    //         }
    //       }}></Button>
    //     </Fragment>
    //   }
    // },
  ];
  const style = {
    ".ant-table-row-header:nth-of-type(1) .ant-table-cell": {
      fontWeight: "bold",
    },
  };
  return <div>
    
    <div style={{margin:20}} >
    <div className=' center'><h3 className='text-lg' >The journey you must run early</h3></div>
    
      <Table  columns={columns} dataSource={data} rowKey={'id'} />
      <div className=' center'><h3 className='text-lg' >The trips you took</h3></div>
      <Table  columns={columns} dataSource={dataOld} rowKey={'id'} />
    </div>
 
  </div>
}