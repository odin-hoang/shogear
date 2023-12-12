import React from 'react';
// Written by Dat
const Footer: React.FC = () => {
    return (
        <footer>
            <div className='pt-[32px]'>
                <div className='ml-auto mr-auto max-w-[1220px] px-[10px]'>
                    <div className='flex'>
                        <div className='w-1/6'>
                            <div className='pb-[12px]'>
                                <div className=''>
                                    <h4 className='mb-[10px] text-[14px] font-[600] uppercase leading-[22px]'>
                                        Về Shogear{' '}
                                    </h4>
                                </div>
                                <div>
                                    <ul className='mb-[10px] text-[14px]'>
                                        <li className='pb-[8px] hover:cursor-pointer hover:text-red-500 hover:underline'>
                                            Giới thiệu
                                        </li>
                                        <li className='pb-[8px] hover:cursor-pointer hover:text-red-500 hover:underline'>
                                            Tuyển dụng
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='w-1/6'>
                            <div className='pb-[12px]'>
                                <div className=''>
                                    <h4 className='mb-[10px] text-[14px] font-[600] uppercase leading-[22px]'>
                                        Chính sách{' '}
                                    </h4>
                                </div>
                                <div>
                                    <ul className='mb-[10px] text-[14px]'>
                                        <li className='pb-[8px] hover:cursor-pointer hover:text-red-500 hover:underline'>
                                            Chính sách bảo hành
                                        </li>
                                        <li className='pb-[8px] hover:cursor-pointer hover:text-red-500 hover:underline'>
                                            Chính sách thanh toán
                                        </li>
                                        <li className='pb-[8px] hover:cursor-pointer hover:text-red-500 hover:underline'>
                                            Chính sách giao hàng
                                        </li>
                                        <li className='pb-[8px] hover:cursor-pointer hover:text-red-500 hover:underline'>
                                            Chính sách bảo mật
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='w-1/6'>
                            <div className='pb-[12px]'>
                                <div className=''>
                                    <h4 className='mb-[10px] text-[14px] font-[600] uppercase leading-[22px]'>
                                        Thông tin{' '}
                                    </h4>
                                </div>
                                <div>
                                    <ul className='mb-[10px] text-[14px]'>
                                        <li className='pb-[8px] hover:cursor-pointer hover:text-red-500 hover:underline'>
                                            Hệ thống cửa hàng
                                        </li>
                                        <li className='pb-[8px] hover:cursor-pointer hover:text-red-500 hover:underline'>
                                            Trung tâm bảo hành
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='w-1/4'>
                            <div className='pb-[12px]'>
                                <div className=''>
                                    <h4 className='mb-[10px] text-[14px] font-[600] uppercase leading-[22px]'>
                                        TỔNG ĐÀI HỖ TRỢ <span>(Miễn phí gọi)</span>
                                    </h4>
                                </div>
                                <div className='mt-[-3px]'>
                                    <p>
                                        <span className='inline-block w-[70px] pr-[5px] text-[14px]'>Gọi mua: </span>
                                        <a href='' className='text-[14px] font-[600] text-[#1982F9]'>
                                            1800.6975 <span className='text-[black]'> (8:00 - 21:00) </span>
                                        </a>
                                    </p>
                                    <p>
                                        <span className='inline-block w-[70px] pr-[5px] text-[14px]'>CSKH: </span>
                                        <a href='' className='text-[14px] font-[600] text-[#1982F9]'>
                                            1800.6173 <span className='text-[black]'> (8:00 - 21:00) </span>
                                        </a>
                                    </p>
                                    <p>
                                        <span className='inline-block w-[70px] pr-[5px] text-[14px]'>Email: </span>
                                        <a href='' className='text-[14px] font-[600] text-[#1982F9]'>
                                            cskh@shogear.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='w-1/4'>
                            <div className='pb-[12px]'>
                                <div>
                                    <h4 className='mb-[10px] text-[14px] font-[600] uppercase leading-[22px]'>
                                        Đơn vị vận chuyển
                                    </h4>
                                </div>

                                <div>
                                    <ul className='mb-[10px] flex text-[14px]'>
                                        <li>
                                            <img
                                                src='https://theme.hstatic.net/200000722513/1001090675/14/ship_1.png?v=1786'
                                                alt=''
                                            />
                                        </li>
                                        <li>
                                            <img
                                                src='https://theme.hstatic.net/200000722513/1001090675/14/ship_2.png?v=1786'
                                                alt=''
                                            />
                                        </li>
                                        <li>
                                            <img
                                                src='https://theme.hstatic.net/200000722513/1001090675/14/ship_3.png?v=1786'
                                                alt=''
                                            />
                                        </li>
                                        <li>
                                            <img
                                                src='	https://theme.hstatic.net/200000722513/1001090675/14/ship_4.png?v=1786'
                                                alt=''
                                            />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='pb-[12px]'>
                                <div>
                                    <h4 className='mb-[16px] text-[14px] font-[600] uppercase leading-[22px]'>
                                        Cách thức thanh toán
                                    </h4>
                                </div>

                                <div>
                                    <ul className='mb-[10px] flex text-[14px]'>
                                        <li>
                                            <img
                                                src='https://theme.hstatic.net/200000722513/1001090675/14/pay_3.png?v=1786'
                                                alt=''
                                            />
                                        </li>
                                        <li>
                                            <img
                                                src='https://theme.hstatic.net/200000722513/1001090675/14/pay_2.png?v=1786'
                                                alt=''
                                            />
                                        </li>
                                        <li>
                                            <img
                                                src='https://theme.hstatic.net/200000722513/1001090675/14/pay_4.png?v=1786'
                                                alt=''
                                            />
                                        </li>
                                        <li>
                                            <img
                                                src='https://theme.hstatic.net/200000722513/1001090675/14/pay_8.png?v=1786'
                                                alt=''
                                            />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
