import axios from "axios";
import {apiUrl} from "../config/api";


export const getTeamMembers = () => {
    return axios.get(`${apiUrl}/team/members`)
            .then((response) => {
                return response.data;
            });
};

export const addTeamMember = (data) => {
    return axios.post(`${apiUrl}/team/members/add`, data)
            .then((response) => {
                return response.data;
            });
};