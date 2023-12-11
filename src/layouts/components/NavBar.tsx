import { NavLink } from 'react-router-dom';
import React from 'react';
import { DealIcon, NewsIcon, VideoIcon, PaymentIcon, EarnIcon, WarrantyIcon } from '../../components/Icons';
const NavBar = () => {
    const navLinks = [
        {
            title: 'Deal sốc mỗi ngày',
            navigate: '',
            icon: <DealIcon />,
        },
        {
            title: 'Tin công nghệ ',
            navigate: '',
            icon: <NewsIcon />,
        },
        {
            title: 'Video',
            navigate: '',
            icon: <VideoIcon />,
        },
        {
            title: 'Hướng dẫn thanh toán',
            navigate: '',
            icon: <PaymentIcon />,
        },
        {
            title: 'Hướng dẫn trả góp ',
            navigate: '',
            icon: <EarnIcon />,
        },
        {
            title: 'Chính sách bảo hành',
            navigate: '',
            icon: <WarrantyIcon />,
        },
    ];

    return (
        <div className=' hidden justify-between py-2 font-bold lg:flex lg:px-20 xl:px-40  '>
            {navLinks.map((navLink, index) => (
                <React.Fragment key={index}>
                    <NavLink
                        to={navLink.navigate}
                        className='group flex items-center gap-2 hover:text-primary-default'
                        key={index}
                    >
                        {navLink.icon}
                        <span className='text-[0.5rem] xl:text-xs'>{navLink.title}</span>
                    </NavLink>
                    <div className='divider divider-horizontal last:hidden'></div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default NavBar;
