/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class BusManageService extends baseService {
    constructor() {
        super();
    }

    getBusList = () => {
        return this.get(`/api/Bus`);
    }


    addNewBus = (formData) => {
        return this.post(`/api/Bus`, formData);
    }

    getBusById = (id) => {
        return this.get(`/api/Bus/${id}`);
    }

    updateBus = (id,formData) => {
        return this.put(`/api/Bus?Id=${id}`, formData);
    }

    deleteBus = (busId) => {
        return this.delete(`/api/Bus/${busId}`);
    }




    //Bus Type
    getBusTypeList = () => {
        return this.get(`/api/BusType`);
    }

    getBusTypeById = (id) => {
        return this.get(`/api/BusType/${id}`);
    }
    
    addNewBusType = (formData) => {
        return this.post(`/api/BusType`, formData);
    }

    updateBusType = (id,formData) => {
        return this.put(`/api/BusType?Id=${id}`, formData);
    }

    deleteBusType = (busTypeId) => {
        return this.delete(`/api/BusType/${busTypeId}`);
    }
}

export const busManageService = new BusManageService();