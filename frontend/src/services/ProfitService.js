/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class ProfitService extends baseService {
    constructor() {
        super();
    }


    layChiTietDonHang = (id ) => {
        return this.get(`/api/laychitietdonhang/${id}`);
    }



    layDonHangTheoUser = (id ) => {
        return this.get(`/api/laydanhsachdonhang/${id}`);
    }


    layDoanhThu = ( year ) => {
        return this.get(`/api/doanhthu/${year}`);
    }


}

export const profitService = new ProfitService();