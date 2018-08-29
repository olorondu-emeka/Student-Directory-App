

const initialState = {
    student: {},
    token: 'yes'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                token: action.token
            };
        case 'LOGOUT_USER':
            return {
                ...state,
                token: null
            };
        case 'UPDATE_STUDENT':
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