import axios from "axios";
import {apiUrl} from "../../config/api";

export const addChannel = (accessToken) => {
    return axios.post(`${apiUrl}/facebook/channels/add`, {
                access_token: accessToken,
            }).then((response) => {
                return response.data;
            });
};

export const getAccounts = () => {
    return axios.get(`${apiUrl}/facebook/channels/accounts`)
    .then((response) => {
                return response.data;
            });
};

export const saveAccounts = (accounts) => {
    return axios.post(`${apiUrl}/facebook/channels/accounts/save`, {
                accounts
            }).then((response) => {
                return response.data;
            });
};

export const getAnalytics = (id, days=1) => {
    return axios.get(`${apiUrl}/facebook/analytics?id=${id}&days=${days}`)
        .then((response) => {
            return response.data;
        });
};