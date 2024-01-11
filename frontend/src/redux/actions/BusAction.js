import { GET_BUS_DETAIL, GET_BUS_LIST, GET_BUS_TYPE_DETAIL, GET_BUS_TYPE_LIST } from "../constants";
import { history } from "../../App";
import { busManageService } from "../../services/BusManageService";
import { notification } from "antd";


export const getBusListAction = () => {
    return async (dispatch) => {
        try {
            const result = await busManageService.getBusList();
            dispatch({
                type: GET_BUS_LIST,
                arrBus: result.data.data
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const getBusByIdAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await busManageService.getBusById(id);
            dispatch({
                type: GET_BUS_DETAIL,
                busDetail: result.data.data[0],
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const addNewBusAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await busManageService.addNewBus(formData)
            notification.success({
                closeIcon: false,
                message: 'Success',
                description: (
                    <>Add new bus successfully.</>
                ),
            });
            history.push('/admin/busmng');
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const updateBusByIdAction = (id,formData) => {
    return async (dispatch) => {
        try {
            const result = await busManageService.updateBus(id,formData);
            notification.success({
                closeIcon: false,
                message: 'Success',
                description: (
                    <>Update bus successfully</>
                ),
            });
            history.push('/admin/busmng');
        } catch (error) {
            console.log('error', error);
        }
    }
}


export const deleteBusAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await busManageService.deleteBus(id);
            notification.success({
                closeIcon: false,
                message: 'Success',
                description: (
                    <>Delete bus type successfully</>
                ),
            });
            dispatch(getBusListAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}



// Bus Type
export const getBusTypeListAction = () => {
    return async (dispatch) => {
        try {
            const result = await busManageService.getBusTypeList();
            dispatch({
                type: GET_BUS_TYPE_LIST,
                arrBusType: result.data.data
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const getBusTypeByIdAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await busManageService.getBusTypeById(id);
            dispatch({
                type: GET_BUS_TYPE_DETAIL,
                busTypeDetail: result.data.data[0]
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}


export const addBusTypeAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await busManageService.addNewBusType(formData)
            notification.success({
                closeIcon: false,
                message: 'Success',
                description: (
                    <>Add new bus type successfully</>
                ),
            });
            history.push('/admin/bustypemng');
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const updateBusTypeByIdAction = (id,formData) => {
    return async (dispatch) => {
        try {
            const result = await busManageService.updateBusType(id,formData);
            notification.success({
                closeIcon: false,
                message: 'Success',
                description: (
                    <>Update bus type successfully</>
                ),
            });
            history.push('/admin/bustypemng');
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const deleteBusTypeAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await busManageService.deleteBusType(id);
            notification.success({
                closeIcon: false,
                message: 'Success',
                description: (
                    <>Delete bus type successfully</>
                ),
            });
            dispatch(getBusTypeListAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}