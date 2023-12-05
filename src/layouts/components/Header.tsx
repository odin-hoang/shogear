import { FaBars } from 'react-icons/fa';
import Icons from '../../assets/icons';
import Action from './Action';

const Header = () => {
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
            count: 0,
        },
        // {
        //     icon: Icons.user,
        //     name1: 'Đăng',
        //     name2: 'nhập',
        // },
    ];
    return (
        <div className='bg-primary-default'>
            <div className='header mx-auto  flex p-3'>
                <div className='my-auto text-white '>
                    <FaBars className='h-6 w-6' />
                </div>
                <div className='logo my-auto ml-4'>
                    <img
                        src='https://file.hstatic.net/200000636033/file/logo-mobile_1e5b7fc485b24cf985b3d63cfa1f88be.svg'
                        className='w-[40px]'
                    ></img>
                </div>
                <div className='search position-relative ml-4 flex h-10 w-1/2 flex-auto rounded border bg-white'>
                    <input
                        className='font-italic w-full pl-2 font-sf text-sm text-placeholder outline-none placeholder:text-placeholder'
                        placeholder='Bạn cần tìm gì?'
                    ></input>
                    {/* <span className='position-relative'> */}
                    <img src={Icons.search} alt='search' className='mx-3 h-full w-[16px]' />
                </div>
                <div className='actions ml-3 flex w-auto justify-between align-bottom'>
                    <div className='hidden flex-grow items-center gap-2 md:flex'>
                        {listActions.map((item, index) => (
                            <Action
                                name1={item.name1}
                                name2={item.name2}
                                icon={item.icon}
                                key={index}
                                count={item.count}
                            />
                        ))}
                    </div>
                </div>
                <div className='my-auto flex h-10 w-auto items-center justify-center gap-2 rounded bg-primary-900 p-2 sm:ml-4'>
                    <div className='shrink-0'>
                        <img src={Icons.user} className='mx-auto my-auto h-[36px] w-[18px]' alt='user icon' />
                    </div>
                    <p className='w-full flex-col font-sf text-xs font-semibold text-white'>
                        Đăng <br />
                        nhập
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Header;
