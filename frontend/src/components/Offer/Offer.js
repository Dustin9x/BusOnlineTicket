/* eslint-disable no-lone-blocks */
import { Button, Card, Carousel, Modal, Tag, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { CopyOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { getTripListAction } from "../../redux/actions/TripAction";
import { DOMAIN } from "../../util/settings/config";
import { getPromoteTripListAction } from "../../redux/actions/PromoteTripAction";
import { getOfferDetailAction, getOfferListAction } from "../../redux/actions/OfferAction";
import dayjs from "dayjs";

export default function Offer() {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    let { arrOffer } = useSelector(state => state.OfferReducer);
    let { offerDetail } = useSelector(state => state.OfferReducer);
    const { Meta } = Card;

    useEffect(() => {
        dispatch(getOfferListAction())
    }, [dispatch])

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const copyCode = () => {
        let copyText = document.getElementById("offerCode").innerText;
        navigator.clipboard.writeText(copyText);

        notification.success({
            closeIcon: true,
            message: 'Success',
            description: (
                <>Copy the code {copyText}</>
            ),
        });
    }


    return (
        <div className="mt-4">
            <h1 className="text-center text-2xl">Bus Booking Offers</h1>
            <div className="py-4 rounded-xl bg-white row" style={{ overflowX: 'scroll', flexWrap: 'nowrap' }}>
                {arrOffer?.map((item, index) => {
                    return (
                        <div key={index} className="col-2">
                            <Card hoverable onClick={() => {
                                dispatch(getOfferDetailAction(item.id))
                                // setTripDetail(trip)
                                showModal()
                            }}
                                cover={<img alt="example" style={{ height: 150, objectFit: 'cover' }} src={`${DOMAIN}/Images/Offer/${item.image}`} />} >
                                <Meta style={{ height: 60 }} className="text-sm" title={item.title} />
                            </Card>
                        </div>
                    )
                })}
            </div>
            <Modal title={offerDetail?.title} open={isModalOpen} maskClosable={true} footer={null} width={750} onOk={handleOk} onCancel={handleCancel}>
                <div className="row">
                    <div className="col-4 text-center my-auto">
                        <img src={`${DOMAIN}/Images/Offer/${offerDetail?.image}`} className="mx-auto object-fit-cover border" style={{ height: '150px', borderRadius: '10px'}} alt={offerDetail?.title} />
                        <div id="offerCode" className="text-center text-red-500 font-bold text-2xl">{offerDetail?.offerCode}</div>
                        <div className="text-red-500">Get discount {offerDetail.discount}%</div>
                        <div className="text-xs">Valid from {dayjs(offerDetail?.beginDate).format("DD-MM-YYYY")} to {dayjs(offerDetail?.endDate).format("DD-MM-YYYY")}</div>
                        <Button className="mt-3" type="primary" icon={<CopyOutlined />} onClick={copyCode}>Click to copy</Button>

                    </div>
                    <div className="col-8">
                        <div className="terms col s12 m9 l8">
                            <h2 className="h5">Terms and Conditions</h2>
                            <ul className="collection sm false" style={{ listStyle: 'number', margin: 'unset', flexFlow: 'column', placeContent: 'center flex-start', alignItems: 'flex-start' }}>
                                <li className="collection-item ">
                                    <div>Offer valid for registered users, please register an account first if you don't have.</div>
                                </li>
                                <li className="collection-item ">
                                    <div>Offer valid only on the route {offerDetail.fromStation} - {offerDetail.toStation}.</div>
                                </li>
                                <li className="collection-item ">
                                    <div>Offer is valid from {dayjs(offerDetail.beginDate).format("DD-MM-YYYY")} to {dayjs(offerDetail.endDate).format("DD-MM-YYYY")}</div>
                                </li>
                                <li className="collection-item ">
                                    <div>This offer cannot be combined with any other offer.</div>
                                </li>
                                <li className="collection-item ">
                                    <div>PHTV reserves the right to disqualify any transaction or discontinue the offer promotion at any time without notice or liability of whatsoever nature. </div>
                                </li>
                                <li className="collection-item ">
                                    <div>Please copy the code and use it when you're proceeding to buy your tickets.</div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

            </Modal>
        </div>
    )
}