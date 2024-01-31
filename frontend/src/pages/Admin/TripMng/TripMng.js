import React, { useEffect, useRef, useState } from 'react'
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, Modal, Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTripAction, getTripByIdAction, getTripListAction } from '../../../redux/actions/TripAction';
import { DOMAIN } from '../../../util/settings/config';
import SeatMapAdmin from '../../../components/SeatMap/SeatMapAdmin';
import Highlighter from 'react-highlight-words';
import dayjs from 'dayjs';


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

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const resetSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText((selectedKeys[0] = ""));
    setSearchedColumn(dataIndex);
  };

  const data = arrTrip;

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close, }) => (
      <div style={{ padding: 8, }} onKeyDown={(e) => e.stopPropagation()} >
        <Input
          ref={searchInput}
          placeholder={`Search`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            className="bg-primary"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && resetSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text, index) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          key={index}
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Id',
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
      sorter: (a, b) => a.fromStation.name.length - b.fromStation.name.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <span color="magenta">{item.fromStation?.name}</span>
      },
    },
    {
      title: 'To Station',
      dataIndex: 'toStation',
      key: 'toStation',
      sorter: (a, b) => a.toStation.name.length - b.toStation.name.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <span color="magenta">{item.toStation?.name}</span>
      },
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      sorter: (a, b) => dayjs(a.startTime) - dayjs(b.startTime),
      render: (text, item) => {
        return dayjs(item.startTime).format("DD-MM-YYYY h:mm A")
      },
    },
    {
      title: 'Finish Time',
      dataIndex: 'finishTime',
      key: 'finishTime',
      sorter: (a, b) => dayjs(a.finishTime) - dayjs(b.finishTime),
      render: (text, item) => {
        return dayjs(item.finishTime).format("DD-MM-YYYY h:mm A")
      },
    },
    {
      title: 'Ticket Price',
      dataIndex: 'ticketPrice',
      key: 'ticketPrice',
      sorter: (a, b) => dayjs(a.ticketPrice) - dayjs(b.ticketPrice),
    },
    {
      title: 'Assigned Driver',
      dataIndex: 'driver',
      key: 'driver',
      sorter: (a, b) => a.driver - b.driver,
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
          <Button key={2} href={`/admin/tripmng/edit/${trip.id}`} type="link" icon={<EditOutlined />} onClick={() => {
            dispatch(getTripByIdAction(trip.id))
          }}></Button>
          <Button key={3} type="link" danger icon={<DeleteOutlined />} onClick={() => {
            if (window.confirm('Do you want to delete trip ' + trip.id + '?')) {
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
    <Modal title="Seat Map" open={isModalOpen} footer={null} maskClosable={true} onOk={handleOk} onCancel={handleCancel}>
      <SeatMapAdmin tripId={tripId} tripDetail={tripDetail} />
    </Modal>
  </div>
}
