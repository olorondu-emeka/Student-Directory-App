import * as actionTypes from './actions/actionTypes';

const initialState = {
    student: {},
    token: 'yes'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_USER:
            return {
                ...state,
                token: action.token
            };

        case actionTypes.LOGOUT_USER:
            return {
                ...state,
                token: null
            };

        case actionTypes.UPDATE_STUDENT:
            return {
                ...state,
                student: {
                    ...state.student,
                    ...action.updatedStudent
                }
            };


        default:
            return state;

    }



};


 export default reducer;