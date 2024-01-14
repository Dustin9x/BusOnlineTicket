import { notification } from "antd";
import { GET_TRIP_DETAIL, GET_TRIP_LIST } from "../constants";
import { history } from "../../App";
import { tripService } from "../../services/TripService";

export const getTripListAction = () => {
    return async (dispatch) => {
        try {
            const result = await tripService.getTripList();
            if (result.data.status === 200) {
                dispatch({
                    type: GET_TRIP_LIST,
                    arrTrip: result.data.data
                })
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const getTripByIdAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await tripService.getTripById(id);
            if (result.data.status === 200) {
                dispatch({
                    type: GET_TRIP_DETAIL,
                    tripDetail: result.data.data[0]
                })
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}


export const addNewTripAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await tripService.addNewTrip(formData)
            notification.success({
                closeIcon: false,
                message: 'Success',
                description: (
                    <>Add new trip successfully.</>
                ),
            });
            history.push('/admin/tripmng');
        } catch (error) {
            console.log('error', error);
        }
    }
}


export const deleteTripAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await tripService.deleteTrip(id);
            notification.success({
                closeIcon: false,
                message: 'Success',
                description: (
                    <>Delete trip successfully</>
                ),
            });
            dispatch(getTripListAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}

