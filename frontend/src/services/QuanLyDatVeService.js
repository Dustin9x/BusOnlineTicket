/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";
import { ThongTinDatVe } from '../_core/models/OrderDetail';

export class QuanLyDatVeService extends baseService {
    constructor() {
        super();
    }

    // datVe = (thongTinDatVe = new ThongTinDatVe()) => {
    //     return this.post(`/api/QuanLyDatVe/DatVe`,thongTinDatVe);
    // }

    layDanhSachGhe = (id) => {
        return this.get(`/api/laydanhsachghe/${id}`);
    }
    chonGhe = (danhSachGheDangChon) => {
        return this.post(`/api/chonghe`,danhSachGheDangChon);
    }

    

}

export const quanLyDatVeService = new QuanLyDatVeService();