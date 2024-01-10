import { useEffect, useState } from 'react';
import apiRequest from '../../../services/request';
import { useUserContext } from '../../../utils/authContext';
import { TOrderItem } from '../order-results/OrderCheck';
import SellOrderItem from './SellOrderItem';
const SellerOrder = () => {
    const { getUser } = useUserContext();
    const user = getUser();
    const [isLoading, setIsLoading] = useState(true);
    const [orderItems, setOrderItems] = useState<TOrderItem[]>();
    useEffect(() => {
        setIsLoading(true);
        apiRequest.get<TOrderItem[]>(`/seller/orders/${user?.id}`).then((response) => {
            setOrderItems(response.data);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className='bg-bodyBg-default'>
            <div className='mx-auto min-h-[400px] max-w-[1000px] py-5 '>
                <h1 className=' text-center text-lg font-bold uppercase text-black'>Hoá đơn bán hàng</h1>
                {isLoading && (
                    <div className='flex items-center justify-center'>
                        <div className='loading loading-bars loading-lg'></div>
                    </div>
                )}
                {orderItems?.length === 0 && <div>Chưa có hoá đơn nào.</div>}
                {orderItems?.map((item, _) => <SellOrderItem item={item} />)}
            </div>
        </div>
    );
};

export default SellerOrder;
