import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configStore from "./store/configStore";
import AppRouter from "./routes/AppRouter";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import { login, logout } from "./actions/auth";
import setAuthorizationHeader from "./utils/setAuthorizationHeader";
import { setChannels } from "./actions/channels";

const store = configStore();

const Root = () => (
    <div>
        <Provider store={store}>
            <AppRouter />
        </Provider>    
    </div>
);


let hasRendered = false;

const renderApp = () => {
    if(!hasRendered){
        ReactDOM.render(<Root />, document.getElementById("app"));
        hasRendered = true;
    }
};


const setAuthentication = () => {
    const token = localStorage.getItem("token") || undefined;
    store.dispatch(login(token));
    setAuthorizationHeader(token);

    if(token){
        let channels = localStorage.getItem("channels");
        channels = channels ? JSON.parse(channels) : [];

        if(!channels.length){
            localStorage.setItem("token", undefined);
            store.dispatch(logout());
            setAuthorizationHeader(undefined);
        }

        store.dispatch(setChannels(channels));
    }

    renderApp();
};

setAuthentication();
