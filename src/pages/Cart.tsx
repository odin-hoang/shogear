import { Link } from 'react-router-dom';
import bgImage from '../assets/images/page-cart-bg.jpg';

const Cart = () => {
    return (
        <div className='bg-white px-6 py-6'>
            <div className='bg-cover bg-center p-0' style={{ backgroundImage: `url(${bgImage})` }}>
                <h1 className='py-[3rem] text-center text-[4rem]'>Shopping Cart</h1>
            </div>
            <nav className='mb-16 border-b border-solid border-gray-300 border-opacity-50 bg-white'>
                <div className='w-[1188px] max-w-[1200px] px-[10px] py-[1.4rem]'>
                    <ol className='m-0 flex rounded-none bg-transparent p-0'>
                        <li className='breadcrumb-item text-[#777]'>
                            <Link to='/'>Home</Link>
                            <span className='mx-2'> / </span>
                        </li>
                        <li className=' breadcrumb-item '>Shopping Cart</li>
                    </ol>
                </div>
            </nav>
            <div className='bg-white'>Product</div>
        </div>
    );
};

export default Cart;
