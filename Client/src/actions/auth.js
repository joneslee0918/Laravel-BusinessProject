import axios from "axios";
import {oathTokenUrl, clientId, clientSecret} from "../config/api";

export const login = (tokens) => ({
    type: "LOGIN",
    tokens
});

export const startLogin = (body) => {
    return (dispatch) => {
        return axios.post(oathTokenUrl, {
                grant_type: "social",
                client_id: clientId,
                client_secret: clientSecret,
                network: "twitter",
                access_token: body.oauth_token,
                access_token_secret: body.oauth_token_secret
            }).then((response) => {
                localStorage.setItem("tokens", response.data);
                dispatch(login(response.data));
            }).catch((error) => {
                console.log(error);
            });
    };
};

export const logout = () => ({
    type: "LOGOUT"
});

export const startLogout = () => {
    return () => {
        localStorage.setItem("uid", undefined);
    };
};