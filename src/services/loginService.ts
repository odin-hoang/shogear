import { TSignupSchema } from '../lib/types';
import apiRequest from './request';

export async function login(username_or_email: string, password: string) {
    try {
        const response = await apiRequest.post('/login', {
            username_or_email,
            password,
        });
        if (response.status == 400) return null;
        return response.data.data;
    } catch (err) {
        return null;
    }
}
export async function registerUser(data: TSignupSchema) {
    try {
        const response = await apiRequest.post('/register', data);
        if (response.status == 400) return null;
        return response.data.data;
    } catch (err) {
        return null;
    }
}
