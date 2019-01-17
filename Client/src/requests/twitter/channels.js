import axios from "axios";
import {apiUrl} from "../../config/api";

export const getDashboard = () => {
    return axios.get(`${apiUrl}/twitter/dashboard`)
        .then((response) => {
            return response.data;
        });
};

export const getAnalytics = (days=1) => {
    return axios.get(`${apiUrl}/twitter/analytics?days=${days}`)
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


export const getAccountTargets = (page = 1) => {
    return axios.get(`${apiUrl}/twitter/account-targets?page=${page}`)
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


export const getKeywordTargets = (page = 1) => {
    return axios.get(`${apiUrl}/twitter/keyword-targets?page=${page}`)
    .then((response) => {
        return response.data;
    });
};


export const addKeywordTarget = (target, location = "") => {
    return axios.post(`${apiUrl}/twitter/keyword-targets/store`,{
        keyword: target,
        location
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


export const getFans = (order = 'desc', page = 1) => {
    return axios.get(`${apiUrl}/twitter/fans?page=${page}&order=${order}`)
    .then((response) => {
        return response.data;
    });
};

export const getNonFollowers = (order = 'desc', page = 1) => {
    return axios.get(`${apiUrl}/twitter/non-followers?page=${page}&order=${order}`)
    .then((response) => {
        return response.data;
    });
};

export const getRecentUnfollowers = (order = 'desc', page = 1) => {
    return axios.get(`${apiUrl}/twitter/recent-unfollowers?page=${page}&order=${order}`)
    .then((response) => {
        return response.data;
    });
};

export const getRecentFollowers = (order = 'desc', page = 1) => {
    return axios.get(`${apiUrl}/twitter/recent-followers?page=${page}&order=${order}`)
    .then((response) => {
        return response.data;
    });
};

export const getInactiveFollowing = (order = 'desc', page = 1) => {
    return axios.get(`${apiUrl}/twitter/inactive-following?page=${page}&order=${order}`)
    .then((response) => {
        return response.data;
    });
};

export const getFollowing = (order = 'desc', page = 1) => {
    return axios.get(`${apiUrl}/twitter/following?page=${page}&order=${order}`)
    .then((response) => {
        return response.data;
    });
};


export const follow = (userId) => {
    return axios.patch(`${apiUrl}/twitter/follow/${userId}`)
    .then((response) => {
        return response.data;
    });
};

export const unfollow = (userId) => {
    return axios.patch(`${apiUrl}/twitter/unfollow/${userId}`)
    .then((response) => {
        return response.data;
    });
};

export const tweet = (tweet) => {
    return axios.post(`${apiUrl}/twitter/tweet`, {
        tweet
    })
    .then((response) => {
        return response.data;
    });
};