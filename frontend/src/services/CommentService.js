/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class CommentService extends baseService {
    constructor() {
        super();
    }
    createComment = (formData) => {
        return this.post(`/api/Comment`, formData);
    };
    deleteComment = (id) => {
        return this.delete(`/api/Comment/${id}`);
    };
    updateComment = (id, Comment) => {
        return this.put(`/api/Comment/${id}`, Comment);
    };
}

export const commentService = new CommentService();