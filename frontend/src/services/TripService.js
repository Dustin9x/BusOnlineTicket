/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class TripService extends baseService {
    constructor() {
        super();
    }
    getTripList = () => {
        return this.get(`/api/Trip`);
    }

    getTripById = (id) => {
        return this.get(`/api/Trip/${id}`);
    }


    addNewTrip = (formData) => {
        return this.post(`/api/Trip`, formData);
    }

    // getBusById = (id) => {
    //     return this.get(`/Bus/${id}`);
    // }

    // updateBus = (id,formData) => {
    //     return this.put(`/Bus?Id=${id}`, formData);
    // }

    deleteTrip = (tripId) => {
        return this.delete(`/api/Trip/${tripId}`);
    }
    
}

export const tripService = new TripService();