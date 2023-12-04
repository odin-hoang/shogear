import {
    AccessoryIcon,
    AppleIcon,
    HeadphoneIcon,
    KeyboardIcon,
    LaptopGamingIcon,
    LaptopIcon,
    MonitorIcon,
    MouseIcon,
    RamIcon,
} from '../../components/Icons';
import { FaAngleRight } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const SideBar = () => {
    const navLinks = [
        {
            label: 'Laptop',
            icon: <LaptopIcon />,
            url: '/',
            children: [
                {
                    label: 'Thương hiệu',
                    url: '',
                    children: [
                        { label: 'ASUS', url: '/' },
                        { label: 'ACER', url: '/' },
                        { label: 'MSI', url: '/' },
                        { label: 'LENOVO', url: '/' },
                        { label: 'DELL', url: '/' },
                        { label: 'HP', url: '/' },
                        { label: 'LG Gram', url: '/' },
                    ],
                },
                {
                    label: 'Giá bán',
                    url: '',
                    children: [
                        { label: 'Dưới 15 triệu', url: '/' },
                        { label: 'Từ 15 đến 20 triệu', url: '/' },
                        { label: 'Trên 20 triệu', url: '/' },
                    ],
                },
            ],
        },
        {
            label: 'Laptop Gaming',
            url: '/',
            icon: <LaptopGamingIcon />,
            children: [
                {
                    label: 'Thương hiệu',
                    url: '',
                    children: [
                        { label: 'ASUS', url: '/' },
                        { label: 'ACER', url: '/' },
                        { label: 'MSI', url: '/' },
                        { label: 'LENOVO', url: '/' },
                        { label: 'DELL', url: '/' },
                        { label: 'HP', url: '/' },
                        { label: 'LG Gram', url: '/' },
                    ],
                },
                {
                    label: 'Giá bán',
                    url: '',
                    children: [{ label: 'Dưới 20 triệu', url: '/' }],
                },
            ],
        },
        {
            label: 'Ổ cứng, RAM, Thẻ nhớ',
            url: '/',
            icon: <RamIcon />,
            children: [
                {
                    label: 'Dung lượng RAM',
                    url: '',
                    children: [
                        { label: '8 GB', url: '/' },
                        { label: '16 GB', url: '/' },
                        { label: '32 GB', url: '/' },
                        { label: '64 GB', url: '/' },
                        { label: 'Xem tất cả', url: '/' },
                    ],
                },
                {
                    label: 'Loại RAM',
                    url: '',
                    children: [
                        { label: 'DDR4', url: '/' },
                        { label: 'DDR5', url: '/' },
                        { label: 'Xem tất cả', url: '/' },
                    ],
                },
            ],
        },
        {
            label: 'Apple',
            url: '/',
            icon: <AppleIcon />,
            children: [
                {
                    label: 'Dung lượng RAM',
                    url: '',
                    children: [
                        { label: '8 GB', url: '/' },
                        { label: '16 GB', url: '/' },
                        { label: '32 GB', url: '/' },
                        { label: '64 GB', url: '/' },
                        { label: 'Xem tất cả', url: '/' },
                    ],
                },
                {
                    label: 'Loại RAM',
                    url: '',
                    children: [
                        { label: 'DDR4', url: '/' },
                        { label: 'DDR5', url: '/' },
                        { label: 'Xem tất cả', url: '/' },
                    ],
                },
            ],
        },
        {
            label: 'Màn hình',
            url: '/',
            icon: <MonitorIcon />,
            children: [
                {
                    label: 'Dung lượng RAM',
                    url: '',
                    children: [
                        { label: '8 GB', url: '/' },
                        { label: '16 GB', url: '/' },
                        { label: '32 GB', url: '/' },
                        { label: '64 GB', url: '/' },
                        { label: 'Xem tất cả', url: '/' },
                    ],
                },
                {
                    label: 'Loại RAM',
                    url: '',
                    children: [
                        { label: 'DDR4', url: '/' },
                        { label: 'DDR5', url: '/' },
                        { label: 'Xem tất cả', url: '/' },
                    ],
                },
            ],
        },
        {
            label: 'Bàn phím',
            url: '/',
            icon: <KeyboardIcon />,
            children: [
                {
                    label: 'Dung lượng RAM',
                    url: '',
                    children: [
                        { label: '8 GB', url: '/' },
                        { label: '16 GB', url: '/' },
                        { label: '32 GB', url: '/' },
                        { label: '64 GB', url: '/' },
                        { label: 'Xem tất cả', url: '/' },
                    ],
                },
                {
                    label: 'Loại RAM',
                    url: '',
                    children: [
                        { label: 'DDR4', url: '/' },
                        { label: 'DDR5', url: '/' },
                        { label: 'Xem tất cả', url: '/' },
                    ],
                },
            ],
        },
        {
            label: 'Chuột + Lót chuột',
            url: '/',
            icon: <MouseIcon />,
            children: [
                {
                    label: 'Dung lượng RAM',
                    url: '',
                    children: [
                        { label: '8 GB', url: '/' },
                        { label: '16 GB', url: '/' },
                        { label: '32 GB', url: '/' },
                        { label: '64 GB', url: '/' },
                        { label: 'Xem tất cả', url: '/' },
                    ],
                },
                {
                    label: 'Loại RAM',
                    url: '',
                    children: [
                        { label: 'DDR4', url: '/' },
                        { label: 'DDR5', url: '/' },
                        { label: 'Xem tất cả', url: '/' },
                    ],
                },
            ],
        },
        {
            label: 'Tai nghe - Loa',
            url: '/',
            icon: <HeadphoneIcon />,
            children: [
                {
                    label: 'Dung lượng RAM',
                    url: '',
                    children: [
                        { label: '8 GB', url: '/' },
                        { label: '16 GB', url: '/' },
                        { label: '32 GB', url: '/' },
                        { label: '64 GB', url: '/' },
                        { label: 'Xem tất cả', url: '/' },
                    ],
                },
                {
                    label: 'Loại RAM',
                    url: '',
                    children: [
                        { label: 'DDR4', url: '/' },
                        { label: 'DDR5', url: '/' },
                        { label: 'Xem tất cả', url: '/' },
                    ],
                },
            ],
        },
        {
            label: 'Phụ kiện',
            url: '/',
            icon: <AccessoryIcon />,
            children: [
                {
                    label: 'Dung lượng RAM',
                    url: '',
                    children: [
                        { label: '8 GB', url: '/' },
                        { label: '16 GB', url: '/' },
                        { label: '32 GB', url: '/' },
                        { label: '64 GB', url: '/' },
                        { label: 'Xem tất cả', url: '/' },
                    ],
                },
                {
                    label: 'Loại RAM',
                    url: '',
                    children: [
                        { label: 'DDR4', url: '/' },
                        { label: 'DDR5', url: '/' },
                        { label: 'Xem tất cả', url: '/' },
                    ],
                },
            ],
        },
    ];
    const [activeIndex, setActiveIndex] = useState(-1);
    function handleMouseEnterItem(index: number) {
        setActiveIndex(index);
    }
    function handleMouseLeaveList() {
        setActiveIndex(-1);
    }
    function handleMouseEnterList() {
        setActiveIndex(0);
    }
    return (
        <div
            className='relative  w-56 rounded-md bg-white px-4 py-2'
            onMouseLeave={handleMouseLeaveList}
            onMouseEnter={handleMouseEnterList}
        >
            <ul className='flex flex-col gap-3 font-sf text-xs'>
                {navLinks.map((link, index) => (
                    <Link
                        to={link.url}
                        className='flex  items-center justify-between '
                        key={index}
                        onMouseEnter={() => handleMouseEnterItem(index)}
                    >
                        <div className='flex items-center gap-3'>
                            <span className='w-5'>{link.icon}</span>
                            {link.label}
                        </div>
                        <FaAngleRight />
                    </Link>
                ))}
            </ul>
            {/* I will change the width later */}
            <div className='absolute left-[100%] top-0 w-[calc(1200px-14rem)]  pl-2 text-xs'>
                <div className='h-full w-full   rounded-md bg-white'>
                    {navLinks.map(
                        (link, index) =>
                            !!(index === activeIndex) && (
                                <div key={index} className='flex gap-20 px-4 py-4'>
                                    {link.children.map((child, index) => (
                                        <div className='flex flex-col gap-3 whitespace-nowrap' key={index}>
                                            <Link to={child.url} className=' font-bold text-primary-default'>
                                                {child.label}
                                            </Link>
                                            <ul className='flex flex-col justify-start gap-3'>
                                                {child.children.map((ch, index) => (
                                                    <Link to={ch.url} key={index}>
                                                        {ch.label}
                                                    </Link>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            ),
                    )}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
