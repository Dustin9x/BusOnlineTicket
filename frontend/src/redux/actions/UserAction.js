import { driverService } from "../../services/DriverService"
import { LAY_CHI_TIET_NGUOI_DUNG, LAY_DANH_SACH_NGUOI_DUNG, LAY_LAI_MAT_KHAU_ACTION, LOGIN_ACTION, SET_THONG_TIN_DAT_VE, TIM_KIEM_NGUOI_DUNG } from "../constants";
import { history } from '../../App';
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import { userService } from "../../services/UserService";


export const loginAction = (loginInfo) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await userService.login(loginInfo);
            if (result.data.status === 200) {
                console.log('dang nhap',result.data)
                dispatch({
                    type: LOGIN_ACTION,
                    loginInfo: result.data.data
                })
                history.push('/admin');
            } else {
                history.replace('login');
                await dispatch(hideLoadingAction)
            }
            await dispatch(hideLoadingAction)
        } catch (error) {
            console.log(error)
            alert(error.response.data.message)
            dispatch(hideLoadingAction)
        }
    }
}


export const registerAction = (thongTinDangKy) => {
    return async (dispatch) => {
        try {
            const result = await userService.register(thongTinDangKy);
            if (result.data.status === 200) {
                alert('Đăng ký thành công, xin đăng nhập để tiếp tục')
                history.replace('login');
            } else {
                alert('Xin lỗi! Email này đã được sử dụng!')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const layLaiMatKhauAction = (thongTinEmail) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            const result = await driverService.layLaiMatKhau(thongTinEmail);
            if (result.data.status === 200) {
                dispatch({
                    type: LAY_LAI_MAT_KHAU_ACTION,
                    thongTinEmail: result.data.content,
                });
                await dispatch(hideLoadingAction)
                alert("Lấy lại mật khẩu thành công, mật khẩu mới đã được gửi về email của bạn!!");
                history.replace("login");
            }
        } catch (error) {
            console.log(error);
            await dispatch(hideLoadingAction)
            alert(error.response.data.message);
        }
    };
};

export const themNguoiDungAction = (newUser) => {
    return async (dispatch) => {
        try {
            const result = await driverService.themNguoiDung(newUser);
            alert('Thêm người dùng mới thành công')
            history.push('/admin/users');
        } catch (error) {
            alert(error.response.data.message)
        }
    }
}

export const capNhatNguoiDungAction = (id, newUser) => {
    return async (dispatch) => {
        try {
            const result = await driverService.capNhatNguoiDung(id, newUser);
            dispatch(layThongTinNguoiDungAction(id))
            alert('Cập nhật người dùng thành công')
            history.goBack();
        } catch (error) {
            console.log(error)
        }
    }
}

export const layThongTinDatVeAction = () => {
    return async (dispatch) => {
        try {
            const result = await driverService.layThongTinDatVe();
            if (result.data.status === 200) {
                dispatch({
                    type: SET_THONG_TIN_DAT_VE,
                    thongTinNguoiDung: result.data.content
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const layThongTinNguoiDungAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await driverService.layDanhSachNguoiDung(id);
            if (result.data.status === 200) {
                dispatch({
                    type: LAY_CHI_TIET_NGUOI_DUNG,
                    profile: result.data.content
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

