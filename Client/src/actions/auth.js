export const login = (uid) => ({
    type: "LOGIN",
    uid
});

export const startLogin = () => {
    return () => {
       //Login logic
    };
};

export const logout = () => ({
    type: "LOGOUT"
});

export const startLogout = () => {
    return () => {
        //Logout logic
    };
};