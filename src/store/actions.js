
export const loginUser = (theToken) => {
    return {
        type: 'LOGIN_USER',
        token: theToken
    };
};

export const logoutUser = () => {
    return {
        type: 'LOGOUT_USER'
    };
};

export const updateStudent = (theStudent) => {
    return {
        type: 'UPDATE_STUDENT',
        updatedStudent: theStudent
    };
};