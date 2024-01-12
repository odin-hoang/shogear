import axios from 'axios';
import apiRequest from './request';
import { PostItem } from '../pages/ProductDetail';
import { Order, User } from '../layouts/components/order-results/OrderCheck';

export async function getFields() {
    try {
        await apiRequest.get('/product');
    } catch (err) {
        console.log(err);
    }
}
export async function uploadImage(images: any) {
    return new Promise(async (res, rej) => {
        try {
            console.log(images);
            let formData = new FormData();
            for (const image of images) {
                formData.append('images', image);
            }
            // formData.append('images', images);
            // formData.append('hien', 'hehe');
            console.log(formData.entries);
            const data = await axios.post('https://api-shopgear.onrender.com/api/upload_images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(data);
            res(data.data);
        } catch (err: any) {
            console.log(err?.response);
            rej(err);
        }
    });
}

export async function postProduct(data: any) {
    return new Promise(async (res, rej) => {
        try {
            console.log(JSON.stringify(data));
            const user = localStorage.getItem('userToken');
            if (!user) {
                rej('Not found user token in file postService.ts when request create post');
            }
            const result = await apiRequest.post('/posts/create', {
                ...data,
                user: user,
            });
            console.log(result.data);
            res(result.data);
        } catch (err: any) {
            console.log(err?.response);
            rej(err?.response);
        }
    });
}

export async function getCategories() {
    return new Promise(async (res) => {
        try {
            const categories = await apiRequest.get('/categories');
            console.log(categories.data);
            res(categories.data?.results);
        } catch (err) {
            console.log(err);
        }
    });
}
export interface PostResponse {
    count: number;
    next: string;
    previous: string;
    posts: PostItem[];
}
export interface UserResponse {
    count: number;
    next: string;
    previous: string;
    users: User[];
}
export interface OrderResponse {
    count: number;
    next: string;
    previous: string;
    orders: Order[];
}
export async function SearchPost(q: string | null, page: number) {
    return new Promise(async (res) => {
        try {
            const response = await apiRequest.get(`/posts/?q=${q}`, { params: { page } });
            const posts: PostItem[] = response.data.results;
            res({
                count: response.data.count,
                next: response.data.next,
                previous: response.data.previous,
                posts,
            } as PostResponse);
        } catch (err) {
            console.log(err);
        }
    });
}
export async function ShowPost(page: number) {
    return new Promise(async (res) => {
        try {
            const response = await apiRequest.get(`/posts`, { params: { page } });
            const posts: PostItem[] = response.data.results;
            res({
                count: response.data.count,
                next: response.data.next,
                previous: response.data.previous,
                posts,
            } as PostResponse);
        } catch (err) {
            console.log(err);
        }
    });
}
export async function ShowUsers(page?: number) {
    return new Promise(async (res) => {
        try {
            const response = await apiRequest.get(`/users`, { params: { page } });
            const users: User[] = response.data.results;
            res({
                count: response.data.count,
                next: response.data.next,
                previous: response.data.previous,
                users,
            } as UserResponse);
        } catch (err) {
            console.log(err);
        }
    });
}
export async function ShowOrders(page?: number) {
    return new Promise(async (res) => {
        try {
            const response = await apiRequest.get(`/orders`, { params: { page } });
            const orders: Order[] = response.data.results;
            res({
                count: response.data.count,
                next: response.data.next,
                previous: response.data.previous,
                orders,
            } as OrderResponse);
        } catch (err) {
            console.log(err);
        }
    });
}
