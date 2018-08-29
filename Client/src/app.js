import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configStore from "./store/configStore";
import AppRouter from "./routes/AppRouter";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import { login } from "./actions/auth";

const store = configStore();

class Root extends React.Component {
    componentDidMount = () => {
        const tokens = localStorage.getItem("tokens") || undefined;
        store.dispatch(login(tokens));
    };

    render(){
        return (
            <div>
                <Provider store={store}>
                    <AppRouter />
                </Provider>    
            </div>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById("app"));
