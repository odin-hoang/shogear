import { useLocation } from 'react-router-dom';
interface ProductItem {
    imageUrl: string;
    username: string;
    price: number;
    postedAt: string;
    zone: string;
    name: string;
    isUsed: boolean;
}
const ProductDetail = () => {
    const { state } = useLocation();
    const product: ProductItem = state.item;
    return (
        <div className='mx-auto max-w-[1200px]'>
            <div className=' breadcrumbs -mt-6'>
                <ul>
                    <li>
                        <a>Home</a>
                    </li>
                    <li>
                        <a>Documents</a>
                    </li>
                    <li>Add Document</li>
                </ul>
            </div>
            <div className=' rounded-md bg-white'>
                <img src={product.imageUrl} alt='' />
            </div>
        </div>
    );
};

export default ProductDetail;
