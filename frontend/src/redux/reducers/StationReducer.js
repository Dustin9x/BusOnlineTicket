import { GET_STATION_DETAIL, GET_STATION_LIST } from "../constants";

const initialState = {
    arrStation: [],
    stationDetail: {}
}

export const StationReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_STATION_LIST:
            state.arrStation = action.arrStation;
            return { ...state }
        case GET_STATION_DETAIL:
            state.stationDetail = action.stationDetail;
            return { ...state }
        default:
            return { ...state }
    }
}
