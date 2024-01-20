import { Card, Tag } from "antd";
import React, { useEffect, useRef } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { getTripListAction } from "../../redux/actions/TripAction";
import { DOMAIN } from "../../util/settings/config";


export default function PopularRoute() {
    const { Meta } = Card;
    const dispatch = useDispatch();
    let { arrTrip } = useSelector(state => state.TripReducer);
    useEffect(() => {
        dispatch(getTripListAction())
    }, [])

    return (
        <div>
            <h1 className="text-center text-2xl">Popular bus routes</h1>
            <div className="row p-4 rounded-xl bg-white">
                {arrTrip?.map((item, index) => {
                    return (
                        <a href={`/detail/${item.id}`} key={index} className="hover:no-underline col-2">
                            <Card
                                hoverable
                                style={{ width: '100%' }}
                                cover={<img alt="example" style={{ height: 150, objectFit: 'cover' }} src={`${DOMAIN}/Images/Trip/${item.image}`} />}
                            >
                                <Meta title={`${item.fromStation?.name} - ${item.toStation?.name}`} description="From 2.000.000đ" />
                                <div className="mt-3"><Tag color="magenta">{item.bus?.busType?.name}</Tag></div>
                            </Card>
                        </a>
                    )
                })}
            </div>
        </div>

    )
}