/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class DriverService extends baseService {
    constructor() {
        super();
    }

    getDriver = () => {
        return this.get(`/api/Driver/`);
    }

    getDriverById = (id) => {
        return this.get(`/api/Driver/${id}`);
    }

    postDriver = (newDriver) =>{
        return this.post(`/api/Driver`,newDriver);
    }

    deleteDriver = (id) =>{
        return this.delete(`/api/Driver/?Id=${id}`)
    }

    putDriver = (id,newDriver) => {
        return this.put(`/api/Driver?Id=${id}`,newDriver);
    }
}

export const driverService = new DriverService();