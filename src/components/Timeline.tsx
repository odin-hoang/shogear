import { useState } from 'react';
import { Check } from './Icons';

const Timeline = () => {
    const [orderInfo, _] = useState({
        amount: {
            pending: 1,
            unpaid: 1,
            paid: 1,
            inTransit: 1,
            delivered: 1,
            cancelled: 0,
        },
    });
    return (
        <div>
            <ul className='timeline timeline-vertical'>
                <li className='h-60'>
                    <div className='timeline-start'>
                        <div>Đang chờ xác nhận</div>
                        <div>{orderInfo.amount.pending}</div>
                    </div>
                    <div className='timeline-middle '>
                        <Check className='h-10 w-10 text-red-500' />
                    </div>
                    <div className='timeline-end timeline-box'>First Macintosh computer</div>
                    <hr className='h-5 w-5 bg-red-500' />
                </li>
                <li>
                    <hr className='bg-red-500' />
                    <div className='timeline-start'>
                        <div>Đang chờ thanh toán</div>
                        <div>{orderInfo.amount.unpaid}</div>
                    </div>
                    <div className='timeline-middle'>
                        <Check className='h-10 w-10 text-red-500' />
                    </div>
                    <div className='timeline-end timeline-box'>iMac</div>
                    <hr />
                </li>
                <li>
                    <hr />
                    <div className='timeline-start'>
                        <div>Đã thanh toán</div>
                        <div>{orderInfo.amount.paid}</div>
                    </div>
                    <div className='timeline-middle'>
                        <Check className='h-10 w-10 text-red-500' />
                    </div>
                    <div className='timeline-end timeline-box'>iPod</div>
                    <hr />
                </li>
                <li>
                    <hr />
                    <div className='timeline-start'>
                        <div>Đang giao hàng</div>
                        <div>{orderInfo.amount.delivered}</div>
                    </div>
                    <div className='timeline-middle'>
                        <Check className='h-10 w-10 text-red-500' />
                    </div>
                    <div className='timeline-end timeline-box'>iPhone</div>
                    <hr />
                </li>
                <li>
                    <hr />
                    <div className='timeline-start'>
                        <div>Đã huỷ</div>
                        <div>{orderInfo.amount.cancelled}</div>
                    </div>
                    <div className='timeline-middle'>
                        <Check className='h-10 w-10 text-red-500' />
                    </div>
                    <div className='timeline-end timeline-box'>Apple Watch</div>
                </li>
            </ul>
        </div>
    );
};

export default Timeline;
