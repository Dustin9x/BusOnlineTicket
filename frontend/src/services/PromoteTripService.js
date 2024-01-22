/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class PromoteTripService extends baseService {
    constructor() {
        super();
    }

    getPromoteTrip = () => {
        return this.get(`/api/PromoteTrip`);
    }


    addNewPromoteTrip = (formData) => {
        return this.post(`/api/PromoteTrip`, formData);
    }

    getPromoteTripById = (id) => {
        return this.get(`/api/PromoteTrip/${id}`);
    }

    updatePromoteTrip = (id,formData) => {
        return this.put(`/api/PromoteTrip?Id=${id}`, formData);
    }

    deletePromoteTrip = (Id) => {
        return this.delete(`/api/PromoteTrip/${Id}`);
    }
}

export const promoteTripService = new PromoteTripService();