export const login = (uid) => ({
    type: "LOGIN",
    uid
});

export const startLogin = () => {
    return (dispatch) => {
       localStorage.setItem("uid", 1);
       dispatch(login(1));
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