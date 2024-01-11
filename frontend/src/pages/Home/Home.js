import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Tabs } from "antd";
import dayjs from "dayjs";
import { KetQuaDatVe } from "./../Checkout/Checkout";
import SelectBus from "../../components/SelectBus/SelectBus";
import TabPane from "antd/es/tabs/TabPane";
import CheckTicket from "../../components/CheckTicket/CheckTicket";
import PopularRoute from "../../components/PopularRoute/PopularRoute";

export default function Home(props) {
  const dispatch = useDispatch();
  const { arrMovie } = useSelector((state) => state.MovieReducer);
  const { TabPane } = Tabs;
  const btnRef = useRef();

  useEffect(() => {
    // dispatch(layDanhSachPhimAction());
  }, []);

  useEffect(() => {
    btnRef.current.focus();
  }, []);

  return (
    <div>
      <div style={{ backgroundImage: 'url(./img/vietnambackground.jpg)', backgroundSize: 'cover' }}>
        <div className="container mx-auto" style={{ maxWidth: '1000px', height: '400px' }}>
          <Tabs
            defaultActiveKey="1"
            centered
            className=""
            itemActiveColor="#eee"
            tabBarStyle={{ width: "100%", border: 0 }}
          >
            <TabPane key="1"
              tab={<button className="block w-full text-xl  focus:outline-none mr-4 py-2 px-4 rounded-full font-semibold  bg-red-50 text-red-700 hover:bg-red-100 focus:bg-red-500 active:bg-red-500 focus:text-white"
                ref={btnRef}
              > BUS SCHEDULE </button>}
            >
              <Card className='mt-10'>
                <SelectBus />
              </Card>
            </TabPane>
            <TabPane key="2"
              tab={<button className="block w-full text-xl  focus:outline-none mr-4 py-2 px-4 rounded-full font-semibold  bg-red-50 text-red-700 hover:bg-red-100 focus:bg-red-500 active:bg-red-500 focus:text-white">
                CHECK TICKET </button>}
            >
              <CheckTicket />
            </TabPane>
          </Tabs>
        </div>
      </div>
      <div className="my-12">
        <h1 className="text-center text-2xl">  Popular bus routes </h1>
        <div className="mt-3 container">
          <PopularRoute />
          <Button className="text-red-500 text-right w-full" href="/news" type="link" > Xem thêm &gt;&gt; </Button>
        </div>
      </div>
    </div>

  );
}
