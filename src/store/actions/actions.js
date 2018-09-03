import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';


export const updateStudent = (theStudent) => {
    return {
        type: actionTypes.UPDATE_STUDENT,
        updatedStudent: theStudent,
        dashboardLoaded: true
    }
};

export const updateTheStudent = (route) => {
    return dispatch => {
        axios.get(route)
            .then(result => {
                dispatch(updateStudent(result.data.student))
            })
            .catch(error => {
                console.log(error);
            })
    };
};

export const updateBiodata = (biodata) => {
  return {
      type: actionTypes.UPDATE_BIODATA,
      newBiodata: biodata
  }
};

export const updateCourse = course => {
    return {
        type: actionTypes.UPDATE_COURSE,
        newCourse: course
    }
};

export const deleteCourse = (index) => {
    return {
        type: actionTypes.DELETE_COURSE,
        theIndex: index
    }
};