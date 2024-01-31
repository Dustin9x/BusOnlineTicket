import { GET_USER_LIST, LAY_LAI_MAT_KHAU_ACTION, GET_USER_DETAIL, GET_PROFILE_DETAIL, GET_CURRENT_USER_ACTION } from "../constants";
import { history } from "../../App";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import { userService } from "../../services/UserService";
import { notification } from "antd";
import { TOKEN } from "../../util/settings/config";

export const loginAction = (loginInfo) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await userService.login(loginInfo);

      if (result.status === 200) {
        localStorage.setItem(TOKEN, result.data.data.accessToken);
        notification.success({
          closeIcon: true,
          message: "Success",
          description: (
            <>
              Login successfully.<br />
              Welcome to PHTV Bus.
            </>
          ),
        });
        history.push("/");
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
      notification.error({
        closeIcon: true,
        message: "Error",
        description: (
          <>
            Sign in fail, Please try again!!.
          </>
        ),
      });
    }
  };
};

export const forgetPassword = (emailInfo) => {
  return async (dispatch) => {
    try {
      // dispatch(displayLoadingAction);
      const result = await userService.forgetPassword(emailInfo);
      if (result.data.status === 200) {
        dispatch({
          type: LAY_LAI_MAT_KHAU_ACTION,
          emailInfo: result.data.content,
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
      // await dispatch(hideLoadingAction);
      notification.error({
        closeIcon: false,
        message: "Error",
        description: (
          <>
            This email is not registered yet.
          </>
        ),
      });
    }
  };
};


export const getListUserAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const result = await userService.getListUser();
      if (result.data.status === 200) {
        dispatch({
          type: GET_USER_LIST,
          arrUser: result.data.data,
        });
        await dispatch(hideLoadingAction);
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
          profie: result.data.data[0],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCurrentUserAction = (token) => {
  return async (dispatch) => {
    try {
      const result = await userService.getCurrentUser(token);
      if (result.status === 200) {
        dispatch({
          type: GET_CURRENT_USER_ACTION,
          userLogin: result.data,
        });
      }else{
        localStorage.removeItem(TOKEN)
      }
    } catch (error) {
      localStorage.removeItem(TOKEN)
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
      dispatch(getListUserAction());
      notification.success({
        closeIcon: true,
        message: 'Success',
        description: (
          <>Update user successfully.</>
        ),
      });
      const result2 = await userService.getUserById(id);
      const userDetail = result2.data.data[0]
      history.goBack();

    } catch (error) {
      notification.error({
        closeIcon: true,
        message: 'Fail',
        description: (
          <>Update user Fail.</>
        ),
      });
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
