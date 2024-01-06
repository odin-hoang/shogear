import { FaBars } from 'react-icons/fa';
import { numberWithCommas } from '../../lib/scripts';
import Icons from '../../assets/icons';
import Action from './Action';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Button from '../../components/Button';
import Login from './auth-forms/Login';
import Signup from './auth-forms/Signup';
import { useUserContext } from '../../utils/authContext';
import apiRequest from '../../services/request';
import { debounce } from 'lodash';
import HeadlessTippy from '../../components/HeadlessTippy';

type InitialSearchState = {
    isSearching: boolean;
    query: string;
};
const Header = () => {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setSearchParams] = useSearchParams({ q: '' });
    // const q = searchParams.get('q');
    // console.log(cartItems);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const cartQuantity = useSelector((state: RootState) => state.cart.quantityTotal);
    // console.log(cartQuantity);
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
            count: cartItems.length,
        },
    ];
    const [search, setSearch] = useState<InitialSearchState>({
        isSearching: false,
        query: '',
    });
    // TODO: call query API  --> search result
    type Post = {
        id: number;
        imageUrl: string;
        heading: string;
        price: number;
    };
    const [posts, setPosts] = useState<Post[]>([]);
    const debouncedSearch = debounce((query: string) => {
        apiRequest.get(`/products/?q=${query}`).then((response) => {
            const datas: Post[] = [];
            for (const post of response.data.results) {
                const data: Post = {
                    id: post.id,
                    imageUrl: 'https://picsum.photos/200',
                    heading: post.name,
                    price: post.price,
                };
                datas.push(data);
            }
            setPosts(() => {
                return [...datas];
            });
        });
    }, 500); // delay of 500ms

    useLayoutEffect(() => {
        if (search.query) {
            debouncedSearch(search.query);
        }
    }, [search.query]);

    const { getUser, logOut } = useUserContext();
    const user = getUser();
    console.log(user);
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value.startsWith(' ')) return;
        setSearch((prev) => ({ ...prev, query: e.target.value, isSearching: !!e.target.value }));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleSearch(e: any, type: 'click' | 'enter') {
        if (e.key === 'Enter' || type === 'click') {
            const query = search.query.trim().replace(/\s+/g, ' ');
            setSearchParams({ q: query });
            navigate(`/search?q=${query}`);
            setSearch((prev) => ({ ...prev, query: '', isSearching: false }));
        }
    }
    function handleDialog() {
        const modalElement = document.getElementById('modal_login') as HTMLDialogElement | null;
        console.log(user);
        if (!user) modalElement?.showModal();
        setIsLoginModal(true);
    }
    const [isLoginModal, setIsLoginModal] = useState(true);
    const handleLoginModal = () => {
        setIsLoginModal(!isLoginModal);
    };

    return (
        <header className='relative z-50 justify-center bg-primary-default'>
            <div className='mx-auto my-auto flex justify-center bg-primary-default px-4 py-3 lg:mx-auto lg:max-w-[1200px] xl:px-0'>
                <div className='my-auto text-white '>
                    <FaBars className='h-6 w-6' />
                </div>
                <Link to={'/'} className='logo my-auto ml-4'>
                    <img
                        src='https://file.hstatic.net/200000636033/file/logo_fd11946b31524fbe98765f34f3de0628.svg'
                        className=' hidden w-[140px] lg:inline-block'
                    ></img>
                    <img
                        src='https://file.hstatic.net/200000636033/file/logo-mobile_1e5b7fc485b24cf985b3d63cfa1f88be.svg'
                        className=' w-[40px] lg:hidden'
                    ></img>
                </Link>
                <div className='search relative ml-4 flex h-10 w-[60%] rounded-sm  bg-white ring-slate-100 focus-within:shadow-overflow sm:w-[80%] md:w-[35%] lg:w-[45%]'>
                    <div className='relative z-10 w-full overflow-hidden rounded-sm'>
                        <input
                            className='font-italic z-10 h-full w-full rounded-sm rounded-bl-none border-none pl-4 font-sf text-base text-placeholder outline-none placeholder:text-placeholder'
                            placeholder='Bạn cần tìm gì?'
                            onFocus={() => setSearch((prev) => ({ ...prev, isSearching: !!prev.query }))}
                            onBlur={() => setSearch((prev) => ({ ...prev, isSearching: false }))}
                            onChange={(e) => handleChange(e)}
                            onKeyDown={(e) => handleSearch(e, 'enter')}
                            value={search.query}
                        />
                    </div>
                    <div
                        className='relative z-10 flex cursor-pointer items-center justify-center rounded-sm bg-white p-4 hover:bg-gray-100'
                        onClick={(e) => handleSearch(e, 'click')}
                    >
                        <img src={Icons.search} alt='search' className='h-4 w-4' />
                    </div>
                    {!!search.isSearching && (
                        <div className='smart-search-wrapper custom-scrollbar'>
                            {posts.map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className='  flex cursor-pointer items-center justify-between gap-2 hover:bg-gray-100'>
                                        <div className='ml-4'>
                                            <h3 className='line-clamp-1'>{item.heading}</h3>
                                            <p>
                                                <span className='price mr-2 '>{numberWithCommas(item.price)} </span>•{' '}
                                                {/* <span className='ml-2'>{item.zone}</span> */}
                                            </p>
                                        </div>
                                        <div className='mr-2 p-2'>
                                            <img src={item.imageUrl} alt='' className='h-16 w-16 object-cover' />
                                        </div>
                                    </div>
                                    <div className='divider m-0 ml-2 h-0 w-[calc(100%-24px)] text-center after:h-[1px]'></div>
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </div>
                <div className='actions ml-3 flex w-auto align-bottom'>
                    <div className='flex items-center justify-between gap-2 '>
                        {listActions.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    {item.count !== undefined ? (
                                        <div className='product-cart'>
                                            <Link to={'/cart'}>
                                                <Action
                                                    name1={item.name1}
                                                    name2={item.name2}
                                                    icon={item.icon}
                                                    key={index}
                                                    count={item.count}
                                                />
                                            </Link>
                                            <div className='products-in-cart shadow-overflow'>
                                                <div className='mx-3 mt-3 text-sm font-bold text-secondary-default '>
                                                    Giỏ hàng
                                                </div>
                                                <div className='product-container mb-2 ml-2 mr-2 max-h-[300px] overflow-y-auto '>
                                                    {cartItems.map((product, index) => (
                                                        <div key={index} className='product-item'>
                                                            <div className='product-detail mb-4'>
                                                                <span className='min-h-[60px] min-w-[60px] rounded-lg border border-gray-200 border-opacity-40 '>
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
                                                                        <span className='product-price price'>
                                                                            {numberWithCommas(
                                                                                product.price * product.quantity,
                                                                            )}
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
                                                    <p className='text-sm text-secondary-default'>
                                                        {cartItems.length} sản phẩm
                                                    </p>
                                                    <Button variant={'fillBlue'}>
                                                        <Link to='/cart'>Xem giỏ hàng</Link>
                                                    </Button>
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
                                </React.Fragment>
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

                    <div
                        className='shopcart my-auto ml-4 flex h-10 w-auto cursor-pointer items-center justify-center gap-2 rounded p-4 md:bg-primary-900'
                        onClick={handleDialog}
                    >
                        <div className='shrink-0'>
                            <img src={Icons.user} className='mx-auto my-auto h-[36px] w-[18px]' />
                        </div>
                        {user && user.id != -1 ? (
                            <HeadlessTippy
                                content={
                                    <div className=' '>
                                        <Link to={'/new/product'}>Tạo bài đăng</Link>
                                        <Button variant={'fill'} className='mt-2' onClick={() => logOut()}>
                                            Đăng xuất
                                        </Button>
                                    </div>
                                }
                            >
                                <p className='hidden  w-full flex-col font-sf text-xs  font-semibold text-white md:block'>
                                    Hi <br />
                                    {user?.username}
                                </p>
                            </HeadlessTippy>
                        ) : (
                            <p className='hidden  w-full flex-col font-sf text-xs  font-semibold text-white md:block'>
                                Đăng <br />
                                nhập
                            </p>
                        )}
                    </div>

                    {/* test cart */}
                </div>
            </div>
            <dialog id='modal_login' className=' modal'>
                <div className=' custom-scrollbar modal-box'>
                    {/* Close button */}
                    <form method='dialog'>
                        <button id='close_dialog' className='btn-sm absolute right-4 top-4 outline-none'>
                            ✕
                        </button>
                    </form>
                    {isLoginModal ? (
                        <Login onLoginModal={handleLoginModal} />
                    ) : (
                        <Signup onLoginModal={handleLoginModal} />
                    )}
                </div>
            </dialog>
        </header>
    );
};
export default Header;
