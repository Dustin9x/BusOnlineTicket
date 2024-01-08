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

    layThongTinCarousel = (maBanner) => {
        return this.get(`/api/laydanhsachbanner/${maBanner}`);
    }

    capNhatCarousel = (maBanner,formData) => {
        return this.post(`/api/laydanhsachbanner/${maBanner}/update`, formData);
    }

    xoaCarousel = (maBanner) => {
        return this.delete(`/api/laydanhsachbanner/${maBanner}/delete`);
    }




    //Bus Type
    getBusTypeList = () => {
        return this.get(`/BusType`);
    }
    
    addNewBusType = (formData) => {
        return this.post(`/BusType`, formData);
    }


    deleteBusType = (busTypeId) => {
        return this.delete(`/BusType?Id=${busTypeId}`);
    }
}

export const busManageService = new BusManageService();