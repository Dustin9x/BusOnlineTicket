import React, { useEffect } from "react";
import { SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Space, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { DOMAIN } from "../../../util/settings/config";
import { approveDriver, deleteDriver, getRegisterDriverAction } from "../../../redux/actions/DriverAction";
import dayjs from "dayjs";

export default function RegisterDriverMng() {
  let { arrRegisterDriver } = useSelector((state) => state.DriverReducer);
  const dispatch = useDispatch();
  useEffect((value) => {
    dispatch(getRegisterDriverAction());
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

  const data = arrRegisterDriver;

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
      title: "Date of Birth",
      dataIndex: "yearOfBirth",
      key: "yearOfBirth",
      ...getColumnSearchProps("yearOfBirth"),
      sorter: (a, b) => a.yearOfBirth.length - b.yearOfBirth.length,
      sortDirections: ["descend", "ascend"],
      render: (text, driver) => {
        return dayjs(driver.yearOfBirth).format('DD-MM-YYYY') 
      },
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
      title: "Manage",
      width: "12%",
      render: (text, driver, index) => {
        return (
          <div key={index} className="flex">
            <Button key={1} icon={<EditOutlined />}
              onClick={() => {
                if ( window.confirm( "Do you sure want to approve " + driver.fullName + "?")) {
                  dispatch(approveDriver(driver.id))
                } 
              }}
            >Approve</Button>
            <Button key={2} type="link" danger icon={<DeleteOutlined />}
              onClick={() => {
                if ( window.confirm( "Do you sure want to delete " + driver.fullName + "?")) {
                  dispatch(deleteDriver(driver.id));
                } 
              }}
            ></Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div className="d-flex mb-3">
        <h3 className="text-lg">Register Driver Management</h3>
      </div>
      <Table columns={columns} dataSource={data} rowKey={"id"} />
    </div>
  );
}
