import { GET_PROMOTE_TRIP_DETAIL, GET_PROMOTE_TRIP_LIST } from "../constants";

const initialState = {
    arrPromoteTrip: [],
    promoteTripDetail: {},
    routeList: [],
    chunkSize: 0
}

export const PromoteTripReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_PROMOTE_TRIP_LIST:
            state.arrPromoteTrip = action.arrPromoteTrip;
            [state.routeList, state.chunkSize] = [Array.from(state.arrPromoteTrip), 6];
            state.routeList = [...Array(Math.ceil(action.arrPromoteTrip?.length / state.chunkSize))].map(_ => state.routeList.splice(0, state.chunkSize))
            return { ...state }
        case GET_PROMOTE_TRIP_DETAIL:
            state.promoteTripDetail = action.promoteTripDetail;
            return { ...state }
        default:
            return { ...state }
    }
}
