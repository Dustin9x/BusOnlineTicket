/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class FAQService extends baseService {
    constructor() {
        super();
    }

    getFAQList = () => {
        return this.get(`/api/FAQ`);
    }

    getFAQById = (id) => {
        return this.get(`/api/FAQ/${id}`);
    }
    
    addNewFAQ = (formData) => {
        return this.post(`/api/FAQ`, formData);
    }

    updateFAQ = (id,formData) => {
        return this.put(`/api/FAQ?Id=${id}`, formData);
    }

    deleteFAQ = (FAQId) => {
        return this.delete(`/api/FAQ/${FAQId}`);
    }

}

export const faqService = new FAQService();