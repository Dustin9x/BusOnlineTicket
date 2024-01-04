import { applyMiddleware, createStore, combineReducers } from "redux";
import reduxThunk from 'redux-thunk';
import { BusReducer } from './reducers/BusReducer';
import { MovieReducer } from './reducers/MovieReducer';
import { RapReducer } from './reducers/RapReducer';
import { UserReducer } from './reducers/UserReducer';
import { QuanLyDatVeReducer } from './reducers/QuanLyDatVeReducer';
import { LoadingReducer } from './reducers/LoadingReducer';
import { FeedbackReducer } from './reducers/FeedbackReducer';
import { OrderDetailReducer } from './reducers/OderDetailReducer';



const rootReducer = combineReducers({
    BusReducer,
    UserReducer,
    MovieReducer,
    RapReducer,
    QuanLyDatVeReducer,
    LoadingReducer,
    FeedbackReducer,
    OrderDetailReducer
})

export const store = createStore(rootReducer,applyMiddleware(reduxThunk));