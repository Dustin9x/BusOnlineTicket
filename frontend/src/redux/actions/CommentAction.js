import { notification } from 'antd';
import { commentService } from "../../services/CommentService";
import { detailNewsAction } from "./NewAction";


export const addCommentAction = (formData,id) => {
  return async (dispatch) => {
    try {
      const result = await commentService.createComment(formData)
      notification.success({
        closeIcon: true,
        message: 'Success',
        description: (
          <>Add new Comment successfully</>
        ),
      });
      dispatch(detailNewsAction(id));
    } catch (error) {
      console.log('error', error);
    }
  }
}

export const DeleteCommentAction = (id,Newsid) => {
  return async (dispatch) => {
    try {
      const result = await commentService.deleteComment(id)
      if (result.data.status === 200) {
        notification.success({
          closeIcon: true,
          message: "Success",
          description: (
            <>Delete successfully</>
          )
        });
        
        dispatch(detailNewsAction(Newsid));
      }
    }
    catch (e) {
      console.log(e)
    }
  };
}

export const updateCommentAction = (id, formData,NewsId) => {
  return async (dispatch) => {
    try {
      const result = await commentService.updateComment(id, formData)
      if (result.data.status === 200) {
        notification.success({
          closeIcon: true,
          message: 'Success',
          description: (
            <>Update Comments successfully</>
          ),
        });
        dispatch(detailNewsAction(NewsId));
      }
    } catch (error) {
      console.log(error)
    }
  }
}