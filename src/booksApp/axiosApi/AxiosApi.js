import axios from "axios";
import url from "../url";

const axiosApi = axios.create({
    baseURL: url

})

axiosApi.interceptors.request.use(function (config) {
    let token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization =token && `bearer ${token}`
    }
     
    return config;
    
}, function (error) {
    return Promise.reject(error)
});

axiosApi.interceptors.response.use(function (response) {
    
    if (response.data.jwtToken) {
        localStorage.setItem('jwtToken', response.data.jwtToken)
    }
    return response;
}, function (error) {
    return Promise.reject(error)
});

export default axiosApi;

