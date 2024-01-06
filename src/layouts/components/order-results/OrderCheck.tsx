import { useEffect, useState } from 'react';
import apiRequest from '../../../services/request';
// import { useUserContext } from '../../../utils/authContext';
import { numberWithCommas } from '../../../lib/scripts';
import Button from '../../../components/Button';
import { AiOutlineLoading } from 'react-icons/ai';
interface Order {
    id: number;
    user: number;
    items: {
        id: number;
        quantity: number;
        order: number;
        product: {
            name: string;
        };
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
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    // const { getUser } = useUserContext();
    // const user = getUser();
    useEffect(() => {
        setIsLoading(true);
        apiRequest.get<Order[]>(`/get/orders/${2}`).then((response) => {
            setIsLoading(false);
            const orders: Order[] = [];
            for (const data of response.data) {
                orders.push(data);
            }
            setOrders([...orders]);
        });
    }, []);
    const handleDeleteOrder = (order_id: number) => {
        setIsLoading(true);
        apiRequest.delete(`/orders/${order_id}`).then(() => {
            setIsLoading(false);
            alert('Đã xoá thành công order!');
            window.location.reload();
        });
    };
    return (
        <div className='mx-auto mt-5 max-w-[1200px]'>
            {isLoading && (
                <div className=''>
                    <span className='animate-spin text-4xl'>
                        <AiOutlineLoading />
                    </span>
                </div>
            )}
            {orders.length === 0 && <div>Chưa có đơn hàng nào</div>}
            {orders.map((order) => (
                <div className='mb-4 min-h-[200px] rounded-md p-4 shadow-overflow'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>
                                    <Button variant={'fill'} onClick={() => handleDeleteOrder(order.id)}>
                                        Xoá
                                    </Button>
                                </th>
                                <th>Tên sản phẩm</th>
                                <th className='text-center'>Số lượng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item, index) => (
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{item.product.name}</td>
                                    <td className='text-center'>{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className='flex items-center justify-between'>
                        <div>
                            Tổng giá tiền: <span className='price'>{numberWithCommas(order.totalPrice)}</span>
                        </div>
                        <span style={{ color: order.status === 1 ? 'green' : 'red' }} className='mr-10 font-bold'>
                            {getStatusString(order.status)}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderCheck;
