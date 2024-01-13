import { driverService } from "../../services/DriverService";
import {
  LAY_CHI_TIET_NGUOI_DUNG,
  GET_USER_LIST,
  LAY_LAI_MAT_KHAU_ACTION,
  LOGIN_ACTION,
  SET_THONG_TIN_DAT_VE,
} from "../constants";
import { history } from "../../App";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import { UserService, userService } from "../../services/UserService";
import { notification } from "antd";

export const loginAction = (loginInfo) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await userService.login(loginInfo);
      console.log("dang nhap", result);
      if (result.status === 200) {
        dispatch({
          type: LOGIN_ACTION,
          loginInfo: result.data.data,
        });
        notification.success({
          closeIcon: false,
          message: "Success",
          description: (
            <>
              Login successfully.
              <br />
              Welcom to PHTV Bus.
            </>
          ),
        });
        history.push("/admin");
      } else {
        await dispatch(hideLoadingAction);
        history.replace("login");
      }
      await dispatch(hideLoadingAction);
    } catch (error) {
      dispatch(hideLoadingAction);
      notification.error({
        closeIcon: false,
        message: "Error",
        description: (
          <>
            Login fail.
            <br />
            Please try again.
          </>
        ),
      });
    }
  };
};

export const registerAction = (thongTinDangKy) => {
  return async (dispatch) => {
    try {
      const result = await userService.register(thongTinDangKy);
      if (result.data.status === 200) {
        alert("Đăng ký thành công, xin đăng nhập để tiếp tục");
        history.replace("login");
      } else {
        alert("Xin lỗi! Email này đã được sử dụng!");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const layLaiMatKhauAction = (thongTinEmail) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await driverService.layLaiMatKhau(thongTinEmail);
      if (result.data.status === 200) {
        dispatch({
          type: LAY_LAI_MAT_KHAU_ACTION,
          thongTinEmail: result.data.content,
        });
        await dispatch(hideLoadingAction);
        alert(
          "Lấy lại mật khẩu thành công, mật khẩu mới đã được gửi về email của bạn!!"
        );
        history.replace("login");
      }
    } catch (error) {
      console.log(error);
      await dispatch(hideLoadingAction);
      alert(error.response.data.message);
    }
  };
};

export const layThongTinDatVeAction = () => {
  return async (dispatch) => {
    try {
      const result = await driverService.layThongTinDatVe();
      if (result.data.status === 200) {
        dispatch({
          type: SET_THONG_TIN_DAT_VE,
          thongTinNguoiDung: result.data.content,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// export const layThongTinNguoiDungAction = (id) => {
//   return async (dispatch) => {
//     try {
//       const result = await UserService.GetListUser(id);
//       if (result.data.status === 200) {
//         dispatch({
//           type: LAY_CHI_TIET_NGUOI_DUNG,
//           profile: result.data.content,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const GetListUser = () => {
  return async (dispatch) => {
    try {
      const result = await userService.GetListUser();
      if (result.data.status === 200) {
        dispatch({
          type: GET_USER_LIST,
          arrUser: result.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const createUser = (newUser) => {
  return async (dispatch) => {
    try {
      const result = await userService.createUser(newUser);
      alert("Create new user successfully");
      history.push("/admin/adminusers");
    } catch (error) {
      alert("Create New User fail!!");
    }
  };
};

export const updateUser = (id, newUser) => {
  return async (dispatch) => {
    try {
      const result = await userService.updateUser(id, newUser);
      // dispatch(layThongTinNguoiDungAction(id));
      alert("Updata User successfully");
      history.push("/admin/adminusers");
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const result = await userService.deleteUser(id);
      notification.success({
        closeIcon: false,
        message: "Success",
        description: <>Delete User successfully</>,
      });
      dispatch(GetListUser());
    } catch (error) {
      console.log("error", error);
    }
  };
};
