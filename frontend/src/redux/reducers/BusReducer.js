import { GET_BUS_LIST} from "../constants";

const initialState = {
    arrBus: [],
    carouselEditDetail: {}

}

export const BusReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_BUS_LIST:
            state.arrBus = action.arrBus;
            return { ...state }
        default:
            return { ...state }
    }
}
