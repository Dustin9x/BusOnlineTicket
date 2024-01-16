import { notification } from "antd";
import { stationManageService } from "../../services/StationManageService";
import { GET_STATION_DETAIL, GET_STATION_LIST } from "../constants";
import { history } from "../../App";

export const getStationListAction = () => {
    return async (dispatch) => {
        try {
            const result = await stationManageService.getStationList();
            if (result.data.status === 200) {
                dispatch({
                    type: GET_STATION_LIST,
                    arrStation: result.data.data
                })
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const getStationByIdAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await stationManageService.getStationById(id);
            if (result.data.status === 200) {
                dispatch({
                    type: GET_STATION_DETAIL,
                    stationDetail: result.data.data[0]
                })
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const addNewStationAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await stationManageService.addNewStation(formData)
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Add new station successfully.</>
                ),
            });
            history.push('/admin/stationmng');
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const updateStationByIdAction = (id,formData) => {
    return async (dispatch) => {
        try {
            const result = await stationManageService.updateStation(id,formData);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Update station successfully</>
                ),
            });
            history.push('/admin/stationmng');
        } catch (error) {
            console.log('error', error);
        }
    }
}


export const deleteStationAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await stationManageService.deleteStation(id);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Delete station successfully</>
                ),
            });
            dispatch(getStationListAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}
