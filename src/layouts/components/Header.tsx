import { FaBars } from 'react-icons/fa';
import { numberWithCommas } from '../../lib/scripts';
import Icons from '../../assets/icons';
import Action from './Action';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Link } from 'react-router-dom';

const Header = () => {
    // list product in cart
    const data = [
        {
            id: 1,
            imageUrl:
                'https://product.hstatic.net/200000722513/product/km086w_facd6092154b4d769a04f1859a0c4b8e_medium.png',
            username: 'David Smith',
            price: 120000,
            postedAt: '1 phút trước',
            zone: 'Hồ Chí Minh',
            name: 'Laptop gaming Acer Aspire 7 A715 76G 59MW',
            isUsed: false,
        },
        {
            id: 2,
            imageUrl:
                'https://product.hstatic.net/200000722513/product/latitude-3520-p108f001-70280538-fix_83b4c85f06d145199d87d838dc9eca04_medium.png',
            username: 'Todo Smith',
            price: 20890000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
            postedAt: '2 ngày trước',
            zone: 'Bà Rịa - Vũng Tàu',
            isUsed: true,
        },
        {
            id: 3,
            imageUrl:
                'https://product.hstatic.net/200000722513/product/lg-gram-2023-fix_28f08b20a1724869a1d5da4920697371_medium.png',
            username: 'Kelvin Smith',
            price: 35490000,
            postedAt: '5 phút trước',
            name: 'Laptop LG Gram 2023 14Z90R GAH53A5',
            zone: 'Thái Nguyên',
            isUsed: false,
        },
        {
            id: 4,
            imageUrl: 'https://down-vn.img.susercontent.com/file/bc3903834d250fcdadf0e5c6b5761310',
            username: 'Kelvin Smith',
            price: 340000000,
            postedAt: '2 giờ trước',
            name: '[Hàng chính hãng] Bàn phím Dell KB216',
            zone: 'Hà Nội',
            isUsed: true,
        },
        {
            id: 5,
            imageUrl:
                'https://product.hstatic.net/200000722513/product/vt200_1_compressed_c0a3639b9b2948bb89d600ce0640ba0d_08706b04e66d45aeb746128bfca9a29d_grande.jpg',
            username: 'Kelvin Smith',
            price: 120000,
            postedAt: '1 tuần trước',
            name: 'Chuột Rapoo Gaming VT200 RGB',
            zone: 'Đà Nẵng',
            isUsed: false,
        },
        {
            id: 6,
            imageUrl: 'https://picsum.photos/200/270',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
            postedAt: '1 tuần trước',
            zone: 'Đà Nẵng',
            isUsed: false,
        },
    ];
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const productsInCart = data
        .filter((product) => cartItems.some((item) => item.id === product.id))
        .map((product) => ({
            ...product,
            quantity: cartItems.find((item) => item.id === product.id)?.quantity || 0,
        }));

    console.log(productsInCart.length);
    const cartQuantity = useSelector((state: RootState) => state.cart.quantityTotal);
    const numberProduct = cartQuantity;
    const listActions = [
        {
            icon: Icons.headphone,
            name1: 'Hotline',
            name2: '1800.6975',
        },
        {
            icon: Icons.showroom,
            name1: 'Hệ thống',
            name2: 'Showroom',
        },
        {
            icon: Icons.order,
            name1: 'Tra cứu',
            name2: 'đơn hàng',
        },
        {
            icon: Icons.shopcart,
            name1: 'Giỏ',
            name2: 'hàng',
            count: numberProduct,
        },
    ];
    return (
        <div className='justify-center bg-primary-default'>
            <div className='mx-auto my-auto flex justify-center bg-primary-default px-4 py-3 lg:mx-auto lg:max-w-[1200px] xl:px-0'>
                <div className='my-auto text-white '>
                    <FaBars className='h-6 w-6' />
                </div>
                <div className='logo my-auto ml-4'>
                    <img
                        src='https://file.hstatic.net/200000636033/file/logo_fd11946b31524fbe98765f34f3de0628.svg'
                        className=' hidden w-[140px] lg:inline-block'
                    ></img>
                    <img
                        src='https://file.hstatic.net/200000636033/file/logo-mobile_1e5b7fc485b24cf985b3d63cfa1f88be.svg'
                        className=' w-[40px] lg:hidden'
                    ></img>
                </div>
                <div className='search ml-4 flex h-10 w-[60%] rounded border bg-white sm:w-[80%] md:w-[35%] lg:w-[45%]'>
                    <input
                        className='font-italic w-full pl-2 font-sf text-sm text-placeholder outline-none placeholder:text-placeholder'
                        placeholder='Bạn cần tìm gì?'
                    ></input>
                    <span>
                        <img src={Icons.search} alt='search' className='mx-2 h-full w-[16px]' />
                    </span>
                </div>
                <div className='actions ml-3 flex w-auto align-bottom'>
                    <div className='flex items-center justify-between gap-2 '>
                        {listActions.map((item, index) => {
                            return (
                                <>
                                    {item.count !== undefined ? (
                                        <div className='product-cart'>
                                            <Action
                                                name1={item.name1}
                                                name2={item.name2}
                                                icon={item.icon}
                                                key={index}
                                                count={item.count}
                                            />
                                            <div className='products-in-cart'>
                                                <div className='mx-3 mt-3'>Giỏ Hàng</div>
                                                <div className='product-container mb-2 ml-2 mr-2 max-h-[300px] overflow-y-auto'>
                                                    {productsInCart.map((product, index) => (
                                                        <div key={index} className='product-item'>
                                                            <div className='product-detail mb-4'>
                                                                <span className='min-h-[60px] min-w-[60px] rounded-lg border border-gray-200 border-opacity-40'>
                                                                    <img
                                                                        src={product.imageUrl}
                                                                        alt={product.name}
                                                                        className='product-image'
                                                                    />
                                                                </span>

                                                                <div className='ml-2 mr-2 flex flex-1 flex-col justify-between'>
                                                                    <a href='' className='product-name text-[14px]'>
                                                                        <label
                                                                            htmlFor=''
                                                                            className='line-clamp-2 overflow-hidden'
                                                                        >
                                                                            {product.name}
                                                                        </label>
                                                                    </a>
                                                                    <div className='flex justify-between text-[12px]'>
                                                                        <span className='product-price'>
                                                                            {numberWithCommas(
                                                                                product.price * product.quantity,
                                                                            )}{' '}
                                                                            VND
                                                                        </span>
                                                                        <span className='product-quantity'>
                                                                            x{product.quantity}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className='mx-3 mb-2 flex items-center justify-between'>
                                                    <div>{productsInCart.length} sản phẩm</div>
                                                    <button className='my-2 rounded-3xl bg-[blue] px-4 py-2 text-[white]'>
                                                        <Link to='/cart'>Xem Giỏ Hàng</Link>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <Action
                                            name1={item.name1}
                                            name2={item.name2}
                                            icon={item.icon}
                                            key={index}
                                            count={item.count}
                                        />
                                    )}
                                </>
                            );
                        })}
                    </div>
                    {/* responesive mobile */}
                    <div className='shopcart my-auto ml-4 flex h-10 w-auto items-center justify-center gap-2 rounded p-2 md:hidden '>
                        <div className='shrink-0'>
                            <img src={Icons.shopcart} className='mx-auto my-auto h-[36px] w-[18px]' />
                        </div>
                        <p className='hidden  w-full flex-col font-sf text-xs  font-semibold text-white md:block'>
                            Giỏ <br />
                            hàng
                        </p>
                    </div>
                    <div className='shopcart my-auto ml-4 flex h-10 w-auto items-center justify-center gap-2 rounded p-2 md:bg-primary-900 '>
                        <div className='shrink-0'>
                            <img src={Icons.user} className='mx-auto my-auto h-[36px] w-[18px]' />
                        </div>
                        <p className='hidden  w-full flex-col font-sf text-xs  font-semibold text-white md:block'>
                            Đăng <br />
                            nhập
                        </p>
                    </div>
                    {/* test cart */}
                </div>
            </div>
        </div>
    );
};
export default Header;
