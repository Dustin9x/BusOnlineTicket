import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_LOGIN } from '../../../util/settings/config'
import { KetQuaDatVe } from '../../Detail/Detail'
import { getTicketByUserAction } from '../../../redux/actions/OrderAction'

export default function UserOrder(props) {
  const dispatch = useDispatch()

  let { id } = props.match.params
  let user = {};
  if (localStorage.getItem('userParams')) {
    user = JSON.parse(localStorage.getItem('userParams'));
  }

  useEffect(() => {
    const action = getTicketByUserAction(id);
    dispatch(action)
  }, [])
  return (
    <div>
      <p>Lịch Sử Đặt Vé Của: </p>
      <h1>User: {user.name}</h1>
      <h1>Email: {user.email} </h1>
      <div className='container'>
        <KetQuaDatVe />

      </div>
    </div>
  )
}
