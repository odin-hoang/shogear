import { Link } from 'react-router-dom';
import bgImage from '../assets/images/page-cart-bg.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Icons from '../assets/icons';
import { numberWithCommas } from '../lib/scripts';
import { useRef, useState } from 'react';
import { removeFromCart, updateCartItemQuantity, updateShippingFee } from '../features/cart/cart-slice';
import { useUserContext } from '../utils/authContext';
import { toast } from 'react-toastify';

const Cart = () => {
    const { getUser } = useUserContext();
    const user = getUser();
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const [Items, setItems] = useState(cartItems);
    const [idRemove, setIdRemove] = useState(-1);
    const savedShippingOption = localStorage.getItem('selectedShippingOption');
    const initialShippingOption = savedShippingOption ? parseInt(savedShippingOption) : -1;
    const [selectedOption, setSelectedOption] = useState<number>(initialShippingOption);

    const topRef = useRef(null);

    // Function to scroll to the top when the link is clicked
    const scrollToTop = () => {
        if (topRef.current) {
            (topRef.current as HTMLDivElement).scrollIntoView({ behavior: 'smooth' });
        }
    };
    // tong gia tri gio hang
    const sumTotal = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const handleIncrement = (index: number) => {
        const updatedCartItems = [...Items];
        if (updatedCartItems[index].quantity < 9999) {
            const updatedItem = { ...updatedCartItems[index], quantity: updatedCartItems[index].quantity + 1 };
            updatedCartItems[index] = updatedItem;
            setItems(updatedCartItems);
            dispatch(updateCartItemQuantity({ index, quantity: updatedCartItems[index].quantity }));
        }
    };
    const handleDecrement = (index: number) => {
        const updatedCartItems = [...Items];
        if (updatedCartItems[index].quantity > 1) {
            const updatedItem = { ...updatedCartItems[index], quantity: updatedCartItems[index].quantity - 1 };
            updatedCartItems[index] = updatedItem;
            setItems(updatedCartItems);
            dispatch(updateCartItemQuantity({ index, quantity: updatedCartItems[index].quantity }));
        }
    };
    const handleQuantityChange = (index: number, newQuantity: string) => {
        const updatedCartItems = [...Items];
        updatedCartItems[index] = { ...updatedCartItems[index], quantity: parseInt(newQuantity) || 1 };
        setItems(updatedCartItems);
        dispatch(updateCartItemQuantity({ index, quantity: parseInt(newQuantity) || 1 }));
    };

    const handleRemove = (id: number) => {
        console.log('id of remove' + id);
        dispatch(removeFromCart(id));
    };

    //total cost
    const handleRadioChange = (option: number) => {
        if (cartItems.length > 0) {
            setSelectedOption(option);
            dispatch(updateShippingFee(option));
            //luu giu trang thai
            localStorage.setItem('selectedShippingOption', option.toString());
        }
    };
    const calculateTotal = () => {
        if (cartItems.length === 0) {
            return sumTotal;
        }
        return sumTotal + selectedOption;
    };

    return (
        <div className='bg-white px-6 py-6'>
            <div className='bg-cover bg-center p-0' style={{ backgroundImage: `url(${bgImage})` }}>
                <h1 className='py-[3rem] text-center text-[4rem]'>GIỎ HÀNG</h1>
            </div>
            <nav className='mb-16 border-b border-solid border-gray-300 border-opacity-50 bg-white'>
                <div className='w-[100%] px-[10px] py-[1.4rem]'>
                    <ol className='m-0 flex rounded-none bg-transparent p-0'>
                        <li className='breadcrumb-item text-[#777]'>
                            <Link className='text-link' to='/'>
                                Trang chủ
                            </Link>
                            <span className='mx-2'> / </span>
                        </li>
                        <li className=' breadcrumb-item '>Giỏ hàng</li>
                    </ol>
                </div>
            </nav>
            <div className='bg-white pb-20'>
                <div className='w-[100%] '>
                    <div className='flex flex-wrap'>
                        <div className='flex-basis-75 min-w-[70%] max-w-[70%] flex-none flex-shrink-0 pr-[10px]'>
                            <table className='table-cart'>
                                <thead>
                                    <tr>
                                        <th className='min-w-[350px] max-w-[450px] pl-[10px]'>Tên sản phẩm</th>
                                        <th className='min-w-[140px]'>Giá</th>
                                        <th className='min-w-[135px]'>Số lượng</th>
                                        <th className='min-w-[160px]'>Tổng tiền</th>
                                        <th className='min-w-[38px] items-center '></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.length > 0 ? (
                                        cartItems.map((item, index) => (
                                            <>
                                                <tr key={index}>
                                                    <td className='min-w-[350px] max-w-[450px]'>
                                                        <div className='flex items-center pr-8'>
                                                            <figure className='ml-4 mr-[1.8rem] max-w-[60px]'>
                                                                <img src={item.imageUrl} alt='' />
                                                            </figure>
                                                            <h3 className='overflow-hidden'>{item.name}</h3>
                                                        </div>
                                                    </td>
                                                    <td className='min-w-[140px]'>
                                                        {numberWithCommas(item.price)} VND
                                                    </td>
                                                    <td className='min-w-[135px]'>
                                                        <div className='w-[100px]'>
                                                            <div className='position-relative flex h-[40px] w-[100%] items-center border border-solid border-[#999]'>
                                                                <img
                                                                    src={Icons.minus}
                                                                    alt=''
                                                                    className='position-absolute minus-icon ml-[5px] max-h-[40px] max-w-[15px]'
                                                                    onClick={() => handleDecrement(index)}
                                                                />

                                                                <input
                                                                    type='text'
                                                                    value={item.quantity}
                                                                    className='position-absolute max-w-[60px] text-center '
                                                                    min={1}
                                                                    max={9999}
                                                                    onChange={(e) =>
                                                                        handleQuantityChange(index, e.target.value)
                                                                    }
                                                                    // onChange={(e) => e.target.value}
                                                                />

                                                                <img
                                                                    src={Icons.plus}
                                                                    alt=''
                                                                    className='position-absolute plus-icon mr-[5px] max-h-[40px] max-w-[15px]'
                                                                    onClick={() => handleIncrement(index)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='min-w-[160px] text-[#fcb941]'>
                                                        {numberWithCommas(item.price * item.quantity)} VND
                                                    </td>
                                                    <td className='min-w-[38px] items-center '>
                                                        <img
                                                            src={Icons.remove}
                                                            alt=''
                                                            className='max-h-[15px] max-w-[15px]'
                                                            style={{ color: '#999' }}
                                                            onClick={() => {
                                                                const modalElement = document.getElementById(
                                                                    'my_modal_1',
                                                                ) as HTMLDialogElement | null;
                                                                if (modalElement) {
                                                                    modalElement.showModal();
                                                                }
                                                                setIdRemove(item.id);
                                                                console.log(item.id);
                                                            }}
                                                        />
                                                    </td>
                                                </tr>
                                            </>
                                        ))
                                    ) : (
                                        // If there are no products in the cart
                                        <tr>
                                            <td colSpan={5} className='py-4 text-center'>
                                                Không có sản phẩm nào trong giỏ hàng! Quay lại{' '}
                                                <Link className='text-[#fcb941]' to='/'>
                                                    trang chủ
                                                </Link>
                                                !
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <aside className='flex-basis-25 min-w-[30%] max-w-[30%] flex-1 flex-shrink-0 pl-[10px]'>
                            <div className='mb-[3rem] border border-dashed border-[#d7d7d7] bg-[#f9f9f9] px-[1rem] pb-[0.5rem] pt-2'>
                                <h3 className='boder-solid border-b border-[#cccccc] pb-[1.2rem] text-[1.5rem]'>
                                    Tổng giỏ hàng
                                </h3>
                                <table className='table-summary w-[100%]'>
                                    <tbody>
                                        <tr>
                                            <td className='w-[50%] border-b-[0.1rem] border-solid border-[#ebebeb] py-8'>
                                                Tổng tiền:{' '}
                                            </td>
                                            <td className='w-[50%] border-b-[0.1rem] border-solid border-[#ebebeb] py-8 text-right'>
                                                <span>{`${numberWithCommas(sumTotal)} VND`}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='pb-2 pt-4'>Phí vận chuyển:</td>
                                            <td className='pb-2 pt-4'>&nbsp;</td>
                                        </tr>
                                        <tr className='summary-ship'>
                                            <td className='w-[50%]'>
                                                <div className='pl-4'>
                                                    <input
                                                        type='radio'
                                                        name='option'
                                                        id='freeShippingOption'
                                                        onChange={() => handleRadioChange(0)}
                                                        checked={selectedOption === 0}
                                                    />
                                                    <label className='pl-4' htmlFor='freeShippingOption'>
                                                        Miễn phí
                                                    </label>
                                                </div>
                                            </td>
                                            <td className='w-[50%] text-right'>0 VND</td>
                                        </tr>
                                        <tr className='summary-ship'>
                                            <td className='w-[50%]'>
                                                <div className='pl-4'>
                                                    <input
                                                        type='radio'
                                                        name='option'
                                                        id='standardOption'
                                                        onChange={() => handleRadioChange(10000)}
                                                        checked={selectedOption === 10000}
                                                    />
                                                    <label className='pl-4' htmlFor='standardOption'>
                                                        Tiêu chuẩn
                                                    </label>
                                                </div>
                                            </td>
                                            <td className='w-[50%] text-right'>10.000 VND</td>
                                        </tr>
                                        <tr className='summary-ship  border-b-[0.1rem] border-solid border-[#ebebeb]'>
                                            <td className='last-td w-[50%]'>
                                                <div className='pl-4'>
                                                    <input
                                                        type='radio'
                                                        name='option'
                                                        id='expressOption'
                                                        onChange={() => handleRadioChange(20000)}
                                                        checked={selectedOption === 20000}
                                                    />
                                                    <label className='pl-4' htmlFor='expressOption'>
                                                        Nhanh
                                                    </label>
                                                </div>
                                            </td>
                                            <td className='last-td w-[50%] text-right'>20.000 VND</td>
                                        </tr>
                                        <tr>
                                            <td className='w-[50%] py-[1.5rem] text-[#fcb941]'>Tổng tiền:</td>

                                            <td className='w-[50%] py-[1.5rem] text-right text-[#fcb941]'>
                                                {numberWithCommas(calculateTotal())} VND
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {cartItems?.length > 0 && (
                                    <>
                                        {!user ? (
                                            <div
                                                onClick={() => {
                                                    toast.error('Đăng nhập để tiếp tục');
                                                }}
                                                className='proceed-checkout mb-[1rem] block w-[100%] cursor-pointer border-[0.1rem] border-[#fcb941] p-[0.5rem] text-center text-[#fcb941]'
                                            >
                                                THANH TOÁN
                                            </div>
                                        ) : (
                                            <Link
                                                to='/checkout'
                                                className='proceed-checkout mb-[1rem] block w-[100%] border-[0.1rem] border-[#fcb941] p-[0.5rem] text-center text-[#fcb941]'
                                                onClick={scrollToTop}
                                            >
                                                THANH TOÁN
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                            <Link
                                to='/'
                                className='continue-shopping flex w-[100%] justify-center border-[0.1rem] border-solid border-[#d7d7d7] p-4'
                            >
                                <span className='pr-[20px]'>QUAY VỀ TRANG CHỦ</span>
                                <img src={Icons.refresh} alt='' className='refresh-icon h-auto w-[14px]' />
                            </Link>
                        </aside>
                        {/* modal remove*/}
                        <dialog id='my_modal_1' className='modal'>
                            <div className='modal-box'>
                                <h3 className='text-lg font-bold text-[#e30005]'>Thông báo</h3>
                                <p className='py-4'>
                                    Bạn chắc rằng muốn <span className='text-[#e30005]'>xoá</span> sản phẩm này?
                                </p>
                                <div className='modal-action'>
                                    <form method='dialog'>
                                        <button className='btn-yes btn'>Thoát</button>
                                    </form>
                                    <form method='dialog'>
                                        <button onClick={() => handleRemove(idRemove)} className='btn-no btn'>
                                            Xoá
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
