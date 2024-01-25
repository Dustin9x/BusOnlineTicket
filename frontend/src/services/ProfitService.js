/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class ProfitService extends baseService {
    constructor() {
        super();
    }

    getProfitByRoute = (year) => {
        return this.get(`/api/Trip/profit/${year}`);
    }

    getProfitByMonth = (year) => {
        return this.get(`/api/Ticket/profit/${year}`);
    }
}

export const profitService = new ProfitService();