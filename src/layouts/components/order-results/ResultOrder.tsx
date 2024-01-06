import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getOrderResult } from '../../../services/orderService';
import OrderResultItem from './OrderResultItem';
import { useDispatch } from 'react-redux';

import { removeAllItems } from '../../../features/cart/cart-slice';

const ResultOrder = () => {
    const params = useParams();
    const [result, setResult] = useState<any>();
    const dispatch = useDispatch();
    useEffect(() => {
        const paymentId = params.paymentId;
        console.log(paymentId);
        const fetch = async () => {
            try {
                console.log('fetch status');
                const order: any = localStorage.getItem('order');
                const data = JSON.parse(order);
                const order_id = data?.orderId;
                const paymentId = data?.appTransId;
                localStorage.setItem('cart', JSON.stringify(undefined));
                // set state of cart
                dispatch(removeAllItems());
                const bookingResult: any = await getOrderResult(paymentId, order_id);
                setResult(bookingResult);
                console.log(bookingResult);
            } catch (err) {
                console.log(err);
            }
        };
        if (paymentId) fetch();
    }, []);

    return (
        <div className='flex min-h-screen flex-col items-center'>
            <div className='p10 max-w-md bg-slate-300 text-2xl font-semibold'>Thanh toán thành công</div>
            {/* <div className='mx-auto'>Danh sách sản phẩm</div> */}
            <div className='w-full bg-white pb-20'>
                <div className='w-[100%]'>
                    <div className='flex flex-wrap'>
                        <div className='flex-basis-75 mx-auto min-w-[70%] max-w-[70%] flex-none flex-shrink-0 pr-[10px]'>
                            <table className='table-cart'>
                                <thead>
                                    <tr>
                                        <th className='min-w-[350px] max-w-[450px] pl-[10px]'>Tên sản phẩm</th>
                                        <th className='min-w-[140px]'>Giá</th>
                                        <th className='min-w-[135px]'>Số lượng đã đặt</th>
                                        <th className='min-w-[160px]'>Đã thanh toán</th>
                                        <th className='min-w-[38px] items-center '></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result?.data?.items?.length > 0 ? (
                                        result?.data?.items?.map((item: any, index: number) => (
                                            <OrderResultItem key={index} item={item} />
                                        ))
                                    ) : (
                                        // If there are no products in the cart
                                        <tr>
                                            <td colSpan={5} className='py-4 text-center'>
                                                Đã có lỗi xảy ra, vui lòng liên hệ
                                                <span className='text-[#fcb941]'>0862622563</span> để được giải quyết!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultOrder;
