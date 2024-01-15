import { GET_FAQ_DETAIL, GET_FAQ_LIST } from "../constants";

const initialState = {
    arrFAQ: [],
    FAQDetail: {}
}

export const FAQReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_FAQ_LIST:
            state.arrFAQ = action.arrFAQ;
            return { ...state }

        case GET_FAQ_DETAIL: {
            state.FAQDetail = action.FAQDetail;
            return { ...state }
        }
        default:
            return { ...state }
    }
}
