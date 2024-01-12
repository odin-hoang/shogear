import { useEffect, useState } from 'react';
import apiRequest from '../../../services/request';

import OrderItem from './OrderItem';
import { ProductItem } from '../../../pages/ProductDetail';
import { useUserContext } from '../../../utils/authContext';

export interface Order {
    id: number;
    user: number;
    items: TOrderItem[];
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
    email: string;
}
export interface TOrderItem {
    id: number;
    order: Order;
    confirmationStatus: number;
    quantity: number;
    seller: number;
    product: ProductItem;
}
const OrderCheck = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    // TODO: Change userid to api request later
    const { getUser } = useUserContext();
    const user = getUser();
    useEffect(() => {
        setIsLoading(true);
        apiRequest.get<Order[]>(`/buyer/orders/${user?.id}`).then((response) => {
            console.log(response.data);
            setOrders(response.data);
            setIsLoading(false);
        });
    }, []);
    const [selected, setSelected] = useState(1);
    return (
        <div className='min-h-[400px] bg-bodyBg-default py-5'>
            <div className=' mx-auto mt-5 max-w-[1100px] '>
                <h1 className='my-5  text-center text-lg font-bold text-primary-default'>Tra cứu đơn hàng</h1>
                <div role='tablist' className='tabs tabs-lifted '>
                    <input
                        id='pending'
                        type='radio'
                        name='my_tabs_2'
                        value={1}
                        checked={selected === 1}
                        onChange={() => setSelected(1)}
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
                            orders
                                .filter((order) => order.status === 1)
                                .map((order) => <OrderItem key={order.id} order={order} />)
                        )}
                    </div>
                    <input
                        type='radio'
                        name='my_tabs_2'
                        role='tab'
                        value={2}
                        checked={selected === 2}
                        onChange={() => setSelected(2)}
                        className='tab !w-[200px]'
                        aria-label={`Chờ thanh toán (${orders.filter((order) => order.status === 2).length})`}
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
                            orders
                                .filter((order) => order.status === 2)
                                .map((order) => <OrderItem key={order.id} order={order} />)
                        )}
                    </div>
                    <input
                        type='radio'
                        name='my_tabs_2'
                        role='tab'
                        className='tab !w-[200px]'
                        value={3}
                        checked={selected === 3}
                        onChange={() => setSelected(3)}
                        aria-label={`Đang vận chuyển (${orders.filter((order) => order.status === 3).length})`}
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
                            orders
                                .filter((order) => order.status === 3)
                                .map((order) => <OrderItem key={order.id} order={order} />)
                        )}
                    </div>
                    <input
                        type='radio'
                        name='my_tabs_2'
                        role='tab'
                        className='tab !w-[200px]'
                        value={4}
                        checked={selected === 4}
                        onChange={() => setSelected(4)}
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
                            orders
                                .filter((order) => order.status === 4)
                                .map((order) => <OrderItem key={order.id} order={order} />)
                        )}
                    </div>
                    <input
                        type='radio'
                        name='my_tabs_2'
                        role='tab'
                        className='tab !w-[200px]'
                        value={0}
                        checked={selected === 5}
                        onChange={() => setSelected(5)}
                        aria-label={`Đã huỷ (${orders.filter((order) => order.status === 5).length})`}
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
                        {orders.filter((order) => order.status === 5).length === 0 && !isLoading ? (
                            <div>Chưa có đơn hàng nào</div>
                        ) : (
                            orders
                                .filter((order) => order.status === 5)
                                .map((order) => <OrderItem key={order.id} order={order} />)
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCheck;
