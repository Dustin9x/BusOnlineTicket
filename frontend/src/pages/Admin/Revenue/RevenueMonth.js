import React from "react";
import { useEffect } from "react";
import { Alert, DatePicker, Table } from "antd";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./revenueroute.css";
import { useDispatch, useSelector } from "react-redux";
import { GetProfitByMonthAction } from "../../../redux/actions/ProfitAction";
import dayjs from "dayjs";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function RevenueMonth() {

  const dispatch = useDispatch()
  const { arrProfitByMonth } = useSelector(state => state.ProfitReducer)

  
  var resMap = new Map();
  var arrChart = [];
  arrProfitByMonth?.map((item) => {
    let key = item.month
    let value = item.totalProfit
    if (!resMap.has(key))
      resMap.set(key, value);
    else
      resMap.set(key, (value + resMap.get(key)));
  })
  resMap.forEach((value, key) => {
    arrChart.push({
      month: key,
      profit: value
    })
  })

  const year = dayjs().year()
  useEffect(() => {
    dispatch(GetProfitByMonthAction(year))
  }, [dispatch, year]);

  const datachart = {
    labels: arrChart.map(value => value.month),
    datasets: [
      {
        label: "USD",
        data: arrChart.map(value => value.profit),
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
        borderRadius: 5
      },
    ],
  };
  const columns = [
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      sorter: (a, b) => a.month - b.month,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Profit",
      dataIndex: "profit",
      key: "profit",
      sorter: (a, b) => a.profit - b.profit,
      sortDirections: ["descend", "ascend"],
      render: (text, order) => {
        return <div>{order.profit.toLocaleString()}</div>
      }
    },
  ];

  const onChange = (value) => {
    let year = (dayjs(value).format('YYYY'))
    dispatch(GetProfitByMonthAction(year))
  };

  return (
    <>
      <div className="">
        <DatePicker defaultValue={dayjs()} onChange={onChange} picker="year" />
        <div>
          <h1 className="titleRevenueTable text-xl">ANNUAL PROFIT CHART BY MONTH</h1>
          {arrChart.length === 0 || arrChart === undefined ? <Alert message="Nodata" className="text-center" type="warning" /> : ''}
          <div className="chartt" >
            <Bar data={datachart} style={{ height: '100%', maxHeight: '300px' }}></Bar>
          </div>
        </div>
      </div>
      <hr />
      <div className="revenueTable">
        <h1 className="titleRevenueTable text-xl">ANNUAL PROFIT TABLE BY MONTH</h1>
      </div>
      <div>
        <Table columns={columns} dataSource={arrChart} f />
      </div>
    </>
  );
}
