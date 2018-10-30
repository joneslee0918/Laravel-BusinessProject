import axios from "axios";
import {apiUrl} from "../config/api";


export const getArticles = (count = 20) => {
    return axios.get(`${apiUrl}/articles`)
            .then((response) => {
                return response.data;
            });
};