import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListNewsAction } from "./../../redux/actions/NewAction";
import { Avatar, Card, List, Pagination } from "antd";
import dayjs from "dayjs";
import { DOMAIN } from "../../util/settings/config";

export default function News() {
  //   const { arrNews } = useSelector(state => state.NewsReducer);
  const { arrNews } = useSelector((state) => state.NewReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListNewsAction());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const reverseArrTinTuc = arrNews.slice().reverse();
  const currentPosts = reverseArrTinTuc.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const News = () => {
    return currentPosts.map((item, index) => {
      return (
        <a className="hover:no-underline" href={`/news/detail/${item.id}`}>
          <Card
            key={index}
            hoverable
            className="d-flex my-3 w-full no-underline"
            style={{ height: 185, overflow: "hidden" }}
            bodyStyle={{ width: "100%", padding: "12px" }}
            cover={
              <img
                alt={item.title}
                className="ant-card-cover-customs"
                src={`${DOMAIN}/Images/News/${item.image}`}
                style={{ minWidth: 320, height: 185, objectFit: "cover" }}
              />
            }
          >
 
            <div>
              <h1 className="text-lg mt-1">{item.title}</h1>
              <div className="text-gray-500 text-ellipsis overflow-hidden line-clamp-2">
              <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
              </div>
            </div>
          </Card>
        </a>
      );
    });
  };

  return (
    <div>
      <div className="header__img-text ">
        <h2 className=" text-white heading__text drop-shadow-md">News</h2>
        <div className="text-white end__text drop-shadow-md">Information Page about The Latest Bus Trips</div>
      </div>
      <div className="header__bg-dark header__with-img"></div>
      <div className="container">
        <div className="row">
          <div className="col-8">
            {News()}
            <Pagination
              className="d-flex justify-center line-clamp-3 mb-20"
              pageSize={postsPerPage}
              currentPage={currentPage}
              total={arrNews.length}
              onChange={(page) => {
                setCurrentPage(page);
              }}
            />
          </div>
          <div className="col-4">
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md md:flex-row w-full my-3">
              <div className="flex flex-col justify-between p-4 leading-normal w-full">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Latest News
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
                        <div className="px-2">
                          <a
                            className="text-md font-bold"
                            href={`/News/${item.id}`}
                          >
                            {item.title}
                          </a>
                          <div className="text-ellipsis overflow-hidden line-clamp-2">
                          <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                          </div>
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
