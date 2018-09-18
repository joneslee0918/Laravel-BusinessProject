import axios from "axios";
import {apiUrl} from "../config/api";

export const getChannels = () => {
    return axios.get(`${apiUrl}/channels`)
            .then((response) => {
                return response.data;
            });
};

export const selectChannel = (id) => {
    return axios.patch(`${apiUrl}/channels/select/${id}`)
        .then((response) => {
            return response.data;
        });
};

export const publish = (post) => {
    return axios.post(`${apiUrl}/publish`, {
        post
    })
    .then((response) => {
        return response.data;
    });
};