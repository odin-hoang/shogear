import { useEffect, useState } from 'react';
import apiRequest from '../../../services/request';

import OrderItem from './OrderItem';
import { ProductItem } from '../../../pages/ProductDetail';
import { useUserContext } from '../../../utils/authContext';

export interface Order {
    id: number;
    user: number;
    items: [
        {
            id: number;
            quantity: number;
            order: number;
            product: ProductItem;
        },
    ];
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

export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    products: number[];
    posts: number[];
    phone: string;
}
const OrderCheck = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    // TODO: Change userid to api request later
    const { getUser } = useUserContext();
    const user = getUser();
    useEffect(() => {
        setIsLoading(true);
        apiRequest.get<Order[]>(`/get/orders/${user?.id}`).then((response) => {
            // apiRequest.get<Order[]>(`/get/orders/${2}`).then((response) => {
            setOrders(response.data);
            setIsLoading(false);
            // for (const order of response.data) {
            //     apiRequest.get<User>(`/users/${order.items}`).then((response) => {
            //         setSellers((prev) => [...prev, response.data]);
            //     });
            // }
        });
    }, []);
    // const handleDeleteOrder = (order_id: number) => {
    //     setIsLoading(true);
    //     apiRequest.delete(`/orders/${order_id}`).then(() => {
    //         setIsLoading(false);
    //         alert('Đã xoá thành công order!');
    //         window.location.reload();
    //     });
    // };
    // const [selected, setSelected] = useState(0);
    return (
        <div className='min-h-[400px] bg-bodyBg-default py-5'>
            <div className=' mx-auto mt-5 max-w-[1200px] '>
                <h1 className='my-5  text-center text-lg font-bold text-primary-default'>Tra cứu đơn hàng</h1>
                <div role='tablist' className='tabs tabs-lifted '>
                    <input
                        id='pending'
                        type='radio'
                        name='my_tabs_2'
                        role='tab'
                        className='tab !w-[200px]'
                        aria-label={`Chờ xác nhận (${orders.filter((order) => order.status === 1).length})`}
                    />
                    <div
                        id='panel-1'
                        role='tabpanel'
                        className='tab-content rounded-box border-base-300 bg-base-100 p-6'
                    >
                        {isLoading && (
                            <div className='flex items-center justify-center'>
                                <div className='loading loading-bars loading-lg'></div>
                            </div>
                        )}
                        {orders.filter((order) => order.status === 1).length === 0 && !isLoading ? (
                            <div>Chưa có đơn hàng nào</div>
                        ) : (
                            orders.filter((order) => order.status === 1).map((order) => <OrderItem order={order} />)
                        )}
                    </div>
                    <input
                        type='radio'
                        name='my_tabs_2'
                        role='tab'
                        className='tab !w-[200px]'
                        aria-label={`Chưa thanh toán (${orders.filter((order) => order.status === 2).length})`}
                    />
                    <div
                        id='panel-2'
                        role='tabpanel'
                        className='tab-content rounded-box border-base-300 bg-base-100 p-6'
                    >
                        {isLoading && (
                            <div className='flex items-center justify-center'>
                                <div className='loading loading-bars loading-lg'></div>
                            </div>
                        )}
                        {orders.filter((order) => order.status === 2).length === 0 && !isLoading ? (
                            <div>Chưa có đơn hàng nào</div>
                        ) : (
                            orders.filter((order) => order.status === 2).map((order) => <OrderItem order={order} />)
                        )}
                    </div>
                    <input
                        type='radio'
                        name='my_tabs_2'
                        role='tab'
                        className='tab !w-[200px]'
                        aria-label={`Đang giao hàng (${orders.filter((order) => order.status === 3).length})`}
                    />
                    <div
                        id='panel-3'
                        role='tabpanel'
                        className='tab-content rounded-box border-base-300 bg-base-100 p-6'
                    >
                        {isLoading && (
                            <div className='flex items-center justify-center'>
                                <div className='loading loading-bars loading-lg'></div>
                            </div>
                        )}
                        {orders.filter((order) => order.status === 3).length === 0 && !isLoading ? (
                            <div>Chưa có đơn hàng nào</div>
                        ) : (
                            orders.filter((order) => order.status === 3).map((order) => <OrderItem order={order} />)
                        )}
                    </div>
                    <input
                        type='radio'
                        name='my_tabs_2'
                        role='tab'
                        className='tab !w-[200px]'
                        aria-label={`Đã giao thành công (${orders.filter((order) => order.status === 4).length})`}
                    />
                    <div
                        id='panel-4'
                        role='tabpanel'
                        className='tab-content rounded-box border-base-300 bg-base-100 p-6'
                    >
                        {isLoading && (
                            <div className='flex items-center justify-center'>
                                <div className='loading loading-bars loading-lg'></div>
                            </div>
                        )}
                        {orders.filter((order) => order.status === 4).length === 0 && !isLoading ? (
                            <div>Chưa có đơn hàng nào</div>
                        ) : (
                            orders.filter((order) => order.status === 4).map((order) => <OrderItem order={order} />)
                        )}
                    </div>
                    <input
                        type='radio'
                        name='my_tabs_2'
                        role='tab'
                        className='tab !w-[200px]'
                        aria-label={`Đã huỷ (${orders.filter((order) => order.status === 0).length})`}
                    />
                    <div
                        id='panel-0'
                        role='tabpanel'
                        className='tab-content rounded-box border-base-300 bg-base-100 p-6'
                    >
                        {isLoading && (
                            <div className='flex items-center justify-center'>
                                <div className='loading loading-bars loading-lg'></div>
                            </div>
                        )}
                        {orders.filter((order) => order.status === 0).length === 0 && !isLoading ? (
                            <div>Chưa có đơn hàng nào</div>
                        ) : (
                            orders.filter((order) => order.status === 0).map((order) => <OrderItem order={order} />)
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCheck;
