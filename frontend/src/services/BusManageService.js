/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class BusManageService extends baseService {
    constructor() {
        super();
    }

    getBusList = () => {
        return this.get(`/Bus`);
    }


    addNewBus = (formData) => {
        return this.post(`/Bus`, formData);
    }

    getBusById = (id) => {
        return this.get(`/Bus/${id}`);
    }

    updateBus = (id,formData) => {
        return this.put(`/Bus?Id=${id}`, formData);
    }

    deleteBus = (busId) => {
        return this.delete(`/Bus/${busId}`);
    }




    //Bus Type
    getBusTypeList = () => {
        return this.get(`/BusType`);
    }

    getBusTypeById = (id) => {
        return this.get(`/BusType/${id}`);
    }
    
    addNewBusType = (formData) => {
        return this.post(`/BusType`, formData);
    }

    updateBusType = (id,formData) => {
        return this.put(`/BusType?Id=${id}`, formData);
    }

    deleteBusType = (busTypeId) => {
        return this.delete(`/BusType/${busTypeId}`);
    }
}

export const busManageService = new BusManageService();