import axios from "axios";
import {oathTokenUrl, clientId, clientSecret} from "../config/api";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";

export const login = (token) => ({
    type: "LOGIN",
    token
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
                const token = response.data.access_token;
                localStorage.setItem("token", token);
                setAuthorizationHeader(token);
                dispatch(login(token));
                return token;
            }).catch((error) => {
                console.log(error);
                return error;
            });
    };
};

export const logout = () => ({
    type: "LOGOUT"
});

export const startLogout = () => {
    return (dispatch) => {
        localStorage.setItem("token", undefined);
        dispatch(logout());
    };
};