import _ from "lodash";
import { GET_OFFER_LIST, GET_OFFER_DETAIL, GET_OFFER_BY_CODE, GET_OFFER_CHUNK } from "../constants";

const initialState = {
    arrOffer: [],
    offerDetail: {},
    offerCodeDetail: {},
    offerList: [],
    chunkSize: 0
}

export const OfferReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_OFFER_LIST:
            state.arrOffer = action.arrOffer;
            [state.offerList, state.chunkSize] = [Array.from(state.arrOffer), 6];
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
