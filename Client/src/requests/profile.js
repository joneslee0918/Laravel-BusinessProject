import axios from "axios";
import {apiUrl} from "../config/api";

export const updateProfile = (data) => {
    return axios.post(`${apiUrl}/profile`, {data})
            .then((response) => {
                return response.data;
            });
};