import { GET_CUM_RAP_CHIEU, GET_DANH_SACH_TINH_THANH, GET_TRIP_LIST } from "../constants"

const initialState = {
  arrTrip: [],
}

export const TripReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_TRIP_LIST:
      state.arrTrip = action.arrTrip;
      return { ...state }

    // case GET_DANH_SACH_TINH_THANH:
    //   state.tinhThanh = action.tinhThanh;
    //   return { ...state }
    default:
      return state
  }
}
