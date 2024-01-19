import { GET_DRIVER_DETAIL, GET_DRIVER_LIST, GET_REGISTER_DRIVER_LIST } from "../constants";

const initialState = {
    arrDriver: [],
    driverDetail: {},
    arrRegisterDriver: []
}

export const DriverReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_DRIVER_LIST:
            state.arrDriver = action.arrDriver;
            return { ...state }

        case GET_REGISTER_DRIVER_LIST:
            state.arrRegisterDriver = action.arrRegisterDriver;
            return { ...state }

        case GET_DRIVER_DETAIL:
            state.driverDetail = action.driverDetail;
            return { ...state }
        default:
            return { ...state }
    }
}
