import { LAY_CHITIET_FEEDBACK, LAY_FEEDBACK } from "../constants";

const initialState = {
    arrFeedback: [],
    feedbackEditDetail: {}

}

export const FeedbackReducer = (state = initialState, action) => {
    switch (action.type) {

        case LAY_FEEDBACK:
            state.arrFeedback = action.arrFeedback;
            return { ...state }

        case LAY_CHITIET_FEEDBACK: {
            state.feedbackEditDetail = action.feedbackEditDetail;
            return { ...state }
        }
        default:
            return { ...state }
    }
}
