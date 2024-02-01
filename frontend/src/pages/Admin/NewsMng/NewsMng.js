import React, { useEffect } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { getListNewsAction,deleteNewsAction } from '../../../redux/actions/NewAction';
import { DOMAIN } from '../../../util/settings/config';
import dayjs from 'dayjs';



export default function NewsMng() {
  let { arrNews } = useSelector(state => state.NewReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListNewsAction())
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


  const data = arrNews;

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
      width: '5%',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '20%',
      ...getColumnSearchProps('title'),
      sorter: (a, b) => a.title - b.title,
      sortDirections: ['descend', 'ascend'],
      render: (text,index) => { return <p key={index} className='text-ellipsis overflow-hidden line-clamp-2'>{text.replace(/<[^>]+>/g, '')}</p>}
    },
    {
      title: 'Content',
      dataIndex: 'content',
      width:'40%',
      key: 'content',
      ...getColumnSearchProps('content'),
      sortDirections: ['descend', 'ascend'],
      render: (text,index) => { return <p key={index} className='text-ellipsis overflow-hidden line-clamp-2'>{text.replace(/<[^>]+>/g, '')}</p>}

    },
    {
      title: 'Release Date',
      dataIndex: 'dayCreateNew',
      key: 'dayCreateNew',
      width: '15%',
      ...getColumnSearchProps('dayCreateNew'),
      sortDirections: ['descend', 'ascend'],
      render: (text, item) => {
        return dayjs(item.dayCreateNew).format("DD-MM-YYYY")
      },
    },
    
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: '20%',

      render: (text, data, index) => {
        return data.image != "null" && data.image != null ? (
          <img key={index} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: "10%", }}
            src={`${DOMAIN}/Images/News/${data.image}`}
            alt={data.image}
          />
        ) : (
              <div>No Image</div>
          // <Avatar size={40} style={{ fontSize: "20px", display: "flex", justifyContent: "center", alignItems: "center", }} />
          // // icon={data.fullName.substr(0, 1)}
        );
      },
    },
    {
      title: 'Manage',
      width: '20%',
      render: (text, item) => {
        return <>
          <Button key={1} href={`/admin/newsmng/edit/${item.id}`}  type="link" icon={<EditOutlined />} onClick={() => {
          }}></Button>
          <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
            if (window.confirm('Do you want to delete News ' + item.id + '?')) {
              dispatch(deleteNewsAction(item.id))
            }
          }}></Button>
        </>

      }
    },
  ]
  return <div>
    <div className='d-flex mb-3'>
      <h3 className='text-lg'>News Management</h3>
      <Button href='/admin/newsmng/addnews' type="primary" className='ml-3 small bg-primary'>+ Add New News</Button>
    </div>
    <Table columns={columns} dataSource={data} rowKey={'id'} />
  </div>
}
