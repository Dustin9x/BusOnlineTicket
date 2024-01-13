import React, { Fragment, useEffect } from 'react'
import { EditOutlined, DeleteOutlined,AppstoreOutlined } from '@ant-design/icons';
import { Avatar, Button, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { layDanhSachCumRapAction, layDanhSachTinhThanhAction, xoaRapChieuAction } from '../../../redux/actions/QuanLyRapAction';
import { getTripListAction } from '../../../redux/actions/TripAction';
import { DOMAIN } from '../../../util/settings/config';


export default function TripMng() {
  const dispatch = useDispatch();
  let { arrTrip } = useSelector(state => state.TripReducer);
  useEffect(() => {
    dispatch(getTripListAction())
  }, [])

  console.log('arrTrip',arrTrip)

  const data = arrTrip;

  const columns = [
    {
      title: 'Trip Code',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.tripCode.length - b.tripCode.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <span color="magenta">PHTV{item.id}</span>
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
          ? <img key={index} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '50%' }} src={`${DOMAIN}Images/Trip/${item.image}`} alt={item.image} />
          : <Avatar size={40} style={{ fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={"H"} />
      }
    },
    {
      title: 'From Station',
      dataIndex: 'fromStation',
      key: 'fromStation',
      sorter: (a, b) => a.fromStation.length - b.fromStation.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <span color="magenta">{item.fromStation.name}</span>
      },
    },
    {
      title: 'To Station',
      dataIndex: 'toStation',
      key: 'toStation',
      sorter: (a, b) => a.toStation.length - b.toStation.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <span color="magenta">{item.toStation.name}</span>
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
      sortDirections: ['descend', 'ascend']
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
      render: (text, movie) => {
        return <Fragment>
          <Button><AppstoreOutlined />Seat Map</Button>
          <Button key={1} href={`/admin/theatremng/edit/${movie.maRap}`} type="link" icon={<EditOutlined />} onClick={() => {
            localStorage.setItem('theatreParams', JSON.stringify(movie));
          }}></Button>
          <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
            if (window.confirm('Bạn có chắc chắn muốn xóa rạp ' + movie.tenRap + '?')) {
              dispatch(xoaRapChieuAction(movie.maRap))
            }
          }}></Button>
        </Fragment>
      }
    },
  ];
  return <div>
    <div className='d-flex mb-3'>
      <h3 className='text-lg'>Trip Management</h3>
      <Button href='/admin/tripmng/addtrip' type="primary" className='ml-3 small bg-primary'>+ Add New Trip</Button>
    </div>
    <Table columns={columns} dataSource={data} rowKey={'id'} />
  </div>
}
