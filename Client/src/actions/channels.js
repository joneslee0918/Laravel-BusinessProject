import axios from "axios";
import {apiUrl} from "../config/api";

export const setChannels = (list) => ({
    type: "SET_CHANNELS",
    list
});

export const setChannelsLoading = (loading = false) => ({
    type: "SET_CHANNELS_LOADING",
    loading
}); 

export const startSetChannels = () => {
    return dispatch => {
        dispatch(setChannelsLoading(true));
        return axios.get(`${apiUrl}/channels`)
                .then((response) => {
                    const channels = response.data;
                    dispatch(setChannels(channels));
                    localStorage.setItem("channels", JSON.stringify(channels));
                    dispatch(setChannelsLoading(false));
                    return channels;
                });
    };
};

export const selectGlobalChannel = (id) => {
    return dispatch => {
        dispatch(setChannelsLoading(true));
        return axios.patch(`${apiUrl}/channels/select/${id}`)
            .then((response) => {
                const channels = response.data;
                dispatch(setChannels(channels));
                localStorage.setItem("channels", JSON.stringify(channels));
                dispatch(setChannelsLoading(false));
                return channels;
            });
    }
}

export const selectTwitterChannel = (id) => {
    return dispatch => {
        dispatch(setChannelsLoading(true));
        return axios.patch(`${apiUrl}/twitter/channels/select/${id}`)
            .then((response) => {
                const channels = response.data;
                dispatch(setChannels(channels));
                localStorage.setItem("channels", JSON.stringify(channels));
                dispatch(setChannelsLoading(false));
                return channels;
            });
    }
}