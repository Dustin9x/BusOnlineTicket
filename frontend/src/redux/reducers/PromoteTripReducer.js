import { GET_PROMOTE_TRIP_DETAIL, GET_PROMOTE_TRIP_LIST } from "../constants";

const initialState = {
    arrPromoteTrip: [],
    promoteTripDetail: {},
}

export const PromoteTripReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_PROMOTE_TRIP_LIST:
            state.arrPromoteTrip = action.arrPromoteTrip;
            return { ...state }
        case GET_PROMOTE_TRIP_DETAIL:
            state.promoteTripDetail = action.promoteTripDetail;
            return { ...state }
        default:
            return { ...state }
    }
}
