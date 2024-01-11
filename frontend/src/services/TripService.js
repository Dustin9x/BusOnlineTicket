/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class TripService extends baseService {
    constructor() {
        super();
    }
    getTripList = () => {
        return this.get(`/Trip`);
    }


    addNewTrip = (formData) => {
        return this.post(`/Trip`, formData);
    }

    // getBusById = (id) => {
    //     return this.get(`/Bus/${id}`);
    // }

    // updateBus = (id,formData) => {
    //     return this.put(`/Bus?Id=${id}`, formData);
    // }

    // deleteBus = (busId) => {
    //     return this.delete(`/Bus/${busId}`);
    // }
    
}

export const tripService = new TripService();