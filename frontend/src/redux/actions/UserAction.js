import { driverService } from "../../services/DriverService";
import {
  GET_USER_LIST,
  LAY_LAI_MAT_KHAU_ACTION,
  LOGIN_ACTION,
  GET_USER_DETAIL,
  GET_PROFILE_DETAIL,
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
          closeIcon: true,
          message: "Success",
          description: (
            <>
              Login successfully.<br />
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
        closeIcon: true,
        message: "Error",
        description: (
          <>
            Login fail.<br />
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
        notification.success({
          closeIcon: true,
          message: "Success",
          description: (
            <>
              Register successfully.<br />
              Please login to continue.
            </>
          ),
        });
        history.replace("login");
      } else {
        notification.error({
          closeIcon: true,
          message: "Error",
          description: (
            <>
              Sorry this email is already used.
            </>
          ),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const forgetPassword = (thongTinEmail) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await userService.forgetPassword(thongTinEmail);
      if (result.data.status === 200) {
        dispatch({
          type: LAY_LAI_MAT_KHAU_ACTION,
          thongTinEmail: result.data.content,
        });
        await dispatch(hideLoadingAction);
        notification.success({
          closeIcon: false,
          message: "Success",
          description: (
            <>
              Your new password has been sent to your email, please check your email or spam box and login again.
            </>
          ),
        });
        history.replace("login");
      }
    } catch (error) {
      console.log(error);
      await dispatch(hideLoadingAction);
      alert(error.response.data.message);
    }
  };
};


export const getListUserAction = () => {
  return async (dispatch) => {
    try {
      const result = await userService.getListUser();
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

export const getUserByIdAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await userService.getUserById(id);
      if (result.data.status === 200) {
        dispatch({
          type: GET_USER_DETAIL,
          userDetail: result.data.data[0],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProfileAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await userService.getUserById(id);
      if (result.data.status === 200) {
        dispatch({
          type: GET_PROFILE_DETAIL,
          profile: result.data.data[0],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const createUserAction = (newUser) => {
  return async (dispatch) => {
    try {
      const result = await userService.createUser(newUser);
      notification.success({
        closeIcon: true,
        message: 'Success',
        description: (
          <>Create new user successfully.</>
        ),
      });
      history.push("/admin/adminusers");
    } catch (error) {
      notification.error({
        closeIcon: true,
        message: 'Error',
        description: (
          <>Create New User fail!</>
        ),
      });
    }
  };
};

export const updateUserAction = (id, newUser) => {
  return async (dispatch) => {
    try {
      const result = await userService.updateUser(id, newUser);
      notification.success({
        closeIcon: true,
        message: 'Success',
        description: (
          <>Update user successfully.</>
        ),
      });
      history.push("/admin/adminusers");
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteUserAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await userService.deleteUser(id);
      notification.success({
        closeIcon: true,
        message: "Success",
        description: <>Delete User successfully</>,
      });
      dispatch(getListUserAction());
    } catch (error) {
      console.log("error", error);
    }
  };
};
