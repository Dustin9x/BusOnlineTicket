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

    console.log('arrOffer', arrOffer)

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
                        <div className="col-2">
                            <Card hoverable onClick={() => {
                                dispatch(getOfferDetailAction(item.id))
                                // setTripDetail(trip)
                                showModal()
                            }}
                                cover={<img alt="example" style={{ height: 150, objectFit: 'cover' }} src={`${DOMAIN}/Images/Offer/${item.image}`} />} >
                                <Meta style={{ height: 50 }} title={item.title} />
                            </Card>
                        </div>
                    )
                })}
            </div>
            <Modal title={offerDetail?.title} open={isModalOpen} width={800} onOk={handleOk} onCancel={handleCancel}>
                <div className="row">
                    <div className="col-4 text-center my-auto">
                        <div id="offerCode" className="text-center  text-red-500 font-bold text-2xl">{offerDetail?.offerCode}</div>
                        <Button className="" type="primary" icon={<CopyOutlined />} onClick={copyCode}>Click to copy</Button>
                        <div className="text-xs">Valid from {dayjs(offerDetail?.beginDate).format("DD-MM-YYYY")} to {dayjs(offerDetail?.endDate).format("DD-MM-YYYY")}</div>

                    </div>
                    <div className="col-8">
                        <img src={`${DOMAIN}/Images/Offer/${offerDetail?.image}`} className="mx-auto" style={{ height: '200px', objectFit: 'cover' }} alt={offerDetail?.title} />
                        <div dangerouslySetInnerHTML={{ __html: offerDetail?.content }}></div>
                    </div>
                </div>

            </Modal>
        </div>
    )
}