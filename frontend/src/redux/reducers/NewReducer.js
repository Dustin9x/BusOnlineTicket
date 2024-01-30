import { GET_NEWS_LIST,GET_NEWS_DETAIL } from "../constants";

const initialState = {
    arrNews: [],
    newsDetail:{},
}

export const NewReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_NEWS_LIST:
            state.arrNews = action.arrNews;
            return { ...state }
        case GET_NEWS_DETAIL:
            state.newsDetail= action.newsDetail;
            return {...state}
        
        default:
            return { ...state }
    }
}
