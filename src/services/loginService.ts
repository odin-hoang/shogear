import apiRequest from './request';

export async function login(username_or_email: string, password: string) {
    try {
        const user = await apiRequest.post('/login', {
            username_or_email,
            password,
        });
        return user.data;
    } catch (err) {
        console.log(err);
    }
}
