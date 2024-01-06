import apiRequest from './request';

export async function getPostDetail(id: string) {
    return new Promise(async (res, rej) => {
        try {
            const product = await apiRequest.get(`/products/${id}`);
            res(product.data);
        } catch (err) {
            rej(err);
        }
    });
}
