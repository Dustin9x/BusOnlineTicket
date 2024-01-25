/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class NewService extends baseService {
    constructor() {
        super();
    }
    getListNews = () => {
        return this.get(`/api/News`);
    };
    getNewsById = (newId) => {
        return this.get(`/api/News/${newId}`);
    }
    createNews = (formData) => {
        return this.post(`/api/News`, formData);
    };
    deleteNews = (id) => {
        return this.delete(`/api/News/${id}`);
    };
    updateNews = (id, News) => {
        return this.put(`/api/News/${id}`, News);
    };
}

export const newService = new NewService();