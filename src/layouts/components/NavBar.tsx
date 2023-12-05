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
        <div className=' hidden flex-row justify-between whitespace-nowrap px-40 py-2 text-xs font-bold lg:flex'>
            {navLinks.map((navLink, index) => (
                <React.Fragment key={index}>
                    <NavLink
                        to={navLink.navigate}
                        className='group flex items-center gap-2 hover:text-primary-default'
                        key={index}
                    >
                        {navLink.icon}
                        <span>{navLink.title}</span>
                    </NavLink>
                    <div className='divider divider-horizontal last:hidden'></div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default NavBar;
