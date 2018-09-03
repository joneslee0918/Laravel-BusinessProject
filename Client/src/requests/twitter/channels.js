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

export const addChannel = (accessToken, accessTokenSecret) => {
    return axios.post(`${apiUrl}/twitter/channels/add`, {
                oauth_token: accessToken,
                oauth_token_secret: accessTokenSecret
            }).then((response) => {
                return response.data;
            });
};


export const getAccountTargets = () => {
    return axios.get(`${apiUrl}/twitter/account-targets`)
    .then((response) => {
        return response.data;
    });
};


export const addAccountTarget = (target) => {
    return axios.post(`${apiUrl}/twitter/account-targets/store`,{
        username: target
    })
    .then((response) => {
        return response.data;
    });
};

export const destroyAccountTarget = (target) => {
    return axios.delete(`${apiUrl}/twitter/account-targets/destroy/${target}`)
    .then((response) => {
        return response.data;
    });
};


export const getKeywordTargets = () => {
    return axios.get(`${apiUrl}/twitter/keyword-targets`)
    .then((response) => {
        return response.data;
    });
};


export const addKeywordTarget = (target) => {
    return axios.post(`${apiUrl}/twitter/keyword-targets/store`,{
        keyword: target
    })
    .then((response) => {
        return response.data;
    });
};

export const destroyKeywordTarget = (target) => {
    return axios.delete(`${apiUrl}/twitter/keyword-targets/destroy/${target}`)
    .then((response) => {
        return response.data;
    });
};


export const getFans = () => {
    return axios.get(`${apiUrl}/twitter/fans`)
    .then((response) => {
        return response.data;
    });
}