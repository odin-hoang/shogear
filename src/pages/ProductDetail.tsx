import { Link, useLocation, useNavigate } from 'react-router-dom';
import ImageSlider, { Images } from '../components/ImageSlider';
import { numberWithCommas } from '../lib/scripts';
import Button from '../components/Button';
import { FiPhoneCall } from 'react-icons/fi';
// import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { BsCartPlusFill } from 'react-icons/bs';
import { FaClockRotateLeft, FaLocationDot } from 'react-icons/fa6';
import { FireIcon } from '../components/Icons';
import { useAppDispatch } from '../app/hook';
import { addToCart } from '../features/cart/cart-slice';
import { useEffect, useState } from 'react';
import apiRequest from '../services/request';
import DefaultImages from '../assets/images';
import { User } from '../layouts/components/order-results/OrderCheck';
export interface ProductItem {
    id: number;
    fieldValues: [{ tag: string; value: string }];
    attachments: Images[];
    name: string;
    description: string;
    price: number;
    isAvailable: string;
    amount: string;
    category: string;
    status?: string;
    user: User;
}
export interface PostItem {
    id: number;
    product: ProductItem;
    zone: string;
    user: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    review: number;
}
export interface CartItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
}
const ProductDetail = () => {
    const { state } = useLocation();
    const post: PostItem = state.item;
    // add product to cart
    const dispatch = useAppDispatch();
    const handleAddCart = (payload: CartItem) => {
        const cartItem: CartItem = {
            id: payload.id !== undefined ? payload.id : Date.now(),
            name: payload.name,
            quantity: payload.quantity,
            price: payload.price,
            imageUrl: payload.imageUrl,
        };
        dispatch(addToCart(cartItem));
        //show cart after add success
        const cartElement = document.querySelector('.products-in-cart');
        cartElement?.classList.add('show-cart');
        setTimeout(() => {
            cartElement?.classList.remove('show-cart');
        }, 2000);
        //cart auto
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // notice
        console.log('add product success');
    };
    // TODO: Call api to get detail information of user and product
    const [phoneNumber, setPhoneNumber] = useState('0');
    useEffect(() => {
        apiRequest.get(`/users/${post.product.user}`).then((response) => {
            setPhoneNumber(response.data.phone);
        });
    }, [post.id]);
    const handleShowPhoneNumber = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.textContent = 'SMS: ' + phoneNumber;
    };
    const navigate = useNavigate();
    return (
        <div className='bg-bodyBg-default px-6 py-6 '>
            <div className='mx-auto max-w-[1200px]'>
                <div className=' breadcrumbs -mt-6'>
                    <ul>
                        <li>
                            <Link to={'/'}>Home</Link>
                        </li>
                        <li>
                            <Link to={'/'}>{post.product.category}</Link>
                        </li>
                        <li>{post.product.name}</li>
                    </ul>
                </div>
                {/* Main */}
                <div className=' rounded-md bg-white p-4'>
                    <div className='flex gap-6'>
                        <div className='sticky top-2 h-min'>
                            <ImageSlider images={post.product.attachments} />
                        </div>
                        {/* product information */}
                        <div className='mt-4 grow'>
                            <h1 className='mb-2 text-xl font-bold'>{post.product.name}</h1>
                            <div className='price mb-2 text-2xl'>{numberWithCommas(post.product.price)}</div>
                            <div className='flex w-full items-center'>
                                {!!post.product.status === false ? (
                                    <span className='flex flex-1 items-center bg-white/50 backdrop-blur-sm'>
                                        <span className='tag-used rounded-tl-md'>Đã qua sử dụng</span>
                                        {/* <span className='tag-time-used'>12 năm</span> */}
                                    </span>
                                ) : (
                                    <span className='tag-like-new flex items-center gap-2 rounded-tl-md'>
                                        <FireIcon />
                                        Like new 99%
                                    </span>
                                )}
                            </div>

                            <p className='relative mb-4  rounded-md rounded-tl-none border p-2 text-lg shadow-lg shadow-bodyBg-default'>
                                {post.product.description}
                            </p>
                            <div className='icon-text'>
                                <FaLocationDot /> {post.zone}
                            </div>
                            <div className='icon-text'>
                                <FaClockRotateLeft /> Ngày đăng: {post.updatedAt}
                            </div>
                            {/* Tags will be added here */}

                            {post.product.fieldValues.length > 0 && (
                                <div>
                                    <p className='mt-4 font-bold text-primary-900'>Thông tin chi tiết</p>
                                    <table className='table text-base'>
                                        <tbody>
                                            {post.product.fieldValues.map((field) => (
                                                <tr>
                                                    <td className='font-bold'>{field.tag}</td>
                                                    <td>{field.value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            <div className='mt-2 flex flex-col gap-2'>
                                <Button
                                    variant={'fill'}
                                    size={'medium'}
                                    className='justify-center'
                                    onClick={() => {
                                        handleAddCart({
                                            id: post.product.id,
                                            imageUrl: post.product.attachments[0].file,
                                            name: post.product.name,
                                            price: post.product.price,
                                            quantity: 1,
                                        } as CartItem);
                                        navigate('/cart');
                                    }}
                                >
                                    Mua ngay
                                </Button>
                                <Button
                                    variant={'outline'}
                                    size={'medium'}
                                    onClick={() =>
                                        handleAddCart({
                                            id: post.product.id,
                                            imageUrl: post.product.attachments[0].file,
                                            name: post.product.name,
                                            price: post.product.price,
                                            quantity: 1,
                                        } as CartItem)
                                    }
                                    className='justify-center'
                                >
                                    <BsCartPlusFill />
                                    Thêm vào giỏ hàng
                                </Button>
                            </div>
                        </div>
                        <div className='sticky top-2 h-min shrink-0'>
                            {/* seller info */}
                            <Link
                                to={'/user/profile'}
                                state={{ seller: post.product.user }}
                                className='tooltip tooltip-warning mb-2 flex items-center gap-2'
                                data-tip='Truy cập trang cá nhân'
                            >
                                <div className='avatar offline relative h-16 w-16 '>
                                    <img src={DefaultImages.defaultAvatar} alt='' className='rounded-full' />
                                </div>
                                <div>
                                    <div className='font-bold'>{post.user}</div>
                                    {/* <div className='flex items-center gap-1'>
                                        <FaRegClock /> 1 phút trước
                                    </div> */}
                                </div>
                            </Link>

                            <div className='flex flex-col items-center gap-2'>
                                <Button variant={'fillBlue'} className='flex' onClick={(e) => handleShowPhoneNumber(e)}>
                                    <FiPhoneCall />
                                    Bấm để hiện số điện thoại
                                </Button>
                                {/* <Button variant={'outlineBlue'}>
                                    <IoChatbubbleEllipsesOutline /> Chat với người bán
                                </Button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
