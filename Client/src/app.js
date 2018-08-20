import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import configStore from "./store/configStore";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configStore();

const jsx = (
    <div>
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </div>
);

ReactDOM.render(jsx, document.getElementById("app"));
