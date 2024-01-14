import React, { useEffect } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag, Tooltip } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBusAction, getBusByIdAction, getBusListAction } from '../../../redux/actions/BusAction';


export default function BusMng() {
  let { arrBus } = useSelector(state => state.BusReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBusListAction())
  }, [dispatch])


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


  const data = arrBus;

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
      title: 'Bus Plate',
      dataIndex: 'busPlate',
      key: 'busPlate',
      width: '15%',
      ...getColumnSearchProps('busPlate'),
      sorter: (a, b) => a.busPlate - b.busPlate,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Bus Type',
      dataIndex: 'busType',
      key: 'busType',
      width: '15%',
      ...getColumnSearchProps('busType'),
      sorter: (a, b) => a.busType - b.busType,
      sortDirections: ['descend', 'ascend'],
      render: (text, busType) => {
        return (<Tooltip title={`Number of seat: ${busType.busType?.numberOfSeat}`}>
          <span>{busType.busType?.name}</span>
        </Tooltip>)
      },
    },
    {
      title: 'Station',
      dataIndex: 'stations',
      key: 'stations',
      width: '30%',
      ...getColumnSearchProps('stations'),
      sortDirections: ['descend', 'ascend'],
      render: (text, stations) => {
        return stations.stations.map((item, index) => {
          return <Tag color="magenta" key={index}>{item.name}</Tag>
        })
      },
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      width: '30%',
      ...getColumnSearchProps('note'),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Manage',
      width: '25%',
      render: (text, bus) => {
        return <>
          <Button key={1} href={`/admin/busmng/edit/${bus.id}`} type="link" icon={<EditOutlined />} onClick={() => {
            dispatch(getBusByIdAction(bus.id))
            localStorage.setItem('busStaionDefault', JSON.stringify(bus.stationId))
          }}></Button>
          <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
            if (window.confirm('Do you want to delete bus ' + bus.busPlate + '?')) {
              dispatch(deleteBusAction(bus.id))
            }
          }}></Button>
        </>
      }
    },
  ]
  return <div>
    <div className='d-flex mb-3'>
      <h3 className='text-lg'>Bus Management</h3>
      <Button href='/admin/busmng/addnew' type="primary" className='ml-3 small bg-primary'>+ Add New Bus</Button>
    </div>
    <Table columns={columns} dataSource={data} rowKey={'id'} />
  </div>
}
