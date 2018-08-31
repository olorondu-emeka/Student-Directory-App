import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';


export const updateStudent = (theStudent) => {
    return {
        type: actionTypes.UPDATE_STUDENT,
        updatedStudent: theStudent,
        dashboardLoaded: true
    }
};

// export const updateActionMiddleware = (theStudent) => {
//     return dispatch => {
//         dispatch(updateStudent(theStudent));
//     }
// };


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