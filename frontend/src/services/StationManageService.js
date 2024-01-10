/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class StationManageService extends baseService {
    constructor() {
        super();
    }

    getStationList = () => {
        return this.get(`/Station`);
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
}

export const stationManageService = new StationManageService();