import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTicketListForCustomerAction } from '../../../redux/actions/OrderAction'
import { Button, Input, Space, Table, Tag } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import dayjs from "dayjs";
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default function UserOrder(props) {
  let { id } = props.match.params;
  const { arrTicketCustomer } = useSelector(state => state.OrderReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTicketListForCustomerAction(id))
  }, [dispatch]);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const resetSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0] = '');
    setSearchedColumn(dataIndex);
  };

  const data = arrTicketCustomer?.reverse();

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8, }} onKeyDown={(e) => e.stopPropagation()} >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            className='bg-primary'
            style={{
              width: 90,
            }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => clearFilters && resetSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>

        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
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
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'Ticket Code',
      dataIndex: 'code',
      key: 'code',
      ...getColumnSearchProps('code'),
      sorter: (a, b) => a.code - b.code,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Book Date',
      dataIndex: 'bookDate',
      key: 'bookDate',
      ...getColumnSearchProps('bookDate'),
      sorter: (a, b) => a.bookDate - b.bookDate,
      sortDirections: ['descend', 'ascend'],
      render: (text, ticket) => {
        return dayjs(ticket.bookDate).format("DD-MM-YYYY")
      }
    },
    {
      title: 'From',
      dataIndex: 'trips',
      key: 'trips',
      ...getColumnSearchProps('stations'),
      sortDirections: ['descend', 'ascend'],
      render: (text, ticket) => {
        return ticket.trips.fromStation.name
      }
    },
    {
      title: 'To',
      dataIndex: 'trips',
      key: 'trips',
      ...getColumnSearchProps('trips'),
      sortDirections: ['descend', 'ascend'],
      render: (text, ticket) => {
        return ticket.trips.toStation.name
      }
    },
    {
      title: 'Departure Time',
      dataIndex: 'startTime',
      key: 'startTime',
      ...getColumnSearchProps('startTime'),
      sortDirections: ['descend', 'ascend'],
      render: (text, ticket) => {
        return dayjs(ticket.trips.startTime).format("DD-MM-YYYY h:mm A")
      }
    },
    {
      title: 'Seat List',
      dataIndex: 'seatsList',
      key: 'seatsList',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Status',
      dataIndex: 'isCancel',
      key: 'isCancel',
      sortDirections: ['descend', 'ascend'],
      render: (text, ticket) => {
        return ticket.isCancel ? <Tag bordered={false}>Canceled</Tag> : ''
      }
    },
  ]
  return <div>
      <h3 className='text-lg w-full'>User Order List</h3>
      <h3 className='text-md mb-5'>Customer: {arrTicketCustomer[0]?.users?.email}</h3>
    <Table columns={columns} dataSource={data} rowKey={'id'} />
  </div>
}
