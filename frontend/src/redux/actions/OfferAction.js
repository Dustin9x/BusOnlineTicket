import { newService } from "../../services/NewService";
import { GET_NEWS_LIST, GET_NEWS_DETAIL, GET_OFFER_LIST, GET_OFFER_DETAIL, GET_OFFER_BY_CODE, GET_OFFER_CHUNK } from "../constants";
import { notification } from 'antd';
import { history } from '../../App';
import { offerService } from "../../services/OfferService";


export const getOfferListAction = () => {
  return async (dispatch) => {
    try {
      const result = await offerService.getOfferList();
      console.log("get list offer", result)
      if (result.data.status === 200) {
        dispatch({
          type: GET_OFFER_LIST,
          arrOffer: result.data.data,
        });
        dispatch({
          type: GET_OFFER_CHUNK,
          offerList: result.data.data
        })
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOfferDetailAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await offerService.getOfferById(id)
      if (result.data.status === 200) {
        dispatch({
          type: GET_OFFER_DETAIL,
          offerDetail: result.data.data[0],
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getOfferByCodeAction = (code) => {
  return async (dispatch) => {
    try {
      const result = await offerService.getOfferByCode(code)
      if (result.data.status === 200) {
        dispatch({
          type: GET_OFFER_BY_CODE,
          offerCodeDetail: result.data.data[0],
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const addOfferAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await offerService.createOffer(formData)
      if(result.data.status === 200){
        notification.success({
          closeIcon: true,
          message: 'Success',
          description: (
            <>Add new Odder successfully</>
          ),
        });
        history.push('/admin/offermng');
      }else{
        notification.error({
          closeIcon: true,
          message: 'Error',
          description: (
            <>Offer code is duplicated</>
          ),
        });
      }
    } catch (error) {
      console.log('error', error);
      notification.error({
          closeIcon: true,
          message: 'Error',
          description: (
            <>Offer code is duplicated</>
          ),
        });
    }
  }
}

export const deleteOfferAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await offerService.deleteOffer(id)
      if (result.data.status === 200) {
        notification.success({
          closeIcon: true,
          message: "Success",
          description: (
            <>Delete offer successfully</>
          )
        });
      }
      dispatch(getOfferListAction())
    }catch (e) {
      console.log(e)
    }
  };
}


export const updateOfferAction = (id, formData) => {
  return async () => {
    try {
      const result = await offerService.updateOffer(id, formData)
      if (result.data.status === 200) {
        notification.success({
          closeIcon: true,
          message: 'Success',
          description: (
            <>Update Offer successfully</>
          ),
        });
        history.push('/admin/offermng');
      }
    } catch (error) {
      console.log(error)
    }
  }
}