/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";
import { ThongTinDatVe } from '../_core/models/OrderDetail';

export class OrderService extends baseService {
    constructor() {
        super();
    }

    postSeat = (order) => {
        return this.post(`/api/Seat`, order);
    };

    addTicket = (order) => {
        return this.post(`/api/Ticket`, order);
    };

    getTicketByUser = (id) => {
        return this.get(`/api/Ticket/${id}`,);
    };

    cancelTicket = (id,day) => {
        return this.put(`/api/Ticket?Id=${id}&Day=${day}`,);
    };
}

export const orderService = new OrderService();