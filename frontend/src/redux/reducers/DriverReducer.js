import { GET_DRIVER_DETAIL, GET_DRIVER_LIST } from "../constants";

const initialState = {
    arrDriver: [],
    driverDetail: {},
}

export const DriverReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_DRIVER_LIST:
            state.arrDriver = action.arrDriver;
            return { ...state }
        case GET_DRIVER_DETAIL:
            state.driverDetail = action.driverDetail;
            return { ...state }
        default:
            return { ...state }
    }
}
