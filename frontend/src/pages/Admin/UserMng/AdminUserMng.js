import React, { Fragment, useEffect } from "react";
import { SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Space, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAction, getListUserAction, getUserByIdAction } from "../../../redux/actions/UserAction";
import { DOMAIN } from "../../../util/settings/config";

export default function AdminUserMng() {
  const dispatch = useDispatch();
  let { arrUser } = useSelector((state) => state.UserReducer);
  useEffect(() => {
    dispatch(getListUserAction());
  }, [dispatch]);

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

  const data = arrUser;

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close, }) => (
      <div style={{ padding: 8, }} onKeyDown={(e) => e.stopPropagation()} >
        <Input
          ref={searchInput}
          placeholder={`Search`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : []) }
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
            onClick={() => clearFilters && resetSearch(selectedKeys, confirm, dataIndex) }
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
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, data, index) => {
        return data.avatar != null ? (
          <img key={index} style={{ width: 40, height: 40, objectFit: "cover", borderRadius: "50%", }} src={`${DOMAIN}/Images/User/${data.avatar}`} alt={data.avatar} />
        ) : (
          <Avatar size={40} style={{ fontSize: "20px", display: "flex", justifyContent: "center", alignItems: "center" }} icon={data.email.substr(0, 1)} />
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      ...getColumnSearchProps("role"),
      sorter: (a, b) => a.role.length - b.role.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Manage",
      width: "20%",
      render: (text, data, index) => {
        return (
          <Fragment key={index}>
            <Button key={1}  href={`/admin/ordershistory/` + data.id} icon={<i className="fa-solid fa-ticket"></i>} onClick={() => { 
              dispatch(getUserByIdAction(data.id))
            }}
            >View Order List</Button>
            <Button key={2} href={`/admin/users/edit/` + data.id} type="link" icon={<EditOutlined />} onClick={() => { 
              dispatch(getUserByIdAction(data.id))
            }}
            ></Button>
            <Button key={3} type="link" danger icon={<DeleteOutlined />} onClick={() => {
                if ( window.confirm( "Are you sure you want to delete the user " + data.email + "?" ) ) {
                  dispatch(deleteUserAction(data.id));
                } }}
            ></Button>
          </Fragment>
        );
      },
    },
  ];
  return (
    <div>
      <div className="d-flex mb-3">
        <h3 className="text-lg">Customer Management</h3>
        <Button href="/admin/users/adduser" type="primary" className="ml-3 small bg-primary" > + Add New Customer </Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey={"id"} />
    </div>
  );
}
