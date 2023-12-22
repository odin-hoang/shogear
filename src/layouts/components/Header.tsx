import { FaBars } from 'react-icons/fa';
import { numberWithCommas } from '../../lib/scripts';
import Icons from '../../assets/icons';
import Action from './Action';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import React, { useState } from 'react';

type InitialSearchState = {
    isSearching: boolean;
    query: string;
};
const Header = () => {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const navigate = useNavigate();
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
    const searchResult = [
        {
            imageUrl: 'https://picsum.photos/200',
            heading: 'Laptop MSI Mordern 15',
            price: 15990000,
            zone: 'TP Hồ Chí Minh',
        },
        {
            imageUrl: 'https://picsum.photos/200',
            heading: 'Laptop MSI Mordern 15',
            price: 15990000,
            zone: 'TP Hồ Chí Minh',
        },
        {
            imageUrl: 'https://picsum.photos/200',
            heading: 'Laptop MSI Mordern 15',
            price: 15990000,
            zone: 'TP Hồ Chí Minh',
        },
        {
            imageUrl: 'https://picsum.photos/200',
            heading: 'Laptop MSI Mordern 15',
            price: 15990000,
            zone: 'TP Hồ Chí Minh',
        },
        {
            imageUrl: 'https://picsum.photos/200',
            heading: 'Laptop MSI Mordern 15',
            price: 15990000,
            zone: 'TP Hồ Chí Minh',
        },
        {
            imageUrl: 'https://picsum.photos/200',
            heading: 'Laptop MSI Mordern 15',
            price: 15990000,
            zone: 'TP Hồ Chí Minh',
        },
        {
            imageUrl: 'https://picsum.photos/200',
            heading: 'Laptop MSI Mordern 15',
            price: 15990000,
            zone: 'TP Hồ Chí Minh',
        },
        {
            imageUrl: 'https://picsum.photos/200',
            heading: 'Laptop MSI Mordern 15',
            price: 15990000,
            zone: 'TP Hồ Chí Minh',
        },
    ];
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch((prev) => ({ ...prev, query: e.target.value, isSearching: !!e.target.value }));
    }

    function handleSearch(e: any, type: 'click' | 'enter') {
        if (e.key === 'Enter' || type === 'click') {
            setSearchParams({ q: search.query });
            navigate(`/search?q=${search.query}`);
            setSearch((prev) => ({ ...prev, query: '', isSearching: false }));
        }
    }
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
                <div className='search ml-4 flex h-10 w-[60%] rounded border bg-white ring-slate-100 focus-within:ring-2 sm:w-[80%] md:w-[35%] lg:w-[45%]'>
                    <div className='relative w-full '>
                        <input
                            className='font-italic h-full w-full rounded-sm pl-2 font-sf text-base text-placeholder outline-none placeholder:text-placeholder '
                            placeholder='Bạn cần tìm gì?'
                            onFocus={() => setSearch((prev) => ({ ...prev, isSearching: !!prev.query }))}
                            onBlur={() => setSearch((prev) => ({ ...prev, isSearching: false }))}
                            onChange={(e) => handleChange(e)}
                            onKeyDown={(e) => handleSearch(e, 'enter')}
                            value={search.query}
                        />
                        {!!search.isSearching && (
                            <div className='absolute top-11 z-20 max-h-[500px] w-[calc(100%+16px+24px)] overflow-auto rounded-sm bg-white py-2 shadow-overflow'>
                                {searchResult.map((item) => (
                                    <>
                                        <div className='  flex cursor-pointer items-center justify-between gap-2 hover:bg-gray-100'>
                                            <div className='ml-2'>
                                                <h3 className='line-clamp-1'>{item.heading}</h3>
                                                <p>
                                                    <span className='price mr-2 '>{numberWithCommas(item.price)} </span>
                                                    • <span className='ml-2'>{item.zone}</span>
                                                </p>
                                            </div>
                                            <div className='mr-2 p-2'>
                                                <img src={item.imageUrl} alt='' className='h-16 w-16 object-cover' />
                                            </div>
                                        </div>
                                        <div className='divider m-0 ml-2 h-0 w-[calc(100%-24px)] text-center after:h-[1px]'></div>
                                    </>
                                ))}
                            </div>
                        )}
                    </div>
                    <div
                        className='flex  cursor-pointer items-center justify-center p-3 hover:bg-gray-100'
                        onClick={(e) => handleSearch(e, 'click')}
                    >
                        <img src={Icons.search} alt='search' className='h-4 w-4' />
                    </div>
                </div>
                <div className='actions ml-3 flex w-auto align-bottom'>
                    <div className='flex items-center justify-between gap-2 '>
                        {listActions.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
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
                                                    <div>{cartItems.length} sản phẩm</div>
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
        </header>
    );
};
export default Header;
