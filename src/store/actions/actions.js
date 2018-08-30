import * as actionTypes from './actionTypes';

export const loginUser = (theToken) => {
    return {
        type: actionTypes.LOGIN_USER,
        token: theToken
    };
};

export const logoutUser = () => {
    return {
        type: actionTypes.LOGOUT_USER
    };
};

export const updateStudent = (theStudent) => {
    return {
        type: actionTypes.UPDATE_STUDENT,
        updatedStudent: theStudent
    };
};