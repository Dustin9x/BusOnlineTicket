import {GET_OFFER_LIST, GET_OFFER_DETAIL } from "../constants";

const initialState = {
    arrOffer: [],
    offerDetail:{},
}

export const OfferReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_OFFER_LIST:
            state.arrOffer = action.arrOffer;
            return { ...state }
        case GET_OFFER_DETAIL:
            state.offerDetail= action.offerDetail;
            return {...state}
        default:
            return { ...state }
    }
}
