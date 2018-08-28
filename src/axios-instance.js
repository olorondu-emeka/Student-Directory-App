import axios from 'axios';
import Reducer from './Reducer';


//create an axios instance
const instance = axios.create({
    baseURL: 'http://192.168.8.100:8000/api/student'
});





export default instance;