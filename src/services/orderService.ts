import apiRequest from './request';

export async function getCategories() {
    return new Promise(async (res) => {
        try {
            const categories = await apiRequest.get('/categories');
            console.log(categories);
            res(categories.data);
        } catch (err) {
            console.log(err);
        }
    });
}

export async function createOrder(data: any) {
    return new Promise(async (res) => {
        try {
            console.log(JSON.stringify(data));
            const newOrder = await apiRequest.post('/payment/create-order', data);
            res(newOrder.data);
        } catch (err: any) {
            console.log(err?.response);
        }
    });
}

export async function getOrderResult(transId: string, orderId: string) {
    return new Promise(async (res, rej) => {
        try {
            const orderResult = await apiRequest.post('/payment/query', {
                app_trans_id: transId,
                order_id: orderId,
            });
            res(orderResult.data);
        } catch (err: any) {
            console.log(err?.response);
            rej(err);
        }
    });
}
