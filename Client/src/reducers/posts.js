export default (state = {}, action) => {
    switch(action.type){
        case "SET_POST":
            return {
                post: action.post
            };
        default:
            return state;    
    }
};