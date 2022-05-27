import axios from "axios";

export default axios.create({
    baseURL: "http://70.34.201.1:9797/api",
    headers: {
        "Content-type": "application/json"
    }
});


