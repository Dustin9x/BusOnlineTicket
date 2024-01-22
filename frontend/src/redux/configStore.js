import { applyMiddleware, createStore, combineReducers } from "redux";
import reduxThunk from 'redux-thunk';
import { BusReducer } from './reducers/BusReducer';
import { StationReducer } from './reducers/StationReducer';
import { UserReducer } from './reducers/UserReducer';
import { LoadingReducer } from './reducers/LoadingReducer';
import { FAQReducer } from './reducers/FAQReducer';
import { OrderDetailReducer } from './reducers/OderDetailReducer';
import { TripReducer } from './reducers/TripReducer';
import { DriverReducer } from './reducers/DriverReducer';
import { OrderReducer } from './reducers/OrderReducer';
import { ModReducer } from './reducers/ModReducer';
import { PromoteTripReducer } from './reducers/PromoteTripReducer';



const rootReducer = combineReducers({
    BusReducer,
    UserReducer,
    ModReducer,
    StationReducer,
    DriverReducer,
    TripReducer,
    OrderReducer,
    LoadingReducer,
    FAQReducer,
    OrderDetailReducer,
    PromoteTripReducer
})

export const store = createStore(rootReducer,applyMiddleware(reduxThunk));