import { FaBars } from 'react-icons/fa';
import { numberWithCommas } from '../../lib/scripts';
import Icons from '../../assets/icons';
import Action from './Action';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Login from './auth-forms/Login';
import Signup from './auth-forms/Signup';
import { useUserContext } from '../../utils/authContext';
import apiRequest from '../../services/request';
import HeadlessTippy from '../../components/HeadlessTippy';
import toHyphenString from '../../lib/toHyphenString';
import { PostItem } from '../../pages/ProductDetail';
import { useAppDispatch, useDebounce } from '../../app/hook';
import { MdOutlineImageSearch } from 'react-icons/md';
import { CiBookmarkCheck, CiEdit, CiReceipt, CiUser } from 'react-icons/ci';
import { active, inactive } from '../../features/blur/blur-slice';
import DefaultImages from '../../assets/images';
type InitialSearchState = {
    isSearching: boolean;
    query: string;
};
const Header = () => {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const navigate = useNavigate();
    const { getUser, logOut } = useUserContext();
    const user = getUser();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setSearchParams] = useSearchParams({ q: '' });
    // const q = searchParams.get('q');
    // console.log(cartItems);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const cartQuantity = useSelector((state: RootState) => state.cart.quantityTotal);
    // console.log(cartQuantity);
    const listActions = [
        // {
        //     icon: Icons.imageSearch,
        //     name1: 'Tìm kiếm',
        //     name2: 'hình ảnh',
        //     to: '/search',
        // },
        {
            icon: Icons.order,
            name1: 'Tra cứu',
            name2: 'đơn hàng',
            to: '/user/order',
            authen: user,
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
    const [posts, setPosts] = useState<PostItem[]>([]);
    const debounceQuery = useDebounce<string>(search.query, 500);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        setIsLoading(true);
        apiRequest.get(`/posts/?q=${debounceQuery}`).then((response) => {
            setIsLoading(false);
            const results: PostItem[] = response.data.results;
            const reviewedPost = results.filter((post) => post.review === 1);
            console.log(results);
            setPosts(reviewedPost);
        });
    }, [debounceQuery]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value.startsWith(' ')) return;
        setSearch((prev) => ({ ...prev, query: e.target.value, isSearching: !!e.target.value }));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleSearch(e: any, type: 'click' | 'enter') {
        if (posts.length === 0) return;
        if (search.query === '') return;
        if (e.key === 'Enter' || type === 'click') {
            const query = search.query.trim().replace(/\s+/g, ' ');
            setSearchParams({ q: query });
            navigate(`/search?q=${query}`);
            setSearch((prev) => ({ ...prev, query: '', isSearching: false }));
        }
    }
    function handleDialog() {
        const modalElement = document.getElementById('modal_login') as HTMLDialogElement | null;
        if (!user) modalElement?.show();
        setIsLoginModal(true);
    }
    const [isLoginModal, setIsLoginModal] = useState(true);
    const handleLoginModal = () => {
        setIsLoginModal(!isLoginModal);
    };
    const handleSearchByImage = () => {
        navigate('/search', { state: { image: true } });
    };
    return (
        <header className='relative z-50 justify-center bg-gradient-to-r from-pink-500 to-rose-500'>
            <div className='mx-auto my-auto flex items-center justify-center  px-4 py-3 lg:mx-auto lg:max-w-[1200px] xl:px-0'>
                <div className='my-auto text-white '>
                    <FaBars className='h-6 w-6' />
                </div>
                <Link to={'/'} className='logo my-auto ml-4 shadow-2xl'>
                    <img src={DefaultImages.logoShogear} className=' hidden w-[140px] lg:inline-block'></img>
                    <img
                        src='https://file.hstatic.net/200000636033/file/logo-mobile_1e5b7fc485b24cf985b3d63cfa1f88be.svg'
                        className=' w-[40px] lg:hidden'
                    ></img>
                </Link>
                <div className='search relative ml-4 flex h-10 w-[60%] rounded-md  bg-white ring-slate-100 focus-within:shadow-overflow sm:w-[80%] md:w-[35%] lg:w-[45%]'>
                    <div className='relative z-10 w-full overflow-hidden rounded-md'>
                        <input
                            className='font-italic z-10 h-full w-full rounded-md rounded-bl-none border-none pl-4 font-sf text-base text-placeholder outline-none placeholder:text-placeholder'
                            placeholder='Bạn cần tìm gì?'
                            onFocus={() => {
                                setSearch((prev) => ({ ...prev, isSearching: !!prev.query }));
                                dispatch(active());
                            }}
                            onBlur={() => {
                                setTimeout(() => {
                                    setSearch((prev) => ({ ...prev, isSearching: false }));
                                    dispatch(inactive());
                                }, 200);
                            }}
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
                        <div
                            className='smart-search-wrapper custom-scrollbar'
                            onBlur={() => setSearch((prev) => ({ ...prev, isSearching: false }))}
                        >
                            {isLoading && (
                                <div className='flex items-center justify-center'>
                                    <span className='loading loading-dots loading-md'></span>
                                </div>
                            )}
                            {posts.length > 0 && !isLoading
                                ? posts.map((item, index) => (
                                      <React.Fragment key={index}>
                                          <Link
                                              to={`/products/${toHyphenString(item.product.name)}`}
                                              state={{ item }}
                                              className='  flex cursor-pointer items-center justify-between gap-2 hover:bg-gray-100'
                                          >
                                              <div className='ml-4 '>
                                                  <h3 className='line-clamp-1'>
                                                      {item.product.name.split('').map((char, index) => (
                                                          <span
                                                              key={index}
                                                              className={
                                                                  search.query
                                                                      .toLowerCase()
                                                                      .includes(char.toLowerCase())
                                                                      ? ''
                                                                      : 'font-bold'
                                                              }
                                                          >
                                                              {char}
                                                          </span>
                                                      ))}
                                                  </h3>
                                                  <p>
                                                      <span className='price mr-2 '>
                                                          {numberWithCommas(item.product.price)}{' '}
                                                      </span>
                                                      • <span className='ml-2'>{item.zone}</span>
                                                  </p>
                                              </div>
                                              <div className='mr-2 p-2'>
                                                  <img
                                                      src={item.product.attachments[0].file}
                                                      alt=''
                                                      className='h-16 w-16 object-cover'
                                                  />
                                              </div>
                                          </Link>
                                          <div className='divider m-0 ml-2 h-0 w-[calc(100%-24px)] text-center after:h-[1px]'></div>
                                      </React.Fragment>
                                  ))
                                : !isLoading && (
                                      <div className='flex items-center justify-center p-4'>
                                          <p className='text-sm text-gray-400'>Không tìm thấy kết quả</p>
                                      </div>
                                  )}
                        </div>
                    )}
                </div>
                <div className='actions ml-3 flex w-auto align-bottom'>
                    <div className='flex items-center justify-between gap-2 '>
                        <div
                            className=' tooltip tooltip-bottom tooltip-warning flex items-center justify-center '
                            data-tip='Tìm kiếm bằng hình ảnh'
                        >
                            <Button
                                variant={'fill'}
                                size={'medium'}
                                className='bg-gradient-to-r from-indigo-300 to-purple-400 text-3xl'
                                onClick={handleSearchByImage}
                            >
                                <MdOutlineImageSearch />
                            </Button>
                        </div>
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
                                        <>
                                            {!item.authen ? (
                                                <div
                                                    className='tooltip tooltip-bottom'
                                                    data-tip='Đăng nhập để tiếp tục'
                                                >
                                                    <Action
                                                        name1={item.name1}
                                                        name2={item.name2}
                                                        icon={item.icon}
                                                        key={index}
                                                        count={item.count}
                                                    />
                                                </div>
                                            ) : (
                                                <Link to={item.to || ''}>
                                                    <Action
                                                        name1={item.name1}
                                                        name2={item.name2}
                                                        icon={item.icon}
                                                        key={index}
                                                        count={item.count}
                                                    />
                                                </Link>
                                            )}
                                        </>
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
                                        <Link
                                            to={'/user/profile'}
                                            state={{ seller: user.id }}
                                            className='border-md mb-2 flex items-center gap-2 p-2 hover:bg-gray-200'
                                        >
                                            <CiUser /> Trang cá nhân
                                        </Link>
                                        <Link
                                            to={'/new/product'}
                                            className='border-md mb-2 flex items-center gap-2 p-2 hover:bg-gray-200'
                                        >
                                            <CiEdit /> Tạo bài đăng
                                        </Link>
                                        <Link
                                            to={'/seller/order'}
                                            className='border-md flex  items-center gap-2 p-2 hover:bg-gray-200'
                                        >
                                            <CiReceipt /> Hoá đơn bán hàng
                                        </Link>
                                        {user.isAdmin && (
                                            <Link
                                                to={'/admin'}
                                                className='border-md flex  items-center gap-2 p-2 hover:bg-gray-200'
                                            >
                                                <CiBookmarkCheck /> Quản lý trang web
                                            </Link>
                                        )}
                                        <Button
                                            variant={'fill'}
                                            className='mt-2'
                                            onClick={() => {
                                                logOut();
                                                navigate('/');
                                            }}
                                        >
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
