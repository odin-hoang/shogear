import { Order } from './OrderCheck';
import { formatISODate, numberWithCommas } from '../../../lib/scripts';
import { FaCircleCheck } from 'react-icons/fa6';
import { cn } from '../../../lib/utils/cn';
import Button from '../../../components/Button';
import apiRequest from '../../../services/request';
import { toast } from 'react-toastify';

const OrderItem = ({ order }: { order: Order }) => {
    const handleCancelOrder = () => {
        console.log(order.user);
        apiRequest.put(`/buyer/orders/${order.user}`, { order: order.id }).then((response) => {
            toast(response.data.message);
        });
    };
    return (
        <div className=' my-5 flex flex-col justify-center gap-2 rounded-lg border bg-white p-5'>
            <div className='flex items-center justify-between'>
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
                        <tr>
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
                            <td className=''>{item.product.user.firstName + ' ' + item.product.user.lastName}</td>

                            <td
                                className={
                                    item.confirmationStatus > item.order.status || item.order.status == 4
                                        ? 'text-green-500'
                                        : 'text-gray-300'
                                }
                            >
                                <span
                                    className={cn(
                                        'flex items-center justify-center text-center text-xl',
                                        item.confirmationStatus == 5 && '!text-red-500',
                                    )}
                                >
                                    <FaCircleCheck />
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {order.status <= 2 && (
                <div className=''>
                    <Button className='float-right' variant={'fill'} onClick={handleCancelOrder}>
                        {' '}
                        Huỷ
                    </Button>
                </div>
            )}
        </div>
    );
};

export default OrderItem;
