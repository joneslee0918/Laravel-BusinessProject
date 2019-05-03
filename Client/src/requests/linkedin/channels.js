import axios from "axios";
import {apiUrl} from "../../config/api";

export const addChannel = (accessToken) => {
    return axios.post(`${apiUrl}/linkedin/channels/add`, {
                access_token: accessToken,
            }).then((response) => {
                return response.data;
            });
};

export const getPages = () => {
    return axios.get(`${apiUrl}/linkedin/channels/pages`).then((response) => {
                return response.data;
            });
};

export const savePages = (pages) => {
    return axios.post(`${apiUrl}/linkedin/channels/pages/save`, {
                pages
            }).then((response) => {
                return response.data;
            });
};