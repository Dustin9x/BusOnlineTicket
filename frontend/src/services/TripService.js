/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class TripService extends baseService {
  constructor() {
    super();
  }
  getTripList = () => {
    return this.get(`/api/Trip`);
  };

  getTripById = (id) => {
    return this.get(`/api/Trip/${id}`);
  };
  getTripListOptions = (options) => {
    return this.get(
      `/api/Trip/Options?searchBusType=${options.searchBusType}&fromPrice=${options.fromPrice}&toPrice=${options.toPrice}&sort=${options.sort}&from=${options.from}&to=${options.to}&dayStart=${options.dayStart}&page=1`
    );
  };

  addNewTrip = (formData) => {
    return this.post(`/api/Trip`, formData);
  };

  deleteTrip = (tripId) => {
    return this.delete(`/api/Trip/${tripId}`);
  };
}

export const tripService = new TripService();
