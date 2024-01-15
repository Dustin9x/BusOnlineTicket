import { Collapse, Divider } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFAQListAction } from '../../redux/actions/FAQAction';
const { Panel } = Collapse;

export default function Faqs() {
    let { arrFAQ } = useSelector(state => state.FAQReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFAQListAction())
    }, [dispatch])
    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

    const onChange = (key) => {
        console.log(key);
    };

    return (
        <div className="mt-5">
            <h2 className="text-lg font-bold">PHTV Online Bus Booking FAQ’s</h2>
            <Collapse bordered={false} defaultActiveKey={['1']} style={{ backgroundColor: '#fff' }} size="large" onChange={onChange}>
                {arrFAQ?.map((item, index) => {
                    return (
                        <Panel header={item.question} className='font-semibold' key={index}>
                            <p className="text-gray-500 font-normal text-sm">{item.answer}</p>
                        </Panel>
                    )
                })}
            </Collapse>
        </div>

    )
}