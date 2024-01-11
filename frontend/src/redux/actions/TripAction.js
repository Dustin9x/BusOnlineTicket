import { notification } from "antd";
import { GET_TRIP_LIST } from "../constants";
import { history } from "../../App";
import { tripService } from "../../services/TripService";

export const getTripListAction = () => {
    return async (dispatch) => {
        try {
            const result = await tripService.getTripList();
            dispatch({
                type: GET_TRIP_LIST,
                arrTrip: result.data.data
            })
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

