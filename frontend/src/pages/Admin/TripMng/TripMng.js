import React, { Fragment, useEffect, useState } from 'react'
import { EditOutlined, DeleteOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Avatar, Button, Modal, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { deleteTripAction, getTripListAction } from '../../../redux/actions/TripAction';
import { DOMAIN } from '../../../util/settings/config';
import SeatMapAdmin from '../../../components/SeatMap/SeatMapAdmin';


export default function TripMng() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tripId, setTripId] = useState();
  const [tripDetail, setTripDetail] = useState({});
  const dispatch = useDispatch();

  let { arrTrip } = useSelector(state => state.TripReducer);
  useEffect(() => {
    dispatch(getTripListAction())
  }, [])

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const data = arrTrip;

  const columns = [
    {
      title: 'Trip Code',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <span color="magenta">{item.id}</span>
      },
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      sortDirections: ['descend', 'ascend'],
      render: (text, item, index) => {
        return item.image != "null" || item.image != null
          ? <img key={index} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '50%' }} src={`${DOMAIN}/Images/Trip/${item.image}`} alt={item.image} />
          : <Avatar size={40} style={{ fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={item.fromStation.name} />
      }
    },
    {
      title: 'From Station',
      dataIndex: 'fromStation',
      key: 'fromStation',
      sorter: (a, b) => a.fromStation?.length - b.fromStation?.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <span color="magenta">{item.fromStation?.name}</span>
      },
    },
    {
      title: 'To Station',
      dataIndex: 'toStation',
      key: 'toStation',
      sorter: (a, b) => a.toStation?.length - b.toStation?.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <span color="magenta">{item.toStation?.name}</span>
      },
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'Finish Time',
      dataIndex: 'finishTime',
      key: 'finishTime',
    },
    {
      title: 'Ticket Price',
      dataIndex: 'ticketPrice',
      key: 'ticketPrice',
    },
    {
      title: 'Assigned Driver',
      dataIndex: 'driver',
      key: 'driver',
      sorter: (a, b) => a.driver.length - b.driver.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <span color="magenta">{item.driver?.fullName}</span>
      },
    },
    {
      title: 'Assigned Bus',
      dataIndex: 'bus',
      key: 'bus',
      sorter: (a, b) => a.bus.length - b.bus.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <Tag color="magenta">{item.bus.busPlate}</Tag>
      },
    },
    {
      title: 'Action',
      render: (text, trip) => {
        return <div className="d-flex">
          <Button key={1} onClick={() => {
            setTripId(trip.id)
            setTripDetail(trip)
            showModal()
          }}>Seat Map</Button>
          <Button key={2} href={`/admin/theatremng/edit/${trip.id}`} type="link" icon={<EditOutlined />} onClick={() => {
            localStorage.setItem('theatreParams', JSON.stringify(trip));
          }}></Button>
          <Button key={3} type="link" danger icon={<DeleteOutlined />} onClick={() => {
            if (window.confirm('Do you want to delete trip PHTV' + trip.id + '?')) {
              dispatch(deleteTripAction(trip.id))
            }
          }}></Button>
        </div>
      }
    },
  ];
  return <div>
    <div className='d-flex mb-3'>
      <h3 className='text-lg'>Trip Management</h3>
      <Button href='/admin/tripmng/addtrip' type="primary" className='ml-3 small bg-primary'>+ Add New Trip</Button>
    </div>
    <Table columns={columns} dataSource={data} rowKey={'id'} />
    <Modal title="Seat Map" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <SeatMapAdmin tripId={tripId} tripDetail={tripDetail} />
    </Modal>
  </div>
}
