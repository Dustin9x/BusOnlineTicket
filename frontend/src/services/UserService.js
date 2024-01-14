/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class UserService extends baseService {
    constructor() {
        super();
    }

    login = (loginInfo) => {
        return this.post(`/api/auth/`, loginInfo);
    }

    register = (registerInfo) => {
        return this.post(`/api/auth/register`, registerInfo);
    }

    // forgetPassword = (thongTinEmail) => {
    //     return this.post(`/api/auth/ForgetPassword`, thongTinEmail);
    // };
    
    getListUser = () => {
        return this.get(`/api/User`);
    };
    getUserById = (userId) => {
        return this.get(`/api/User/${userId}`);
    }
    createUser = (User) => {
        return this.post(`/api/User`, User);
    };
    deleteUser = (id) => {
        return this.delete(`/api/User?Id=${id}`);
    };
    updateUser = (id, User) => {
        return this.put(`/api/User?Id=${id}`, User);
    };
}

export const userService = new UserService();