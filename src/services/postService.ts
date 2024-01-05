import axios from 'axios';
import apiRequest from './request';

export async function getFields(category_id: any) {
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
            const result = await apiRequest.post('/posts/create', {
                ...data,
                user: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA0NDMyMzY4LCJpYXQiOjE3MDQ0Mjg3NjgsImp0aSI6IjMzOTQyNjc0YTEzZTRlOTM4YjQ1OGEzMjM3NzA3NTc5IiwidXNlciI6MTR9.scnqCh2BA73T7-fhk1_yUQU18KJGSYy24y0TgXHl2zI',
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
    return new Promise(async (res, rej) => {
        try {
            const categories = await apiRequest.get('/categories');
            console.log(categories.data);
            res(categories.data?.results);
        } catch (err) {
            console.log(err);
        }
    });
}
