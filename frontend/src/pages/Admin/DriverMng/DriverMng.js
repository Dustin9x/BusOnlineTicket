import React, { Fragment, useEffect } from "react";
import { SearchOutlined, EditOutlined, DeleteOutlined, HistoryOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Space, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { DOMAIN, TOKEN, USER_LOGIN } from "../../../util/settings/config";
import { history } from "../../../App";
import { deleteDriver, getDriverAction, getDriverByIdAction } from "../../../redux/actions/DriverAction";

export default function DriverMng() {
  let userLogin = {};
  // if (localStorage.getItem(USER_LOGIN)) {
  //     userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
  // }

  // if (!localStorage.getItem(TOKEN)) {
  //     history.replace('/')
  // }

  // if (userLogin.role !== 'Super') {
  //     alert('Bạn không có quyền truy cập trang này!');
  //     history.replace('/')
  // }
  let { arrDriver } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  useEffect((value) => {
    dispatch(getDriverAction());
  }, []);

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

  const data = arrDriver;

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close, }) => (
      <div style={{ padding: 8, }} onKeyDown={(e) => e.stopPropagation()} >
        <Input
          ref={searchInput}
          placeholder={`Tìm kiếm`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
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
            style={{
              width: 90,
            }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => clearFilters && resetSearch(selectedKeys, confirm, dataIndex) }
            size="small"
            style={{  width: 90}}
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
      sorter: (a, b) => a.id.length - b.id.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, data, index) => {
        return data.avatar != "null" && data.avatar != null ? (
          <img key={index} style={{ width: 40, height: 40, objectFit: "cover", borderRadius: "50%", }}
            src={`${DOMAIN}/Images/Driver/${data.avatar}`}
            alt={data.avatar}
          />
        ) : (
          <Avatar size={40} style={{ fontSize: "20px", display: "flex", justifyContent: "center", alignItems: "center", }} icon={data.fullName.substr(0, 1)} />
        );
      },
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      ...getColumnSearchProps("fullName"),
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "National ID",
      dataIndex: "nationalId",
      key: "nationalId",
      ...getColumnSearchProps("nationalId"),
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Driver License",
      dataIndex: "driverLicense",
      key: "driverLicense",
      ...getColumnSearchProps("driverLicense"),
      sorter: (a, b) => a.driverLicense.length - b.driverLicense.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ["descend", "ascend"],
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
      title: "Year of Birth",
      dataIndex: "yearOfBirth",
      key: "yearOfBirth",
      ...getColumnSearchProps("yearOfBirth"),
      sorter: (a, b) => a.yearOfBirth.length - b.yearOfBirth.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Place of Birth",
      dataIndex: "placeOfBirth",
      key: "placeOfBirth",
      ...getColumnSearchProps("placeOfBirth"),
      sorter: (a, b) => a.placeOfBirth.length - b.placeOfBirth.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      ...getColumnSearchProps("note"),
    },
    {
      title: "Enabled",
      dataIndex: "enabled",
      key: "enabled",
      ...getColumnSearchProps("enabled"),
    },
    {
      title: "Manage",
      render: (text, driver, index) => {
        return (
          <Fragment key={index}>
            <Button key={1} href={`/admin/drivermng/edit/${driver.id}`} type="link" icon={<EditOutlined />}
              onClick={() => {
                dispatch(getDriverByIdAction(driver.id))
              }}
            ></Button>
            <Button key={2} type="link" danger icon={<DeleteOutlined />}
              onClick={() => {
                if ( window.confirm( "Do you sure want to delete " + driver.fullName + "?")) {
                  dispatch(deleteDriver(driver.id));
                } 
              }}
            ></Button>
          </Fragment>
        );
      },
    },
  ];
  return (
    <div>
      <div className="d-flex mb-3">
        <h3 className="text-lg">Driver Management</h3>
        <Button href="/admin/drivermng/adddriver" type="primary" className="ml-3 small bg-primary" > + Add New Driver</Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey={"id"} />
    </div>
  );
}
