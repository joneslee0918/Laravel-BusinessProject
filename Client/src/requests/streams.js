import axios from "axios";
import {apiUrl} from "../config/api";

export const getStreams = () => {
    return axios.get(`${apiUrl}/streams`)
            .then((response) => {
                return response.data;
            });
};

export const newTab = (data) => {
    return axios.post(`${apiUrl}/streams/new/tab`, {data})
            .then((response) => {
                return response.data;
            });
};