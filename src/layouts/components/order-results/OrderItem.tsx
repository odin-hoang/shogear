import { Order, User } from './OrderCheck';
import { formatISODate, numberWithCommas } from '../../../lib/scripts';
import { useEffect, useState } from 'react';
import apiRequest from '../../../services/request';

const OrderItem = ({ order }: { order: Order }) => {
    const [sellers, setSellers] = useState<User[]>([]);
    useEffect(() => {
        for (const item of order.items) {
            apiRequest.get<User>(`/users/${item.product.user}`).then((response) => {
                setSellers((prev) => [...prev, response.data]);
            });
        }
    }, []);
    return (
        <div className=' my-5 flex flex-col justify-center gap-2 rounded-lg border bg-white p-2'>
            <div className='flex items-center justify-between'>
                {/* <div className='flex items-center'>
                                        <Check className='mr-2' />
                                        <div className='font-bold'>Đang chờ xác nhận</div>
                                    </div> */}
                <div>
                    Mã đơn hàng: <span className='font-bold'>{order.id}</span>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <div>
                    <span>Ngày đặt hàng: </span>
                    <span className='font-bold'>
                        {formatISODate(order.createdAt).formattedTime +
                            ' / ' +
                            formatISODate(order.createdAt).formattedDate}
                    </span>
                </div>
                <div className=''>
                    Thành tiền: <span className='price font-bold'>{numberWithCommas(order.totalPrice)}</span>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <div>
                    Người mua: <span className='font-bold'>{order.fullName}</span>
                </div>
                <div>
                    Số điện thoại: <span className='font-bold'>{order.phoneNumber}</span>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <div>
                    Địa chỉ:{' '}
                    <span className='font-bold'>
                        {order.ward}, {order.district}, {order.province}
                    </span>
                </div>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th className='min-w-[350px] max-w-[450px] pl-[10px]'>Tên sản phẩm</th>
                        <th className='min-w-[140px]'>Giá</th>
                        <th className='min-w-[135px]'>Số lượng đã đặt</th>
                        <th className='min-w-[135px]'>Người bán</th>
                        <th className='min-w-[45px]'>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map((item) => (
                        <tr key={item.id}>
                            <td className='flex items-center'>
                                <div className='flex items-center'>
                                    <img
                                        src={item.product.attachments[0].file}
                                        alt=''
                                        className='h-10 w-10 object-cover'
                                    />
                                    <div className='ml-2'>{item.product.name}</div>
                                </div>
                            </td>
                            <td className='price'>{numberWithCommas(item.product.price)}</td>
                            <td className='text-center'>{item.quantity}</td>
                            <td className=''>
                                {sellers.filter((user) => user.id === item.product.user)[0]?.firstName}
                            </td>
                            <td>{}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderItem;
