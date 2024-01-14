import { Collapse, Divider } from 'antd';
const { Panel } = Collapse;

export default function Faqs() {
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
            <Collapse bordered={false} defaultActiveKey={['1']} style={{backgroundColor: '#fff'}} size="large" onChange={onChange}>
                <Panel header="This is panel header 1" key="1">
                    <p>{text}</p>
                </Panel>
                <Panel header="This is panel header 2" key="2">
                    <p>{text}</p>
                </Panel>
                <Panel header="This is panel header 3" key="3">
                    <p>{text}</p>
                </Panel>
            </Collapse>
        </div>

    )
}