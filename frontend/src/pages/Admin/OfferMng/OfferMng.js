import React, { useEffect } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Avatar, Switch } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { DOMAIN } from '../../../util/settings/config';
import { deleteOfferAction, enableOfferAction, getOfferDetailAction, getOfferListAction } from '../../../redux/actions/OfferAction';
import dayjs from 'dayjs';


export default function OfferMng() {
  let { arrOffer } = useSelector(state => state.OfferReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOfferListAction())
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


  const data = arrOffer;

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
            Search
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
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Offer Code',
      dataIndex: 'offerCode',
      key: 'offerCode',
      ...getColumnSearchProps('offerCode'),
      sorter: (a, b) => a.offerCode.length - b.offerCode.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      ...getColumnSearchProps('discount'),
      sorter: (a, b) => a.discount - b.discount,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: "7%",
      render: (text, item, index) => {
        return item.image != "null" || item.image != null
          ? <img key={index} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '50%' }} src={`${DOMAIN}/Images/Offer/${item.image}`} alt={item.image} />
          : <Avatar size={40} style={{ fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={item.offerCode.substr(0,1)} />
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title'),
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'From Station',
      dataIndex: 'fromStation',
      key: 'fromStation',
      ...getColumnSearchProps('fromStation'),
      sorter: (a, b) => a.fromStation?.length - b.fromStation?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'To Station',
      dataIndex: 'toStation',
      key: 'toStation',
      ...getColumnSearchProps('toStation'),
      sorter: (a, b) => a.toStation?.length - b.toStation?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Begin Date',
      dataIndex: 'beginDate',
      key: 'beginDate',
      ...getColumnSearchProps('beginDate'),
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return dayjs(item.beginDate).format("DD-MM-YYYY")
      },
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      ...getColumnSearchProps('endDate'),
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return dayjs(item.endDate).format("DD-MM-YYYY")
      },
    },
    {
      title: 'Enable',
      dataIndex: 'enabled',
      key: 'enabled',
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return <Switch size="small" checked={item.enabled} onClick={()=>{
          dispatch(enableOfferAction(item.id))
        }} />
      },
    },
    {
      title: 'Manage',
      width: '10%',
      render: (text, item) => {
        return <>
          <Button key={1} href={`/admin/offermng/edit/${item.id}`}  type="link" icon={<EditOutlined />} onClick={() => {
            dispatch(getOfferDetailAction(item.id))
          }}></Button>
          <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
            if (window.confirm('Do you want to delete Offer ' + item.id + '?')) {
              dispatch(deleteOfferAction(item.id))
            }
          }}></Button>
        </>

      }
    },
  ]
  return <div>
    <div className='d-flex mb-3'>
      <h3 className='text-lg'>Offer Management</h3>
      <Button href='/admin/offermng/addnew' type="primary" className='ml-3 small bg-primary'>+ Add New Offer</Button>
    </div>
    <Table columns={columns} dataSource={data} rowKey={'id'} />
  </div>
}
