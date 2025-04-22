import axios from 'axios';

// const baseURL = process.env.REACT_APP_BASE_URL
const baseURL = "https://meet-assist-api.tipstat.com"

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true
});


export default axiosInstance;
