import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faTag,
   faNewspaper,
   faCreditCard,
   faCoins,
   faShield,
   faAngleLeft,
   faShoppingBag,
   faAddressCard,
   faTrash,
   faMinus,
   faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';

import { updateQuantity } from '../../features/cart/cartSlice';
import { increaseQuantity, decreaseQuantity } from '../../features/priceTotal/priceTotalSlice';

const Body: React.FC = () => {
   const itemQuantity = useSelector((state: RootState) => state.pricetotal.quantity);
   const totalPrice = useSelector((state: RootState) => state.pricetotal.total);

   const dispatch = useDispatch();

   const handleInCreaseItemQuantity = () => {
      dispatch(increaseQuantity());
   };
   const handleDecreaseItemQuantity = () => {
      dispatch(decreaseQuantity());
   };
   const handleAddToCartClick = () => {
      dispatch(updateQuantity(itemQuantity));
   };

   const formattedTotal = totalPrice.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
   });
   const formattedTotalWithoutSpace = formattedTotal.replace(/\s/g, '');

   return (
      <main className='mt-[74px]'>
         <div className='body-item  border-b-[1px]'>
            <ul className='list-submenu m-auto flex  h-[40px] w-[1200px] items-center justify-between '>
               <li className='item-submenu inline-block h-[100%] leading-[40px]'>
                  <a href='' className='relative px-[22px] py-[10px] hover:text-red-600'>
                     <span className='mr-[10px]'>
                        <FontAwesomeIcon icon={faTag} />
                     </span>
                     <span className='font-[600]'>Tổng hợp khuyến mãi</span>
                     <span className='absolute bottom-0 right-0 top-[20%] m-0 h-[60%] w-[1px] bg-[#CFCFCF]'></span>
                  </a>
               </li>
               <li className='item-submenu inline-block h-[100%] leading-[40px]'>
                  <a href='' className='relative px-[22px] py-[10px] hover:text-red-600'>
                     <span className='mr-[10px]'>
                        <FontAwesomeIcon icon={faNewspaper} />
                     </span>
                     <span className='font-[600]'>Tin công nghệ</span>
                     <span className='absolute bottom-0 right-0 top-[20%] m-0 h-[60%] w-[1px] bg-[#CFCFCF]'></span>
                  </a>
               </li>
               <li className='item-submenu inline-block h-[100%] leading-[40px]'>
                  <a href='' className='relative px-[22px] py-[10px] hover:text-red-600'>
                     <span className='mr-[10px]'>
                        <FontAwesomeIcon icon={faYoutube} />
                     </span>
                     <span className='font-[600]'>Video</span>
                     <span className='absolute bottom-0 right-0 top-[20%] m-0 h-[60%] w-[1px] bg-[#CFCFCF]'></span>
                  </a>
               </li>
               <li className='item-submenu inline-block h-[100%] leading-[40px]'>
                  <a href='' className='relative px-[22px] py-[10px] hover:text-red-600'>
                     <span className='mr-[10px]'>
                        <FontAwesomeIcon icon={faCreditCard} />
                     </span>
                     <span className='font-[600]'>Hướng dẫn thanh toán</span>
                     <span className='absolute bottom-0 right-0 top-[20%] m-0 h-[60%] w-[1px] bg-[#CFCFCF]'></span>
                  </a>
               </li>
               <li className='item-submenu inline-block h-[100%] leading-[40px]'>
                  <a href='' className='relative px-[22px] py-[10px] hover:text-red-600'>
                     <span className='mr-[10px]'>
                        <FontAwesomeIcon icon={faCoins} />
                     </span>
                     <span className='font-[600]'>Hướng dẫn trả góp</span>
                     <span className='absolute bottom-0 right-0 top-[20%] m-0 h-[60%] w-[1px] bg-[#CFCFCF]'></span>
                  </a>
               </li>
               <li className='item-submenu inline-block h-[100%] leading-[40px]'>
                  <a href='' className='relative px-[22px] py-[10px] hover:text-red-600'>
                     <span className='mr-[10px]'>
                        <FontAwesomeIcon icon={faShield} />
                     </span>
                     <span className='font-[600]'>Chính sách bảo hành</span>
                     {/* <span className='absolute bottom-0 right-0 top-[20%] m-0 h-[60%] w-[1px] bg-[#CFCFCF]'></span> */}
                  </a>
               </li>
            </ul>
         </div>
         <div className='body-container bg-[#ECECEC] pb-[24px]'>
            <div className='bg-[#ECECEC]'>
               <div className='m-auto w-[600px] '>
                  <div className='p-[16px]'>
                     <div className='font-[400] text-[blue] '>
                        <a href='' className='flex items-center'>
                           <span className='mr-[5px] h-[23px]'>
                              <FontAwesomeIcon icon={faAngleLeft} />
                           </span>
                           Mua thêm sản phẩm khác
                        </a>
                     </div>
                  </div>
               </div>
               <div className='m-auto w-[600px] rounded-[3px] bg-[white]'>
                  <div className=''>
                     <section className='body-route h-[108px] w-[600px] rounded-[3px] p-[8px]'>
                        <div className=' relative flex h-[92px]	 w-[584px] justify-center rounded-[3px] bg-[#FFEDED] px-[14px] pb-[16px] pt-[20px]'>
                           <div className='relative flex flex-grow flex-col items-center'>
                              <div className='flex items-center justify-center rounded-[100%] border-[1px] border-[#535353] p-[7px]'>
                                 <FontAwesomeIcon icon={faShoppingBag} />
                              </div>
                              <div>Giỏ hàng</div>
                              {/* <span className='absolute right-[-50%] top-[25%] z-0 w-[100%] border-t-[1px] border-dashed border-[#535353] '></span> */}
                           </div>
                           <div className='relative flex flex-grow flex-col items-center'>
                              <div className='flex items-center justify-center rounded-[100%] border-[1px] border-[#535353] p-[7px]'>
                                 <FontAwesomeIcon icon={faAddressCard} />
                              </div>
                              <div>Thông tin đặt hàng</div>
                              {/* <span className='t-[25%] r-[-65%] absolute w-[102%] border-t-[1px] border-dashed border-[#535353] '></span> */}
                           </div>
                           <div className='relative flex flex-grow flex-col items-center'>
                              <div className='flex items-center justify-center rounded-[100%] border-[1px] border-[#535353] p-[7px]'>
                                 <FontAwesomeIcon icon={faCreditCard} />
                              </div>
                              <div>Thanh toán</div>
                              {/* <span className='t-[25%] r-[-65%] absolute w-[102%] border-t-[1px] border-dashed border-[#535353] '></span> */}
                           </div>
                           <div className='relative flex flex-grow flex-col items-center'>
                              <div className='flex items-center justify-center rounded-[100%] border-[1px] border-[#535353] p-[7px]'>
                                 <FontAwesomeIcon icon={faShield} />
                              </div>
                              <div>Hoàn tất</div>
                           </div>
                           <span className='absolute  top-[40%] w-[410px] overflow-hidden border-t-[1px] border-dashed border-[#535353]'></span>
                        </div>
                     </section>
                     <section className='body-product p-[24px]'>
                        <div className='product-info flex'>
                           <div className='left-product'>
                              <div className='relative h-[90px] w-[90px] border border-[#ECECEC] text-center '>
                                 <a href=''>
                                    <img
                                       src='https://product.hstatic.net/200000722513/product/lp520w_dfddfcf4a46d43e4b82391209328e195_large_7fa59a1a8ef14c37b78bc34161b45a87.png'
                                       alt=''
                                    />
                                 </a>
                              </div>
                              <div className='mt-[8px]  text-[#6D6E72]'>
                                 <div
                                    onClick={() => dispatch(updateQuantity(0))}
                                    className='flex h-[21px] items-center justify-center text-[14px] hover:cursor-pointer'
                                 >
                                    <FontAwesomeIcon icon={faTrash} className='mr-[8px]' />{' '}
                                    <span className=' hover:text-red-500'>Xoá</span>
                                 </div>
                              </div>
                           </div>
                           <div className='right-product ml-[8px] flex w-[100%]'>
                              <div className='product-name w-[70%] pr-[20px]'>
                                 <a href=''>
                                    <h3 className='mb-[8px] font-[600] leading-[1.2]'>
                                       Laptop gaming ASUS TUF A15 FA507NU LP031W
                                    </h3>
                                 </a>
                                 <div className='mt-[8px]'>
                                    <h4 className='mb-[4px] text-[14px] font-[600] leading-[18px]'>
                                       Quà tặng khuyến mãi
                                    </h4>
                                    <ul className='mb-[4px] list-disc pl-[22px] text-[14px] text-[#6D6E72]'>
                                       <li className='list-disc leading-[18px]'>
                                          Tặng: Móc khóa Keycap GearVN Trị giá: 99.000₫
                                       </li>
                                    </ul>
                                 </div>
                              </div>
                              <div className='product-price flex w-[30%] flex-col'>
                                 <div className='mb-[16px] flex flex-col items-end'>
                                    <span className='text-[18px] font-[600] text-[#E30019]'>26.490.000₫</span>
                                    <del className='text-[14px] text-[#6D6E72]'>30.490.000₫</del>
                                 </div>
                                 <div className='ml-auto flex w-[114px] items-end justify-between'>
                                    <button
                                       onClick={handleDecreaseItemQuantity}
                                       className='decrease-button h-[32px] w-[32px] flex-grow justify-center rounded-bl-[4px] rounded-tl-[4px] border-[1px] border-solid border-[#CFCFCF] bg-[#fff] text-center'
                                    >
                                       <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                    <input
                                       className=' quantity-product rounded-0 h-[32px] w-[50px] flex-grow border-b-[1px] border-t-[1px] border-solid border-[#CFCFCF] bg-white px-0 text-center text-sm font-normal outline-none'
                                       type='text'
                                       min={1}
                                       readOnly
                                       data-price={264900000}
                                       data-quantity={itemQuantity}
                                       value={itemQuantity}
                                    />
                                    <button
                                       onClick={handleInCreaseItemQuantity}
                                       className='increase-button h-[32px] w-[32px] flex-grow justify-center rounded-br-[4px] rounded-tr-[4px] border-[1px] border-solid border-[#CFCFCF] bg-[#fff] text-center'
                                    >
                                       <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </section>
                     <hr className='ml-[24px] w-[552px] border-t-[1px] border-solid border-[#CFCFCF]' />
                     <section className='body-transport flex flex-col p-[24px]'>
                        <div className=' cost-transport item-center flex justify-between pb-[8px] font-[600]'>
                           <span className='text-[16px]'>Phí vận chuyển: </span>
                           <span className='text-[16px]'>Miễn phí</span>
                        </div>
                        <div className=' cost-total item-center mb-[24px] flex justify-between font-[600]'>
                           <span className='total-title text-[18px]'>Tổng tiền:</span>
                           <span className='total-price text-[24px] text-[#E30019]'>{formattedTotalWithoutSpace}</span>
                        </div>
                        <div className='h-[70px] rounded-[4px] bg-[#E30019] text-center'>
                           <button
                              className='order-product w-[100%] text-[18px] font-[600] leading-[72px] text-[white]'
                              onClick={handleAddToCartClick}
                           >
                              THÊM VÀO GIỎ HÀNG
                           </button>
                        </div>
                     </section>
                  </div>
               </div>
            </div>
         </div>
      </main>
   );
};

export default Body;
