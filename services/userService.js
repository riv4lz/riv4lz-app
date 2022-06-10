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
    async update(data: User) {
        return http.put(`/Profile/UpdateProfile/`, data).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
    }
    delete(id: any) {
        return http.delete<any>(`/Profile/DeleteProfile/${id}`);
    }

}
export default new UserService();