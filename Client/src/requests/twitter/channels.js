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
                console.log(response);
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
}