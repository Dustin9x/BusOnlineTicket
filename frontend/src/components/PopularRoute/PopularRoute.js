/* eslint-disable no-lone-blocks */
import { Card, Carousel, Tag } from "antd";
import React, { useEffect, useRef } from "react";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { getTripListAction } from "../../redux/actions/TripAction";
import { DOMAIN } from "../../util/settings/config";
import { getPromoteTripListAction } from "../../redux/actions/PromoteTripAction";
import _ from "lodash";

export default function PopularRoute(props) {
    const { Meta } = Card;
    const dispatch = useDispatch();
    let { arrPromoteTrip, routeList } = useSelector(state => state.PromoteTripReducer);
    useEffect(() => {
        dispatch(getPromoteTripListAction())
    }, [dispatch])

    const slickarrowleft = ({ currentslide, slidecount, ...props }) => (
        <button
            {...props}
            classname={
                "slick-prev slick-arrow" +
                (currentslide === 0 ? " slick-disabled" : "")
            }
            aria-hidden="true"
            aria-disabled={currentslide === 0 ? true : false}
            type="button"
        >
            previous
        </button>
    );
    const slickarrowright = ({ currentslide, slidecount, ...props }) => (
        <button
            {...props}
            classname={
                "slick-next slick-arrow" +
                (currentslide === slidecount - 1 ? " slick-disabled" : "")
            }
            aria-hidden="true"
            aria-disabled={currentslide === slidecount - 1 ? true : false}
            type="button"
        >
            next
        </button>
    );

    const settings = {
        autoplay: true,
        autoplaySpeed: 10000,
        className: "center",
        draggable: true,
        swipeToSlide: true,
        prevarrow: <slickarrowleft />,
        nextarrow: <slickarrowright />,
    };

    return (
        <div >
            <h1 className="text-center text-2xl">Popular Bus Routes</h1>
            <div className="py-4 rounded-xl bg-white" style={{ margin: '0 -15px' }}>
                <Carousel arrows {..._.omit(props, ['currentSlide', 'slideCount'])} draggable={true} {...settings} style={{ height: 320 }} className="d-block">
                    {routeList?.map((element, i) => {
                        return (
                            <div key={i} className="d-flex" >
                                {element?.map((item, index) => {
                                    return (
                                        <a href={`/search/?from=${item.fromStation}&to=${item.toStation}`} key={index} className="hover:no-underline flex justify-center col-2">
                                            <Card hoverable
                                                cover={<img alt="example" style={{ height: 150, objectFit: 'cover' }} src={`${DOMAIN}/Images/PromoteTrip/${item.image}`} />} >
                                                <Meta style={{ height: 50 }} title={`${item.fromStation} - ${item.toStation}`} />
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