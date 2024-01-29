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
    getEnableOfferList = () => {
        return this.get(`/api/Offer/enableoffer`);
    }
    getOfferByCode = (Code) => {
        return this.get(`/api/Offer/code/${Code}`);
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
    enableOffer = (id) => {
        return this.put(`/api/Offer/enable?Id=${id}`);
    }
}

export const offerService = new OfferService();