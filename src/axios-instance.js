import axios from 'axios';


//create an axios instance
const instance = axios.create({
    baseURL: 'http://192.168.8.105:8000/api/student'
});





export default instance;