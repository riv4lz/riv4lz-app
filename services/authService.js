import http from "../http-cmmon";
import type {User} from "../dtos/userDTO";

export interface loginDto {
    email: string;
    password: string,
}

class AuthService {
    async attemptLogin(data: loginDto) {
        return http.post("/Auth/Login", data);
    }

    getCurrentUser() {
        return http.get<User>(`/Auth/GetCurrentUser`);
    }
}
export default new AuthService();
