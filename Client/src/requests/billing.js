import axios from "axios";
import {apiUrl} from "../config/api";

export const changePlan = (plan) => {
    return axios.post(`${apiUrl}/billing/change/plan`, {plan})
            .then((response) => {
                return response.data;
            });
}

export const activateAddon = (addon) => {
    return axios.post(`${apiUrl}/billing/activate/addon`, {addon})
            .then((response) => {
                return response.data;
            });
}

export const cancelAddon = (addon) => {
    return axios.post(`${apiUrl}/billing/cancel/addon`, {addon})
            .then((response) => {
                return response.data;
            });
}