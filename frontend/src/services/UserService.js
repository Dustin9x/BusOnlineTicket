/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class UserService extends baseService {
    constructor() {
        super();
    }

    login = (loginInfo) => {
        return this.post(`api/auth/`,loginInfo);
    }

    register = (registerInfo) => {
        return this.post(`api/auth/register`,registerInfo);
    }

    layLaiMatKhau = (thongTinEmail) => {
        return this.post(`/api/auth/passwordRetrieval`, thongTinEmail);
      };
}

export const userService = new UserService();