import { numberWithCommas } from '../../../lib/scripts';
import { ProductItem } from '../../../pages/ProductDetail';

const OrderResultItem = ({ item }: { item: any }) => {
    const product = item.product as ProductItem;
    return (
        <>
            <tr>
                <td className='min-w-[350px] max-w-[450px]'>
                    <div className='item?s-center flex pr-8'>
                        <figure className='ml-4 mr-[1.8rem] max-w-[60px]'>
                            <img src={product?.attachments[0].file} alt='' />
                        </figure>
                        <h3 className='overflow-hidden'>{product?.name}</h3>
                    </div>
                </td>
                <td className='min-w-[140px]'>{numberWithCommas(product?.price)} VND</td>
                <td className='min-w-[135px]'>
                    <div className='w-[100px]'>
                        <div className='position-relative item?s-center flex h-[40px] w-[100%] border border-solid border-[#999]'>
                            <input
                                type='text'
                                value={item.quantity}
                                className='position-absolute w-full text-center outline-none'
                                min={1}
                                max={9999}
                            />
                        </div>
                    </div>
                </td>
                <td className='min-w-[160px] text-[#fcb941]'>{numberWithCommas(product?.price * item.quantity)} VND</td>
            </tr>
        </>
    );
};

export default OrderResultItem;
