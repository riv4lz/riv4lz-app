import http from "../http-cmmon";
import type {ImageUpload} from "../dtos/imageUpload";

class CasterService {
    async get(id: any) {
        return http.get(`/Profile/GetProfile?id=${id}`);
    }
    async uploadImage(image: ImageUpload) {
        return http.post("/Image/UploadImageUrl/", image).catch((error) => console.log( error.response.request._response ) );
    }

}
export default new CasterService();
