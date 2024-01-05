import axios from 'axios';

const apiRequest = axios.create({
    baseURL: 'https://api-shopgear.onrender.com/',
});
// apiRequest.interceptors.request.use((config) => {
//     const token = localStorage.getItem('userToken');
//     if (token) {
//         config.headers['token'] = `Bearer ${token}`;
//     }
//     return config;
// });
export default apiRequest;
