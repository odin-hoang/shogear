import { TOrderItem } from '../order-results/OrderCheck';
import { formatISODate, numberWithCommas } from '../../../lib/scripts';
import Button from '../../../components/Button';
import { useState } from 'react';
import apiRequest from '../../../services/request';
import { toast } from 'react-toastify';

interface ItemProps {
    item: TOrderItem;
}
const getStatus = (status: number) => {
    switch (status) {
        case 1:
            return 'Chưa xác nhận';
        case 2:
            return 'Đã xác nhận';
        case 3:
            return 'Đã nhận tiền';
        case 4:
            return 'Đơn hàng đã giao';
        case 5:
            return 'Chờ huỷ';
    }
};
const statuses = [
    { id: 1, name: 'Chưa xác nhận' },
    { id: 2, name: 'Đã xác nhận' },
    { id: 3, name: 'Đã nhận tiền' },
    { id: 4, name: 'Đã giao thành công' },
    { id: 5, name: 'Đã huỷ' },
];

const SellOrderItem = ({ item }: ItemProps) => {
    const [selectedStatus, setSelectedStatus] = useState(item.confirmationStatus);
    const handleUpdate = () => {
        const updateData = {
            order: item.order.id,
            confirmationStatus: selectedStatus,
            product: item.product.id,
        };
        apiRequest
            .put(`/seller/orders/${item.product.user.id}`, updateData)
            .then((response) => {
                toast(response.data.message);
            })
            .catch((err) => console.log(err.response.data.message));
    };
    return (
        <div className=' my-5 flex flex-col justify-center gap-2 rounded-lg border bg-white p-5'>
            <div className='flex items-center justify-between'>
                <div>
                    Mã đơn hàng: <span className='font-bold'>{item.order.id}</span>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <div>
                    <span>Ngày đặt hàng: </span>
                    <span className='font-bold'>
                        {formatISODate(item.order.createdAt).formattedTime +
                            ' / ' +
                            formatISODate(item.order.createdAt).formattedDate}
                    </span>
                </div>
                <div className=''>
                    Thành tiền: <span className='price font-bold'>{numberWithCommas(item.order.totalPrice)}</span>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <div>
                    Người mua: <span className='font-bold'>{item.order.fullName}</span>
                </div>
                <div>
                    Số điện thoại: <span className='font-bold'>{item.order.phoneNumber}</span>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <div>
                    Địa chỉ:{' '}
                    <span className='font-bold'>
                        {item.order.ward}, {item.order.district}, {item.order.province}
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
                    <tr>
                        <td className='flex items-center'>
                            <div className='flex items-center'>
                                <img src={item.product.attachments[0].file} alt='' className='h-10 w-10 object-cover' />
                                <div className='ml-2'>{item.product.name}</div>
                            </div>
                        </td>
                        <td className='price'>{numberWithCommas(item.product.price)}</td>
                        <td className='text-center'>{item.quantity}</td>
                        <td className=''>{item.product.user.firstName + ' ' + item.product.user.lastName}</td>
                        <td className=''>
                            {statuses.filter((status) => status.id > selectedStatus).length === 0 ? (
                                <span className='font-medium text-red-500'>Đã huỷ</span>
                            ) : (
                                <select onChange={(data) => setSelectedStatus(Number(data.target.value))}>
                                    <option value={selectedStatus}>{getStatus(item.order.status)}</option>
                                    {statuses
                                        .filter((status) => status.id > selectedStatus)
                                        .map((status) => (
                                            <option key={status.id} value={status.id}>
                                                {status.name}
                                            </option>
                                        ))}
                                </select>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
                {statuses.filter((status) => status.id > selectedStatus).length === 0 ||
                item.confirmationStatus == 4 ? (
                    ''
                ) : (
                    <Button variant={'fillBlue'} className='hover:bg-blue-6 00 float-right' onClick={handleUpdate}>
                        Cập nhật
                    </Button>
                )}
            </div>
        </div>
    );
};

export default SellOrderItem;
