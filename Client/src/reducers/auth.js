export default (state = {}, action) => {
    switch(action.type){
        case "LOGIN":
            return {
                tokens: action.tokens
            };
        case "LOGOUT":
            return {};
        default:
            return state;    
    }
};