import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faList,
   faSearch,
   faPhone,
   faMapMarked,
   faHistory,
   faShoppingCart,
   faUser,
} from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
   return (
      <header className=' sticky m-auto flex h-[74px]  w-[1200px] items-center justify-between text-white'>
         {/* Logo and navigation links go here */}
         <div>
            {/* <span>d</span> */}
            <img
               className='w-[140px] cursor-pointer	'
               src='https://file.hstatic.net/200000636033/file/logo_fd11946b31524fbe98765f34f3de0628.svg'
               alt='Your Logo'
            />
         </div>
         <div className='flex h-[42px] cursor-pointer	'>
            <div className='flex items-center px-[12px] text-[18px]'>
               <FontAwesomeIcon icon={faList} />
            </div>
            <div className='leading-[42px]'>
               <div>Danh mục</div>
            </div>
         </div>
         <div className='relative flex w-[340px] '>
            <div>
               <input
                  className='h-[42px] w-[340px]	rounded pl-[15px] text-base text-[black] outline-none	'
                  type='text'
                  placeholder='Bạn cần tìm gì?'
                  required
               />
            </div>
            <button className='absolute  right-[10px] h-[42px] text-[#9ca3af]'>
               <FontAwesomeIcon icon={faSearch} />
            </button>
         </div>
         {/* Search bar and user account go here */}
         <div className='flex h-[42px] cursor-pointer	'>
            <div className='flex items-center px-[12px] text-[18px]'>
               <FontAwesomeIcon icon={faPhone} />
            </div>
            <div className='leading-[21px]'>
               <div>Hotline</div>
               <span>123-456-789</span>
            </div>
         </div>

         <div className='flex h-[42px] cursor-pointer	'>
            <div className='flex items-center px-[12px] text-[18px]'>
               <FontAwesomeIcon icon={faMapMarked} />
            </div>
            <div className='leading-[21px]'>
               <div>Hệ thống</div>
               <span>showroom</span>
            </div>
         </div>

         <div className='flex h-[42px] cursor-pointer	'>
            <div className='flex items-center px-[12px] text-[18px]'>
               <FontAwesomeIcon icon={faHistory} />
            </div>
            <div className='leading-[21px]'>
               <div>Tra cứu</div>
               <span>đơn hàng</span>
            </div>
         </div>

         <div className='flex h-[42px] cursor-pointer	'>
            <div className='relative flex items-center px-[12px] text-[18px]'>
               <FontAwesomeIcon icon={faShoppingCart} />
               <span className='absolute right-[2px] top-[2px] h-[16px] w-[16px] rounded-[50%] border-2 border-solid border-white bg-[#FDD835] text-center text-[12px] font-[600] leading-[12px] text-[black] '>
                  <span>0</span>
               </span>
            </div>
            <div className='leading-[21px]'>
               <div>Giỏ</div>
               <span>hàng</span>
            </div>
         </div>

         <div className='flex h-[42px] cursor-pointer	'>
            <div className='flex items-center px-[12px] text-[18px]'>
               <FontAwesomeIcon icon={faUser} />
            </div>
            <div className='leading-[42px]'>
               <div>Log In</div>
            </div>
         </div>
      </header>
   );
};

export default Header;
