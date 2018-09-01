import axios from "axios";
import {apiUrl} from "../../config/api";

export const getDashboard = () => {
    return axios.get(`${apiUrl}/twitter/dashboard`)
        .then((response) => {
            return response.data;
        });
};


export const selectChannel = (id) => {
    return axios.patch(`${apiUrl}/twitter/channels/select/${id}`)
            .then((response) => {
                return response.data;
            });
};