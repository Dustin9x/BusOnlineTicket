import { GET_BUS_LIST, GET_BUS_TYPE_DETAIL, GET_BUS_TYPE_LIST, GET_CAROUSEL } from "../constants";
import { quanLyCarouselService } from "../../services/QuanLyCarouselService";
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

// export const themCarouselAction = (formData) => {
//     return async (dispatch) => {
//         try {
//             const result = await quanLyCarouselService.themCarousel(formData)
//             alert('Thêm carousel thành công');
//             history.push('/admin/carouselmng');
//         } catch (error) {
//             console.log('error', error);
//         }
//     }
// }

// export const capNhatCarouselAction = (maBanner,formData) => {
//     return async (dispatch) => {
//         try {
//             const result = await quanLyCarouselService.capNhatCarousel(maBanner,formData)
//             alert('Cập nhật carousel thành công');
//             history.push('/admin/carouselmng');
//         } catch (error) {
//             console.log('error', error);
//         }
//     }
// }


// export const layThongTinCarouselAction = (maBanner) => {
//     return async (dispatch) => {
//         try {
//             const result = await quanLyCarouselService.layThongTinCarousel(maBanner);
//             dispatch({
//                 type: SET_THONG_TIN_CAROUSEL,
//                 carouselEditDetail: result.data.content
//             })
//         } catch (error) {
//             console.log('error', error);
//         }
//     }
// }



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