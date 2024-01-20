import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TOKEN, USER_LOGIN } from '../../../util/settings/config'
import { cancelTicketAction, getTicketByUserAction } from '../../../redux/actions/OrderAction'
import { Button, Input, Space, Table, Tag, Form } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words'
import dayjs from "dayjs";
import { getCurrentUserAction } from '../../../redux/actions/UserAction'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default function OrderHistory() {
  const { arrTicket } = useSelector(state => state.OrderReducer)
  let { userLogin } = useSelector(state => state.UserReducer);
  const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTicketByUserAction(userLogin?.id))
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

  const data = arrTicket.reverse();

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
      dataIndex: 'id',
      key: 'id',
      width: '15%',
      ...getColumnSearchProps('id'),
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      render: (text, ticket) => {
        return "PHTV" + ticket.id
      },
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
      ...getColumnSearchProps('stations'),
      sortDirections: ['descend', 'ascend'],
      render: (text, ticket) => {
        return ticket.trips.toStation.name
      }
    },
    {
      title: 'Seat List',
      dataIndex: 'seatsList',
      key: 'seatsList',
      width: '20%',
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
      ...getColumnSearchProps('isCancel'),
      sortDirections: ['descend', 'ascend'],
      render: (text, ticket) => {
        return ticket.isCancel ? <Tag bordered={false}>Canceled</Tag> : ''
      }
    },
    {
      title: 'Manage',
      width: '15%',
      render: (text, ticket) => {
        let remainDay = dayjs(ticket.trips.startTime).get('date') - dayjs().get('date')
        console.log('remainDay',remainDay)
        return <>
          {remainDay < 0 ? ''
            : <Button key={1} type="link" danger icon={"x"} onClick={() => {
              if (window.confirm("Do you sure want to cancel ticket PHTV" + ticket.id + "?")) {
                dispatch(cancelTicketAction(ticket.id, remainDay))
              }
            }}>Cancel Ticket</Button>
          }
          <Form>
            Nhap ten tai khoan <Input/>
            Nhap so tai khoan<Input/>
          </Form>
        </>
      }
    },
  ]
  return <div>
    <div className='d-flex mb-3'>
      <h3 className='text-lg'>Ticket Management</h3>
    </div>
    <Table columns={columns} dataSource={data} rowKey={'id'} />

  </div>
}
