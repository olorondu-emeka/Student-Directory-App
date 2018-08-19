import axios from 'axios';

//create an axios instance
const instance = axios.create({
    baseURL: 'http://10.0.0.2:8000/api/student'
});

export default instance;