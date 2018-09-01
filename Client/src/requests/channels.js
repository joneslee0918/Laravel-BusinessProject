import axios from "axios";
import {apiUrl} from "../config/api";

export const getDashboard = () => {
    return axios.get(`${apiUrl}/twitter/dashboard`)
        .then((response) => {
            return response.data;
        });
};

export const getChannels = () => {
    return axios.get(`${apiUrl}/channels`)
            .then((response) => {
                return response.data;
            });
};

export const selectGlobalChannel = (id) => {
    return axios.patch(`${apiUrl}/channels/select/${id}`)
        .then((response) => {
            return response.data;
        });
};

export const selectTwitterChannel = (id) => {
    return axios.patch(`${apiUrl}/twitter/channels/select/${id}`)
            .then((response) => {
                return response.data;
            });
};