import { GET_CUM_RAP_CHIEU, GET_DANH_SACH_TINH_THANH, GET_TRIP_DETAIL, GET_TRIP_LIST } from "../constants"

const initialState = {
  arrTrip: [],
  tripDetail: {}
}

export const TripReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_TRIP_LIST:
      state.arrTrip = action.arrTrip;
      return { ...state }
    case GET_TRIP_DETAIL:
      state.tripDetail = action.tripDetail;
      return { ...state }
    default:
      return state
  }
}
