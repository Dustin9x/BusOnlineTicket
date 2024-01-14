import { driverService } from "../../services/DriverService"
import { GET_DRIVER_DETAIL, GET_DRIVER_LIST } from "../constants";
import { history } from '../../App';
import { notification } from "antd";


export const getDriverAction = () => {
    return async (dispatch) => {
        try {
            const result = await driverService.getDriver();
            if (result.data.status === 200) {
                dispatch({
                    type: GET_DRIVER_LIST,
                    arrDriver: result.data.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getDriverByIdAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await driverService.getDriverById(id);
            dispatch({
                type: GET_DRIVER_DETAIL,
                driverDetail: result.data.data[0],
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const addDriverAction = (newDriver) => {
    return async (dispatch) => {
        try {
            const result = await driverService.postDriver(newDriver);
            notification.success({
                closeIcon: false,
                message: 'Success',
                description: (
                    <>Add driver successfully.</>
                ),
            });
            history.push('/admin/drivermng');
        } catch (error) {
            alert("Create Fail . Please Try Again")
        }
    }
}

export const deleteDriver = (id) => {
    return async (dispatch) => {
        try {
            const result = await driverService.deleteDriver(id);
            notification.success({
                closeIcon: false,
                message: 'Success',
                description: (
                    <>Delete driver successfully.</>
                ),
            });
            dispatch(getDriverAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const updateDriver = (id, newDriver) =>{
    return async (dispatch) => {
        try {
            const result = await driverService.putDriver(id, newDriver)
            notification.success({
                closeIcon: false,
                message: 'Success',
                description: (
                    <>Update driver successfully.</>
                ),
            });
            history.push('/admin/drivermng');
        } catch (error) {
            alert("Update Fail . Please Try Again")
        }
    }
}


