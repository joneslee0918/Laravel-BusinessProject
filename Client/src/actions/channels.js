import axios from "axios";
import {apiUrl} from "../config/api";

export const setChannels = (channels) => ({
    type: "SET_CHANNELS",
    channels
});

export const startSetChannels = () => {
    return dispatch => {
        return axios.get(`${apiUrl}/channels`)
                .then((response) => {
                    const channels = response.data;
                    dispatch(setChannels(channels));
                    localStorage.setItem("channels", JSON.stringify(channels));
                    return channels;
                });
    };
};

export const selectGlobalChannel = (id) => {
    return dispatch => {
        return axios.patch(`${apiUrl}/channels/select/${id}`)
            .then((response) => {
                const channels = response.data;
                dispatch(setChannels(channels));
                localStorage.setItem("channels", JSON.stringify(channels));
                return channels;
            });
    }
}

export const selectTwitterChannel = (id) => {
    return dispatch => {
        return axios.patch(`${apiUrl}/twitter/channels/select/${id}`)
            .then((response) => {
                const channels = response.data;
                dispatch(setChannels(channels));
                localStorage.setItem("channels", JSON.stringify(channels));
                return channels;
            });
    }
}