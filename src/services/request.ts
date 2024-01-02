import axios from 'axios';

export const apiRequest = axios.create({
    baseURL: 'https://api-shopgear.onrender.com/api',
});
apiRequest.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
        config.headers['token'] = `Bearer ${token}`;
    }
    return config;
});
