import Axios, {AxiosInstance} from "axios";

export const axios:AxiosInstance = Axios.create({
    baseURL: "localhost:8080/",
    timeout:1000*60*10,
    headers:{
        "Content-Type":"application/json"
    }
});