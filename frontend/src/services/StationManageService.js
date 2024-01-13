/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class StationManageService extends baseService {
    constructor() {
        super();
    }

    getStationList = () => {
        return this.get(`/api/Station`);
    }


    addNewStation = (formData) => {
        return this.post(`/api/Station`, formData);
    }

    getStationById = (stationId) => {
        return this.get(`/api/Station/${stationId}`);
    }

    updateStation = (id,formData) => {
        return this.put(`/api/Station?Id=${id}`, formData);
    }

    deleteStation = (stationId) => {
        return this.delete(`/api/Station/${stationId}`);
    }
}

export const stationManageService = new StationManageService();