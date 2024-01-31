/* eslint-disable no-lone-blocks */
import { Button, Card, Carousel, Modal, Tag, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { DOMAIN } from "../../util/settings/config";
import { getEnableOfferListAction, getOfferDetailAction } from "../../redux/actions/OfferAction";
import dayjs from "dayjs";
import _ from "lodash";

export default function Offer(props) {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    let { offerList } = useSelector(state => state.OfferReducer);
    let { offerDetail } = useSelector(state => state.OfferReducer);
    const { Meta } = Card;

    useEffect(() => {
        dispatch(getEnableOfferListAction())
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

    const settings2 = {
        autoplay: true,
        autoplaySpeed: 10000,
        className: "center",
        draggable: true,
        swipeToSlide: true,
        prevarrow: <slickarrowleft />,
        nextarrow: <slickarrowright />,
    };


    return (
        <div className="mt-4">
            <h1 className="text-center text-2xl">Bus Booking Offers</h1>
            {/* <div className="py-4 rounded-xl bg-white row" style={{ overflowX: 'scroll', flexWrap: 'nowrap' }}> */}
            <div className="py-4 rounded-xl bg-white" style={{ margin: '0 -15px' }}>
                <Carousel arrows {..._.omit(props, ['currentSlide', 'slideCount'])} draggable={true} {...settings2} style={{ height: 320 }} className="d-block">
                    {offerList?.map((element, i) => {
                        return (
                            <div key={i} className="d-flex" >
                                {element?.map((item, index) => {
                                    return (
                                        <div key={index} className="justify-center col-2">

                                            <Card hoverable onClick={() => {
                                                dispatch(getOfferDetailAction(item.id))
                                                showModal()
                                            }}
                                                cover={<img alt="example" style={{ height: 160, objectFit: 'cover' }} src={`${DOMAIN}/Images/Offer/${item.image}`} />} >
                                                <Meta style={{ height: 60}} className="text-sm" title={item.title} />
                                            </Card>
                                        </div>
                                    )
                                })}
                                
                            </div>
                        )

                    })}
                </Carousel>
            </div>
            <Modal title={offerDetail?.title} open={isModalOpen} maskClosable={true} footer={null} width={750} onOk={handleOk} onCancel={handleCancel}>
                <div className="row">
                    <div className="col-4 text-center my-auto">
                        <img src={`${DOMAIN}/Images/Offer/${offerDetail?.image}`} className="mx-auto object-fit-cover border" style={{ height: '150px', borderRadius: '10px' }} alt={offerDetail?.title} />
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
                                    {offerDetail.fromStation == null && offerDetail.toStation == null ? "Offer applied for all routes" : `Offer valid only on the route ${offerDetail.fromStation} - ${offerDetail.toStation}`}
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