import { useEffect, useState } from 'react';
import apiRequest from '../../../services/request';
interface Order {
    id: number;
    items: {
        id: number;
        quantity: number;
        order: number;
        product: number;
    }[];
    totalPrice: number;
    ward: string;
    district: string;
    province: string;
    discountCode: string;
    phoneNumber: string;
    fullName: string;
    createdAt: string;
    updatedAt: string;
    status: number;
}
function getStatusString(status: number): string {
    switch (status) {
        case 1:
            return 'Đang chờ xác nhận';
        case 2:
            return 'Chưa thanh toán';
        case 3:
            return 'Đã thanh toán';
        case 4:
            return 'Đang vận chuyển';
        case 5:
            return 'Đã giao hàng';
        case 0:
            return 'Đã huỷ';
        default:
            return '';
    }
}

const OrderCheck = () => {
    useEffect(() => {
        apiRequest.get('/orders').then((response) => {
            console.log(response.data.results);
        });
    }, []);
    const [orders, setOrders] = useState<Order[]>([]);
    return (
        <div className='mx-auto max-h-[1200px]'>
            {orders.map((order) => (
                <div className='min-h-[200px] rounded-md p-4 shadow-overflow'>
                    <div>{order.totalPrice}</div>
                    <div>{getStatusString(order.status)}</div>
                </div>
            ))}
        </div>
    );
};

export default OrderCheck;
