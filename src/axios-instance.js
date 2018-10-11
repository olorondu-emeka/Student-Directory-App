import axios from 'axios';


//create an axios instance
const instance = axios.create({
    baseURL: 'https://student-directory-api.now.sh/api/student'
});





export default instance;