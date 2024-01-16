import { GET_MOD_LIST, GET_MOD_DETAIL } from "../constants";
import { history } from "../../App";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import { ModService, modService } from "../../services/ModService";
import { notification } from "antd";

export const getListModAction = () => {
  return async (dispatch) => {
    try {
      const result = await modService.getListMod();
      console.log("check Mod:", result.data.data);
      if (result.data.status === 200) {
        dispatch({
          type: GET_MOD_LIST,
          arrMod: result.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const createModAction = (newMod) => {
  return async (dispatch) => {
    try {
      const result = await modService.createMod(newMod);
      notification.success({
        closeIcon: true,
        message: "Success",
        description: <>Create New Mod Successfully.</>,
      });
      history.push("/admin/modmng");
    } catch (error) {
      notification.error({
        closeIcon: true,
        message: "Error",
        description: <>Create New Mod fail!</>,
      });
    }
  };
};
export const deleteModAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await modService.deleteMod(id);
      notification.success({
        closeIcon: true,
        message: "Success",
        description: <>Delete Mod successfully</>,
      });
      dispatch(getListModAction());
    } catch (error) {
      console.log("error", error);
    }
  };
};
export const getModByIdAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await modService.getModById(id);
      if (result.data.status === 200) {
        dispatch({
          type: GET_MOD_DETAIL,
          modDetail: result.data.data[0],
        });
        console.log("Check get update:", result.data.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const updateModAction = (id, Mod) => {
  return async (dispatch) => {
    try {
      const result = await modService.updateMod(id, Mod);
      notification.success({
        closeIcon: true,
        message: "Success",
        description: <>Update Mod successfully.</>,
      });
      history.push("/admin/modmng");
    } catch (error) {
      console.log(error);
    }
  };
};
