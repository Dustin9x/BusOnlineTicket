/* eslint-disable no-lone-blocks */
import { Card, Carousel, Tag } from "antd";
import React, { useEffect, useRef } from "react";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
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

    let [list, chunkSize] = [arrPromoteTrip, 6];
    list = [...Array(Math.ceil(list.length / chunkSize))].map(_ => list.splice(0, chunkSize))

    console.log(list);

    console.log('arrPromoteTrip', arrPromoteTrip)

    const settings = {
        // autoplay: true,
        // autoplaySpeed: 1500,
        // className: "center",
        // draggable: true,
        // swipeToSlide: true
    }

    return (
        <div >
            <h1 className="text-center text-2xl">Popular bus routes</h1>
            <div className="py-4 rounded-xl bg-white" style={{margin: '0 -15px'}}>
                <Carousel arrows prevArrow={<LeftOutlined />} nextArrow={<RightOutlined />} draggable={true} style={{height:320}} className="d-block">
                    {list.map(element => {
                        return (
                            <div className="d-flex" >
                                {element?.map((item, index) => {
                                    return (
                                            <a href={`/search/?from=${item.fromStation}&to=${item.toStation}`} key={index} className="hover:no-underline flex justify-center col-2">
                                                <Card hoverable style={{ width: '90%' }}
                                                    cover={<img alt="example" style={{ height: 150, objectFit: 'cover' }} src={`${DOMAIN}/Images/PromoteTrip/${item.image}`} />} >
                                                    <Meta style={{height:50}} title={`${item.fromStation} - ${item.toStation}`} />
                                                    <div className="mt-3"><Tag color="magenta">{`From ${item?.minPrice?.toLocaleString("en-US", { style: "currency", currency: "USD" })}`}</Tag></div>
                                                </Card>
                                            </a>
                                    )
                                })}
                            </div>
                        )

                    })}
                </Carousel>
            </div>
        </div>

    )
}