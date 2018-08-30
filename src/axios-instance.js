import axios from 'axios';
import Reducer from './store/Reducer';


//create an axios instance
const instance = axios.create({
    baseURL: 'http://192.168.8.103:8000/api/student'
});





export default instance;