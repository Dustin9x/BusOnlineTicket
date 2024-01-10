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

    getStationById = (stationId) => {
        return this.get(`/Station/${stationId}`);
    }

    updateStation = (id,formData) => {
        return this.put(`/Station?Id=${id}`, formData);
    }

    deleteStation = (stationId) => {
        return this.delete(`/Station/${stationId}`);
    }
}

export const stationManageService = new StationManageService();