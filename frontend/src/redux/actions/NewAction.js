import { newService } from "../../services/NewService";
import { GET_NEWS_LIST,GET_NEWS_DETAIL} from "../constants";
import { notification } from 'antd';
import { history } from '../../App';


export const getListNewsAction = () => {
    return async (dispatch) => {
      try {
        const result = await newService.getListNews();
        console.log(result.data.data);
        if (result.data.status === 200) {
          dispatch({
            type: GET_NEWS_LIST,
            arrNews: result.data.data
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
};

export const addNewsAction = (formData) => {
  return async (dispatch) => {
      try {
          const result = await newService.createNews(formData)
          notification.success({
              closeIcon: true,
              message: 'Success',
              description: (
                  <>Add new News successfully</>
              ),
          });
          history.push('/admin/newsmng');
      } catch (error) {
          console.log('error', error);
      }
  }
}

export const deleteNewsAction = (id)=>{
  return async(dispatch)=>{
    try{
      const result = await newService.deleteNews(id)
      if(result.data.status===200){
        notification.success({
          closeIcon:true,
          message:"Success",
          description:(
            <>delete successfully</>
          )
        });
      }  
      dispatch(getListNewsAction())
  }
    catch(e){
      console.log(e)
    }
  };
}
  export const detailNewsAction = (id)=>{

    return async (dispatch) =>{
      try{
        const result = await newService.getNewsById(id)
        if(result.data.status===200){
          console.log("check detail news:",result.data.data[0],"::::Id", id)
          dispatch({
            type:GET_NEWS_DETAIL,
            newsDetail:result.data.data[0],
          })
  
        }
      }catch(e){
        console.log(e)
      }
    }
  }

  export const updateNewsAction=(id,formData)=>{
    return async ()=>{
      try {
        const result = await newService.updateNews(id,formData)
        if(result.data.status===200){
          notification.success({
            closeIcon: true,
            message: 'Success',
            description: (
                <>Update  News successfully</>
            ),
        });
        history.push('/admin/newsmng');
        }
      } catch (error) {
        console.log(error)
      }
    } 
  }