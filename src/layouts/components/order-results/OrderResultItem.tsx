import { useEffect, useState } from 'react';
import { numberWithCommas } from '../../../lib/scripts';
import { getPostDetail } from '../../../services/productService';

const OrderResultItem = ({ item }: { item: any }) => {
    // const [item, setItem] = useState<any>();
    // useEffect(() => {
    //     const fetch = async () => {
    //         const data = await getPostDetail(product?.product);
    //         console.log();
    //         setItem(data);
    //     };
    //     if (product?.product) fetch();
    // }, []);
    return (
        <>
            <tr>
                <td className='min-w-[350px] max-w-[450px]'>
                    <div className='item?s-center flex pr-8'>
                        <figure className='ml-4 mr-[1.8rem] max-w-[60px]'>
                            <img src={item?.imageUrl} alt='' />
                        </figure>
                        <h3 className='overflow-hidden'>{item?.product?.name}</h3>
                    </div>
                </td>
                <td className='min-w-[140px]'>{numberWithCommas(item?.product?.price)} VND</td>
                <td className='min-w-[135px]'>
                    <div className='w-[100px]'>
                        <div className='position-relative item?s-center flex h-[40px] w-[100%] border border-solid border-[#999]'>
                            <input
                                type='text'
                                value={item?.quantity}
                                className='position-absolute w-full text-center outline-none'
                                min={1}
                                max={9999}
                            />
                        </div>
                    </div>
                </td>
                <td className='min-w-[160px] text-[#fcb941]'>
                    {numberWithCommas(item?.product?.price * item?.quantity)} VND
                </td>
            </tr>
        </>
    );
};

export default OrderResultItem;
