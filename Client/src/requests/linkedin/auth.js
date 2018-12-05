import axios from "axios";
import {apiUrl} from "../../config/api";

export const getAccessToken = (oauthToken) => {
    return axios.get(`${apiUrl}/linkedin/callback?oauthToken=${oauthToken}`)
            .then((response) => {
                return response.data;
            });
};