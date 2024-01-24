import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListNewsAction,
  detailNewsAction,
} from "./../../redux/actions/NewAction";

import { Input, List } from "antd";

import dayjs from "dayjs";

import { DOMAIN, TOKEN } from "../../util/settings/config";

export default function NewsDetail(props) {
  const { TextArea } = Input;

  const { arrNews, newsDetail } = useSelector((state) => state.NewReducer);

  const dispatch = useDispatch();

  let { id } = props.match.params;
  useEffect(() => {
    dispatch(detailNewsAction(id));

    dispatch(getListNewsAction());
  }, []);

  //Phan trang
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  return (
    <div>
      <div className="container">
        <div
          className="d-flex items-center absolute z-10"
          style={{ top: "28%" }}
        >
          <div className="container">
            <h2 className=" text-white drop-shadow-md text-5xl">
              {newsDetail.title}
            </h2>
          </div>
        </div>
      </div>

      <div
        className=""
        style={{
          backgroundImage: `url(${
            DOMAIN + "/Images/News/" + newsDetail.image
          })`,
          height: 700,
          backgroundSize: "cover",
          filter: "brightness(0.5)",
        }}
      ></div>
      <div
        className="container relative z-10 bg-white p-10 shadow-lg mb-10 rounded-lg"
        style={{ marginTop: "-120px" }}
      >
        <div className="row">
          <div className="col-8">
            <div className="mb-5">
              <p className="text-gray-400 py-4">
                Posting Date :{" "}
                {dayjs(newsDetail.dayCreate).format("DD-MM-YYYY")}
              </p>
              <div
                dangerouslySetInnerHTML={{ __html: newsDetail.content }}
              ></div>
            </div>
            <hr></hr>
          </div>
          <div className="col-4">
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md md:flex-row w-full my-3">
              <div className="flex flex-col justify-between p-4 leading-normal w-full">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  The Lastest News
                </h5>
                <List
                  itemLayout="horizontal"
                  dataSource={arrNews.slice(-5).reverse()}
                  renderItem={(item, index) => (
                    <List.Item>
                      <div className="d-flex mb-1 mt-1 w-full font-normal text-gray-700 dark:text-gray-400">
                        <img
                          className="rounded-md"
                          src={`${DOMAIN}/Images/News/${item.image}`}
                          alt={item.image}
                          style={{
                            width: 140,
                            height: 110,
                            objectFit: "cover",
                          }}
                        />
                        <div className="px-4">
                          <a
                            className="text-md font-bold"
                            href={`/news/detail/${item.id}`}
                          >
                            {item.title}
                          </a>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: newsDetail.content,
                            }}
                            className="text-ellipsis overflow-hidden line-clamp-2"
                          ></div>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
