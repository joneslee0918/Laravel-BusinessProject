import { getChannels, selectGlobalChannel, selectTwitterChannel } from "../requests/channels";

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
        return getChannels()
                .then((response) => {
                    dispatch(setChannels(response));
                    localStorage.setItem("channels", JSON.stringify(response));
                    dispatch(setChannelsLoading(false));
                    return response;
                });
    };
};

export const setGlobalChannel = (id) => {
    return dispatch => {
        dispatch(setChannelsLoading(true));
        return selectGlobalChannel(id)
                .then((response) => {
                    dispatch(setChannels(response));
                    localStorage.setItem("channels", JSON.stringify(response));
                    dispatch(setChannelsLoading(false));
                    return response;
                });
    }
}

export const setTwitterChannel = (id) => {
    return dispatch => {
        dispatch(setChannelsLoading(true));
        return selectTwitterChannel(id)
                .then((response) => {
                    dispatch(setChannels(response));
                    localStorage.setItem("channels", JSON.stringify(response));
                    dispatch(setChannelsLoading(false));
                    return response;
                });
    }
}