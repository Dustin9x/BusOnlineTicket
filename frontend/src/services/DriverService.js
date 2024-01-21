/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class DriverService extends baseService {
    constructor() {
        super();
    }

    loginDriver = (loginDriverInfo) => {
        return this.post(`/api/Driver/login`, loginDriverInfo);
    }
    getDriver = () => {
        return this.get(`/api/Driver/`);
    }

    getRegisterDriver = () => {
        return this.get(`/api/Driver/registerdriver`);
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

    approveDriver = (id) => {
        return this.put(`/api/Driver/approve?Id=${id}`);
    }
    forgetPassword = (email) => {
        return this.post(`/api/Driver/ForgetPassword?Email=${email}`);
    };
}

export const driverService = new DriverService();