import { createStore } from 'redux';



const initialState = {
    authorized: false,
    token: 'yes'
};

const reducer = (state = initialState, action) => {
    if (action.type === 'LOGIN_USER'){
        return {
            authorized: true,
            token: action.token
        };
    }

    if (action.type === 'LOGOUT_USER'){
        return {
            authorized: false,
            token: null
        };
    }


    return state;
};

 const theStore = createStore(reducer);

 export default theStore;