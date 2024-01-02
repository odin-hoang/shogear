import { apiRequest } from './request';

export async function getFields(category_id: any) {
    try {
        await apiRequest.get('/product');
    } catch (err) {
        console.log(err);
    }
}
