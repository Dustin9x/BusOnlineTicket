import { Card, Tag } from "antd";
import React, { useEffect, useRef } from "react";
import { SearchOutlined } from '@ant-design/icons';


export default function PopularRoute() {
    const { Meta } = Card;

    return (
        <div className="w-100 p-4 rounded-xl bg-white">
            <a href="#" className="hover:no-underline">
            <Card
                
                hoverable
                style={{ width: 300 }}
                cover={<img alt="example" style={{ height: 250, objectFit: 'cover' }} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <Meta title="Ho Chi Minh - Da Nang" description="From 2.000.000đ" />
                <div className="mt-3"><Tag color="magenta">Luxury</Tag></div>
            </Card>
            </a>
            
        </div>
    )
}