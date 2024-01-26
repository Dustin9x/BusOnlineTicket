import { GET_OFFER_LIST, GET_OFFER_DETAIL, GET_OFFER_BY_CODE } from "../constants";

const initialState = {
    arrOffer: [],
    offerDetail: {},
    offerCodeDetail: {},
}

export const OfferReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_OFFER_LIST:
            state.arrOffer = action.arrOffer;
            return { ...state }
        case GET_OFFER_DETAIL:
            state.offerDetail = action.offerDetail;
            return { ...state }
        case GET_OFFER_BY_CODE:
            state.offerCodeDetail = action.offerCodeDetail;
            return { ...state }
        default:
            return { ...state }
    }
}
