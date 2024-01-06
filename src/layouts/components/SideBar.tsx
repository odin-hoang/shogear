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
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils/cn';
import { useAppDispatch } from '../../app/hook';
import { active, inactive } from '../../features/blur/blur-slice';
import apiRequest from '../../services/request';
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
    const dispatch = useAppDispatch();
    const [activeIndex, setActiveIndex] = useState(-1);
    function handleMouseEnterItem(index: number) {
        setActiveIndex(index);
        dispatch(active());
    }
    function handleMouseLeaveList() {
        setActiveIndex(-1);
        dispatch(inactive());
    }
    useEffect(() => {
        apiRequest.get('/categories').then((response) => {
            console.log(response.data);
        });
    }, []);
    return (
        <div
            className='relative z-20 hidden  shrink-0 rounded-md bg-white md:hidden lg:hidden xl:block '
            onMouseLeave={handleMouseLeaveList}
        >
            <ul className='flex flex-col font-sf text-xs'>
                {navLinks.map((link, index) => (
                    <Link
                        to={link.url}
                        className={cn(
                            'before:active-menu relative flex items-center justify-between py-[7px] pl-4 pr-2  ',
                            !(index === activeIndex) && ' before:content-none',
                            index === activeIndex && ' bg-side-default text-white',
                        )}
                        key={index}
                        onMouseEnter={() => handleMouseEnterItem(index)}
                    >
                        <div className={cn('flex items-center gap-2')}>
                            <span className='h-4 w-5'>{link.icon}</span>
                            {link.label}
                        </div>
                        <span className='ml-2'>
                            <FaAngleRight />
                        </span>
                    </Link>
                ))}
            </ul>
            {/* I will change the width later */}
            <div className='absolute left-[100%] top-0 z-20  w-[calc(1200px-14rem)] pl-2 text-xs'>
                <div className='h-full  w-full rounded-md bg-white'>
                    {navLinks.map(
                        (link, index) =>
                            !!(index === activeIndex) && (
                                <div key={index} className='flex min-h-[270px] gap-20 px-4 py-4'>
                                    {link.children.map((child, index) => (
                                        <div className='flex flex-col gap-3 whitespace-nowrap' key={index}>
                                            <Link to={child.url} className=' font-bold text-primary-default'>
                                                {child.label}
                                            </Link>
                                            <ul className='flex flex-col justify-start gap-3'>
                                                {child.children.map((ch, index) => (
                                                    <Link
                                                        to={ch.url}
                                                        key={index}
                                                        className='hover:text-primary-default'
                                                    >
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
