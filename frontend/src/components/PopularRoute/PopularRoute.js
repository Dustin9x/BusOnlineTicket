import { Card, Carousel, Tag } from "antd";
import React, { useEffect, useRef } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { getTripListAction } from "../../redux/actions/TripAction";
import { DOMAIN } from "../../util/settings/config";
import { getPromoteTripListAction } from "../../redux/actions/PromoteTripAction";

export default function PopularRoute() {
    const { Meta } = Card;
    const dispatch = useDispatch();
    let { arrPromoteTrip } = useSelector(state => state.PromoteTripReducer);
    useEffect(() => {
        dispatch(getPromoteTripListAction())
    }, [])


    const settings = {
      autoplay:true,
      autoplaySpeed:1500,
      className: "center",
      infinite: true,
      slidesToShow: 5,
      swipeToSlide: true,
    }

    return (
        <div>
            <h1 className="text-center text-2xl">Popular bus routes</h1>
                <div className=" p-4 rounded-xl bg-white">
                  <Carousel draggable={true} {...settings}  >
                      {arrPromoteTrip?.map((item, index) => {
                              return (
                                <div>
                                  <h3 >
                                    <a href={`/search/?from=${item.fromStation}&to=${item.toStation}`} key={index} className="hover:no-underline col-2">
                                        <Card hoverable style={{ width: '100%' }}
                                            cover={<img alt="example" style={{ height: 150, objectFit: 'cover' }} src={`${DOMAIN}/Images/PromoteTrip/${item.image}`} />} >
                                            <Meta title={`${item.fromStation} - ${item.toStation}`} />
                                            <div className="mt-3"><Tag color="magenta">{`From ${item?.minPrice?.toLocaleString("en-US", { style: "currency", currency: "USD" })}`}</Tag></div>
                                        </Card>
                                    </a>
                                  </h3>
                                </div>
                              )
                        })}
                  </Carousel>
                </div>
        </div>

    )
}