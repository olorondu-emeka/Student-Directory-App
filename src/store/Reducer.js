import * as actionTypes from './actions/actionTypes';

const initialState = {
    student: {},
    dashboardLoaded: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.UPDATE_STUDENT:
            return {
                ...state,
                student: {
                    ...state.student,
                    ...action.updatedStudent
                },
                dashboardLoaded: action.dashboardLoaded
            };

        case actionTypes.UPDATE_BIODATA:
            return {
                ...state,
                student: {
                    ...state.student,
                    biodata: {
                        ...state.student.biodata,
                        ...action.newBiodata
                    }
                }
            };

        case actionTypes.UPDATE_COURSE:
            return {
                ...state,
                student: {
                    ...state.student,
                    courses: state.student.courses.concat(action.newCourse)

                }
            };

        case actionTypes.DELETE_COURSE:
            return {
                ...state,
                student: {
                    ...state.student,
                    courses: state.student.courses.filter(function(course, index){
                        return index !== action.theIndex;
                    })
                }
            };

        case actionTypes.DELETE_ACCOUNT:
            return {
                student: {},
                dashboardLoaded: false
            };

        default:
            return state;

    }



};


 export default reducer;