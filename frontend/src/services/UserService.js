/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class UserService extends baseService {
    constructor() {
        super();
    }

    login = (loginInfo) => {
        return this.post(`api/auth/`, loginInfo);
    }

    register = (registerInfo) => {
        return this.post(`api/auth/register`, registerInfo);
    }

    layLaiMatKhau = (thongTinEmail) => {
        return this.post(`/api/auth/passwordRetrieval`, thongTinEmail);
    };
    
    GetListUser = () => {
        return this.get(`/User`);
    };
    createUser = (User) => {
        return this.post(`/User`, User);
    };
    deleteUser = (id) => {
        return this.delete(`/User?Id=${id}`);
    };
    updateUser = (id, User) => {
        return this.put(`/User/${id}`, User);
    };
}

export const userService = new UserService();