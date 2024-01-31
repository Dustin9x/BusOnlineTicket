import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cancelTicketAction, checkTicketAction } from '../../../redux/actions/OrderAction';
import { Form, Input, notification } from 'antd';
import { UserOutlined, CreditCardOutlined, BankOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default function CancelTicket(props) {
  const { ticketDetail } = useSelector((state) => state.OrderReducer);
  const dispatch = useDispatch()

  let { id } = props.match.params;
  useEffect(() => {
    dispatch(checkTicketAction(id));
  }, [dispatch, id])


  let remainDay = dayjs(ticketDetail?.trips?.startTime).get('date') - dayjs(new Date()).get('date')

  let ticketPrice = ticketDetail?.totalPrice

  let refund = 0;
  if (remainDay > 1) {
    refund = ticketPrice
  } else if (remainDay > 0) {
    refund = ticketPrice * 0.3
  } else {
    refund = ticketPrice * 0.15
  }

  const handleSubmit = (values) => {
    if(values.bankname != '' && values.bankaccount != '' && values.accountname != ''){
      dispatch(cancelTicketAction(ticketDetail?.id, remainDay))
    }else{
      notification.error({
        closeIcon: true,
        message: "Error",
        description: (
            <>
                Please fill in all of your account information.
            </>
        ),
    });
    }
  }

  return <div>
    <div className=''>
      <h3 className='text-lg w-full'>Cancel Ticket {ticketDetail?.code}</h3>
      <div className="text-gray-600 body-font">
        <div className="container px-3 py-5 mx-auto">
          <div className="flex flex-col text-center w-full">
            <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">We're sorry you are cancelling the ticket</h1>
            <p className="mx-auto leading-relaxed text-base">We’re sorry to hear that you’ve decided to discontinue our service, and we appreciate the opportunity to have served you.</p>
          </div>
          <div className="container">
            <p className="mx-auto leading-relaxed text-base">
              Also for canceling the ticket, there is a limit like, if cancelled before 2 days then the
              whole money will be returned, and if done one day before, then 15% is debited from the
              total amount and the remaining amount is returned and if done on that day 30% is debited
              from the total amount and the remaining is to be returned back. This action is also to be
              performed by the application alone.
            </p>
          </div>
          <div className='row w-full mx-auto mt-5'>
            <div className='col-6 px-5'>
              <div className='d-flex justify-between mt-3'>
                <p className="font-bold"> Your Ticket Price</p>
                <h3 className='font-bold'>{ticketPrice?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</h3>
              </div>
              <div className='d-flex justify-between'>
                <p>Departure day</p>
                <h3>{dayjs(ticketDetail?.trips?.startTime).format("DD-MM-YYYY")}</h3>
              </div>
              <div className='d-flex justify-between'>
                <p>Number of day before departure day</p>
                <h3>{remainDay}</h3>
              </div>
              <hr></hr>
              <div className='d-flex justify-between mt-3'>
                <p className="font-bold">You will get</p>
                <h3 className='text-xl font-bold text-red-600'>{refund.toLocaleString("en-US", { style: "currency", currency: "USD" })}</h3>
              </div>
            </div>
            <div className='col-6 px-10'>
              <p className='font-bold text-center'>Please enter your account info to get refund</p>
              <Form
                name="basic"
                onFinish={handleSubmit}
                autoComplete="off"
                style={{ width: 370, margin: 'auto' }}
              >
                <Form.Item
                  name="bankname"
                  rules={[
                    {
                      required: true,
                      type: 'string',
                      message: 'Bank name can not be blank!',
                    },
                  ]}
                >
                  <Input size="large" placeholder='Account Name' onInput={e => {
                    e.target.value = e.target.value.toUpperCase()
                    e.target.value = e.target.value.normalize("NFD")
                    e.target.value = e.target.value.replace(/[\u0300-\u036f]/g, "")
                    e.target.value = e.target.value.replace(/đ/g, "d")
                    e.target.value = e.target.value.replace(/Đ/g, "D");
                  }} prefix={<BankOutlined />} />
                </Form.Item>
                <Form.Item
                  name="bankaccount"
                  rules={[
                    {
                      required: true,
                      type: 'string',
                      message: 'Bank account can not be blank!',
                    },
                  ]}
                >
                  <Input size="large" onInput={e => e.target.value = e.target.value.replace(/(\d{4})(\d+)/g, '$1 $2').trim()} placeholder='Bank account' prefix={<CreditCardOutlined />} />
                </Form.Item>

                <Form.Item
                  name="accountname"
                  rules={[
                    {
                      required: true,
                      type: 'string',
                      message: 'Account Name can not be blank!',
                    },
                  ]}
                >
                  <Input size="large" placeholder='Account Name' onInput={e => {
                    e.target.value = e.target.value.toUpperCase()
                    e.target.value = e.target.value.normalize("NFD")
                    e.target.value = e.target.value.replace(/[\u0300-\u036f]/g, "")
                    e.target.value = e.target.value.replace(/đ/g, "d")
                    e.target.value = e.target.value.replace(/Đ/g, "D");
                  }} prefix={<UserOutlined />} />
                </Form.Item>
                <div className='mt-5 d-flex justify-center'>
                  <button type="submit" style={{ width: 350 }} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-full"
                  >Confirm cancel Ticket</button>
                </div>
              </Form>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
}
