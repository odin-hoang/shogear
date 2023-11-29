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
        },
    ];
    return (
        <div className='flex bg-primary-default p-3'>
            <div className='my-auto text-white '>
                <FaBars className='h-6 w-6' />
            </div>
            <div className='logo my-auto ml-4'>
                <img
                    src='https://file.hstatic.net/200000636033/file/logo-mobile_1e5b7fc485b24cf985b3d63cfa1f88be.svg'
                    className=' w-[40px]'
                ></img>
            </div>
            <div className='search ml-4 flex h-10 w-1/2 rounded border bg-white'>
                <input
                    className='font-italic w-full pl-2 font-sf text-sm text-placeholder outline-none placeholder:text-placeholder'
                    placeholder='Bạn cần tìm gì?'
                ></input>
                <span></span>
            </div>
            <div className='actions  flex w-auto align-bottom'>
                <div className='flex items-center justify-between gap-2'>
                    {listActions.map((item, index) => {
                        return <Action name1={item.name1} name2={item.name2} icon={item.icon} key={index} />;
                    })}
                </div>
                <div className='shopcart my-auto ml-4 flex h-10 w-auto items-center justify-center gap-2 rounded bg-primary-900 p-2 '>
                    <div className='shrink-0'>
                        <img src={Icons.user} className='mx-auto my-auto h-[36px] w-[18px]' />
                    </div>
                    <p className='hidden  w-full flex-col font-sf text-xs  font-semibold text-white lg:block'>
                        Đăng <br />
                        nhập
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Header;
