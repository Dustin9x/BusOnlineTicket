import React, { Fragment, useEffect } from 'react'
import { EditOutlined, DeleteOutlined,AppstoreOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { layDanhSachCumRapAction, layDanhSachTinhThanhAction, xoaRapChieuAction } from '../../../redux/actions/QuanLyRapAction';


export default function TripMng() {
  let { cumRap } = useSelector(state => state.RapReducer);
  let { tinhThanh } = useSelector(state => state.RapReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachCumRapAction())
    dispatch(layDanhSachTinhThanhAction())
  }, [])

  const data = cumRap;
  const columns = [
    {
      title: 'Trip Code',
      dataIndex: 'tripCode',
      key: 'tripCode',
      sorter: (a, b) => a.tripCode.length - b.tripCode.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'From Station',
      dataIndex: 'fromStation',
      key: 'fromStation',
      sorter: (a, b) => a.fromStation.length - b.fromStation.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'To Station',
      dataIndex: 'toStation',
      key: 'ttoStation',
      render: (text, movie) => {
        return tinhThanh.filter(item => item.maTinh === movie.maTinh_id).map((item, index) => {
          return <div>{item.tenTinh}</div>
        })
      },
    },
    {
      title: 'Start Time',
      dataIndex: 'toStation',
      key: 'ttoStation',
      render: (text, movie) => {
        return tinhThanh.filter(item => item.maTinh === movie.maTinh_id).map((item, index) => {
          return <div>{item.tenTinh}</div>
        })
      },
    },
    {
      title: 'Finish Time',
      dataIndex: 'toStation',
      key: 'ttoStation',
      render: (text, movie) => {
        return tinhThanh.filter(item => item.maTinh === movie.maTinh_id).map((item, index) => {
          return <div>{item.tenTinh}</div>
        })
      },
    },
    {
      title: 'Ticket Price',
      dataIndex: 'ticketPrice',
      key: 'ticketPrice',
      render: (text, movie) => {
        return tinhThanh.filter(item => item.ticketPrice === movie.ticketPrice).map((item, index) => {
          return <div>{item.tenTinh}</div>
        })
      },
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
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Quản Lý',
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
      <Button href='/admin/theatremng/addtheatrechild' type="primary" className='ml-3 small bg-primary'>+ Add New Trip</Button>
    </div>
    <Table columns={columns} dataSource={data} rowKey={'maPhim'} />;
  </div>
}
