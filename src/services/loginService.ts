import { TSignupSchema } from '../lib/types';
import apiRequest from './request';

export async function login(username_or_email: string, password: string) {
    try {
        const user = await apiRequest.post('/login', {
            username_or_email,
            password,
        });
        return user.data.data;
    } catch (err) {
        console.log(err);
    }
}
export async function registerUser(data: TSignupSchema) {
    try {
        console.log(data);
        const response = await apiRequest.post('/register', data);
        return response.data.data;
    } catch (err) {
        console.log(err);
    }
}
