import { applyMiddleware, createStore, combineReducers } from "redux";
import reduxThunk from 'redux-thunk';
import { BusReducer } from './reducers/BusReducer';
import { StationReducer } from './reducers/StationReducer';
import { MovieReducer } from './reducers/MovieReducer';
import { UserReducer } from './reducers/UserReducer';
import { LoadingReducer } from './reducers/LoadingReducer';
import { FeedbackReducer } from './reducers/FeedbackReducer';
import { OrderDetailReducer } from './reducers/OderDetailReducer';
import { TripReducer } from './reducers/TripReducer';
import { DriverReducer } from './reducers/DriverReducer';
import { OrderReducer } from './reducers/OrderReducer';



const rootReducer = combineReducers({
    BusReducer,
    UserReducer,
    StationReducer,
    DriverReducer,
    MovieReducer,
    TripReducer,
    OrderReducer,
    LoadingReducer,
    FeedbackReducer,
    OrderDetailReducer
})

export const store = createStore(rootReducer,applyMiddleware(reduxThunk));