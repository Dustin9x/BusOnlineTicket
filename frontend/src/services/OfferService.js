/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class OfferService extends baseService {
    constructor() {
        super();
    }
    getOfferList = () => {
        return this.get(`/api/Offer`);
    };
    getOfferById = (Id) => {
        return this.get(`/api/Offer/${Id}`);
    }
    createOffer = (formData) => {
        return this.post(`/api/Offer`, formData);
    };
    deleteOffer = (id) => {
        return this.delete(`/api/Offer/${id}`);
    };
    updateOffer = (id, Offer) => {
        return this.put(`/api/Offer/${id}`, Offer);
    };
}

export const offerService = new OfferService();