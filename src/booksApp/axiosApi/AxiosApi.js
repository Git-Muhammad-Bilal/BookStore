import axios from "axios";

const axiosApi = axios.create({
    baseURL: 'http://localhost:3001/'

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

