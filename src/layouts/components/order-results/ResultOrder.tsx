import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getOrderResult } from '../../../services/orderService';

const ResultOrder = () => {
    const params = useParams();
    useEffect(() => {
        const paymentId = params.paymentId;
        console.log(paymentId);
        const fetch = async () => {
            try {
                console.log('fetch status');
                const order: any = localStorage.getItem('order');
                console.log(order);
                const bookingResult = await getOrderResult(paymentId, order?.orderId);
                console.log();
                console.log(bookingResult);
            } catch (err) {
                console.log(err);
            }
        };
        if (paymentId) fetch();
    }, []);

    return <div>Order success</div>;
};

export default ResultOrder;