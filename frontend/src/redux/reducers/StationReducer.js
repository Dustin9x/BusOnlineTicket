import { GET_BUS_LIST, GET_BUS_TYPE_DETAIL, GET_BUS_TYPE_LIST, GET_STATION_LIST} from "../constants";

const initialState = {
    arrStation: [],
}

export const StationReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_STATION_LIST:
            state.arrStation = action.arrStation;
            return { ...state }
        default:
            return { ...state }
    }
}
