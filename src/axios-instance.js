import axios from 'axios';


//create an axios instance
const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/student'
});





export default instance;