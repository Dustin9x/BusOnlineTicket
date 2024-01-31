import { GET_OFFER_LIST, GET_OFFER_DETAIL, GET_OFFER_BY_CODE, GET_ENABLE_OFFER_LIST } from "../constants";

const initialState = {
    arrOffer: [],
    arrEnableOffer: [],
    offerDetail: {},
    offerCodeDetail: {},
    offerList: [],
    chunkSize: 0
}

export const OfferReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_OFFER_LIST:
            state.arrOffer = action.arrOffer;
            return { ...state }
        case GET_ENABLE_OFFER_LIST:
            state.arrEnableOffer = action.arrEnableOffer;
            [state.offerList, state.chunkSize] = [Array.from(state.arrEnableOffer), 6];
            state.offerList = [...Array(Math.ceil(state.offerList.length / state.chunkSize))].map(_ => state.offerList?.splice(0, state.chunkSize))
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
