import http from "../http-common";
import { User } from "../interfaces/userInterface";

class UserService {

    getAll(userType: number) {
        return http.get<Array<User>>(`/Profile/GetProfiles?userType=${userType}`);
    }
    async get(id: any) {
        return http.get(`/Profile/GetProfile?id=${id}`);
    }
    async create(data: User) {
        return http.post<User>("/Profile/RegisterProfile", data);
    }
    update(data: User) {
        return http.put<User>(`/Profile/UpdateProfile/`, data);
    }
    delete(id: any) {
        return http.delete<any>(`/Profile/DeleteProfile/${id}`);
    }

}
export default new UserService();