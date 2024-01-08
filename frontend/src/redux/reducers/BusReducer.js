import { GET_BUS_LIST, GET_BUS_TYPE_LIST} from "../constants";

const initialState = {
    arrBus: [],
    arrBusType: [],
    carouselEditDetail: {}

}

export const BusReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_BUS_LIST:
            state.arrBus = action.arrBus;
            return { ...state }
        case GET_BUS_TYPE_LIST:
            state.arrBusType = action.arrBusType;
            return { ...state }
        default:
            return { ...state }
    }
}
