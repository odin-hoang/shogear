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
            // res(result.data);
        } catch (err: any) {
            console.log(err?.response);
            rej(err);
        }
    });
}

export async function postProduct(data: any) {
    return new Promise(async (res, rej) => {
        try {
            const result = await apiRequest.post('/', data);

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
            const categories = await apiRequest.get('/api/categories');
            console.log(categories);
            res(categories.data);
        } catch (err) {
            console.log(err);
        }
    });
}
