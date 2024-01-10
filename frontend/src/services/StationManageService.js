/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class StationManageService extends baseService {
    constructor() {
        super();
    }

    getStationList = () => {
        return this.get(`/Station`);
    }


    addNewStation = (formData) => {
        return this.post(`/Station`, formData);
    }

    layThongTinCarousel = (maBanner) => {
        return this.get(`/api/laydanhsachbanner/${maBanner}`);
    }

    capNhatCarousel = (maBanner,formData) => {
        return this.post(`/api/laydanhsachbanner/${maBanner}/update`, formData);
    }

    deleteStation = (stationId) => {
        return this.delete(`/Station/${stationId}`);
    }
}

export const stationManageService = new StationManageService();