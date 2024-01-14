import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layDonHangTheoUserAction } from '../../../redux/actions/QuanLyDonHangAction'
import { USER_LOGIN } from '../../../util/settings/config'
import { KetQuaDatVe } from '../../Detail/Detail'

export default function OrderHistory() {
    // const { donHang } = useSelector(state => state.OrderReducer)
    const dispatch = useDispatch()

    let userLogin = {}
  if (localStorage.getItem(USER_LOGIN)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
  }

    useEffect(() => {
        const action = layDonHangTheoUserAction(userLogin.id);
        dispatch(action)
    }, [])
  return (
    <div>
      <KetQuaDatVe/>
    </div>
  )
}
