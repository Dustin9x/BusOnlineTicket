import { notification } from "antd";
import { GET_TRIP_DETAIL, GET_TRIP_LIST } from "../constants";
import { history } from "../../App";
import { tripService } from "../../services/TripService";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";

export const getTripListAction = () => {
  return async (dispatch) => {
    try {
      const result = await tripService.getTripList();
      if (result.data.status === 200) {
        dispatch({
          type: GET_TRIP_LIST,
          arrTrip: result.data.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};
export const getTripListByDriverId = (Id) => {
  return async (dispatch) => {
    try {
      const result = await tripService.getTripByDriverId(Id);
      if (result.data.status === 200) {
        dispatch({
          type: GET_TRIP_LIST,
          arrTrip: result.data.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const getTripByIdAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await tripService.getTripById(id);
      if (result.data.status === 200) {
        dispatch({
          type: GET_TRIP_DETAIL,
          tripDetail: result.data.data[0],
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const addNewTripAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await tripService.addNewTrip(formData);
      notification.success({
        closeIcon: true,
        message: "Success",
        description: <>Add new trip successfully.</>,
      });
      history.push("/admin/tripmng");
    } catch (error) {
      notification.error({
        closeIcon: true,
        message: "Error",
        description: <>Duplicate driver or bus within the selected time range.</>,
      });
      console.log("error", error);
    }
  };
};

export const updateTripAction = (id, formData) => {
  return async (dispatch) => {
    try {
      const result = await tripService.updateTrip(id, formData);
      notification.success({
        closeIcon: true,
        message: 'Success',
        description: (
          <>Update trip successfully</>
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
      if (result.data.status === 200) {
        notification.success({
          closeIcon: true,
          message: "Success",
          description: <>Delete trip successfully</>,
        });
        dispatch(getTripListAction());
      }else{
        notification.error({
          closeIcon: true,
          message: "Error",
          description: <>Cannot delete trip</>,
        });
      }
    } catch (error) {
      console.log("error", error);
      notification.error({
        closeIcon: true,
        message: "Error",
        description: <>Cannot delete trip</>,
      });
    }
  };
};
export const getTripListOptionsAction = (options) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await tripService.getTripListOptions(options);
      if (result.data.status === 200) {
        dispatch({
          type: GET_TRIP_LIST,
          arrTrip: result.data.data,
        });
        await dispatch(hideLoadingAction);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};
