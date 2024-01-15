/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class ModService extends baseService {
  constructor() {
    super();
  }
  getListMod = () => {
    return this.get(`/api/User/Mod`);
  };
  getModById = (id) => {
    return this.get(`/api/User/${id}`);
  };
  createMod = (Mod) => {
    return this.post(`/api/User`, Mod);
  };
  deleteMod = (id) => {
    return this.delete(`/api/User?Id=${id}`);
  };
  updateMod = (id, Mod) => {
    return this.put(`/api/User/${id}`, Mod);
  };
}

export const modService = new ModService();
