import { Link, useLocation } from 'react-router-dom';
import ImageSlider from '../components/ImageSlider';
import { numberWithCommas } from '../lib/scripts';
import Button from '../components/Button';
import { FaRegClock } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { BsCartPlusFill } from 'react-icons/bs';
import { FaClockRotateLeft, FaLocationDot } from 'react-icons/fa6';
import { FireIcon } from '../components/Icons';
interface ProductItem {
    imageUrl: string;
    username: string;
    price: number;
    postedAt: string;
    zone: string;
    name: string;
    isUsed: boolean;
    description: string;
}
const ProductDetail = () => {
    const { state } = useLocation();
    const product: ProductItem = state.item;
    // TODO: Call api to get detail information of user and product
    const banners = [
        {
            alt: 'Vui lễ lớn giảm nhiều hơn',
            imageUrl:
                'https://product.hstatic.net/200000722513/product/zero_msi_-_3_7723ef0bfeaa45c88b40cc0216973eb8_grande.png',
            imageUrlMobile:
                'https://cdn.nhathuoclongchau.com.vn/unsafe/1080x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Banner_Web_Mobi640x320_e80f26f0ce.png',
        },
        {
            alt: 'Tiêm chủng vắc xin',
            imageUrl: `${product.imageUrl}`,
            imageUrlMobile:
                'https://cdn.nhathuoclongchau.com.vn/unsafe/1080x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/640x320_47f588ca90.jpg',
        },
        {
            alt: 'Brauer',
            imageUrl:
                'https://product.hstatic.net/200000722513/product/post-02_ff8d6f3df77a4932b65a0fbbfa1ddf39_grande.jpg',
            imageUrlMobile:
                'https://cdn.nhathuoclongchau.com.vn/unsafe/1080x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/M1_375x188_9f4cf0b250.png',
        },
        {
            alt: 'Vi chất dinh dưỡng từ Anh quốc',
            imageUrl:
                'https://product.hstatic.net/200000722513/product/post-03_bd47d3613e214d9e948b3b5c9eac515d_grande.jpg',
            imageUrlMobile:
                'https://cdn.nhathuoclongchau.com.vn/unsafe/1080x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Banner_Mobile_a947a6bbf0.jpg',
        },
        {
            alt: 'Tiêu hoá khoẻ dạ dày',
            imageUrl:
                'https://product.hstatic.net/200000722513/product/post-04_e10b4bd422824ee5a5dbbaaaae27a50f_grande.jpg',
            imageUrlMobile:
                'https://cdn.nhathuoclongchau.com.vn/unsafe/1080x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Banner_Web_Mobi_640x320_b409a3d39c.png',
        },
    ];
    return (
        <div className='mx-auto max-w-[1200px]'>
            <div className=' breadcrumbs -mt-6'>
                <ul>
                    <li>
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li>
                        <Link to={'/'}>Documents</Link>
                    </li>
                    <li>{product.name}</li>
                </ul>
            </div>
            {/* Main */}
            <div className=' rounded-md bg-white p-4'>
                <div className='flex gap-6'>
                    <div className='sticky top-2 h-min'>
                        <ImageSlider images={banners} />
                    </div>
                    {/* product information */}
                    <div className='mt-4 grow'>
                        <h1 className='mb-2 text-xl font-bold'>{product.name}</h1>
                        <div className='price mb-2 text-2xl'>{numberWithCommas(product.price)}</div>
                        <div className='flex w-full items-center'>
                            {product.isUsed ? (
                                <span className='flex flex-1 items-center bg-white/50 backdrop-blur-sm'>
                                    <span className='tag-used rounded-tl-md'>Đã qua sử dụng</span>
                                    <span className='tag-time-used'>12 năm</span>
                                </span>
                            ) : (
                                <span className='tag-like-new flex items-center gap-2 rounded-tl-md'>
                                    <FireIcon />
                                    Like new 99%
                                </span>
                            )}
                        </div>

                        <p className='relative mb-4 whitespace-pre-line rounded-md rounded-tl-none border p-2 text-lg shadow-lg shadow-bodyBg-default'>
                            {product.description}
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro vitae similique culpa magni
                            excepturi molestiae consequuntur obcaecati nostrum ea aliquam. Dolorum nihil eos molestias
                            vitae cupiditate laboriosam illo sed nesciunt! Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Voluptas, nesciunt quis unde optio iusto dolores harum repellendus quo
                            dolorum voluptatum id quod eveniet, ipsam veniam enim perferendis. Voluptatum,
                            necessitatibus provident.
                        </p>
                        <div className='icon-text'>
                            <FaLocationDot /> {product.zone}
                        </div>
                        <div className='icon-text'>
                            <FaClockRotateLeft /> Đăng {product.postedAt}
                        </div>
                        {/* Tags will be added here */}
                        <ul className='mb-10'>
                            <li>ASUS</li>
                        </ul>
                        <div className='flex flex-col gap-2'>
                            <Button variant={'fill'} size={'medium'} className='justify-center'>
                                Mua ngay
                            </Button>
                            <Button variant={'outline'} size={'medium'} className='justify-center'>
                                <BsCartPlusFill />
                                Thêm vào giỏ hàng
                            </Button>
                        </div>
                    </div>
                    <div className='sticky top-2 h-min shrink-0'>
                        {/* seller info */}
                        <div className='mb-2 flex items-center gap-2'>
                            <div className='avatar offline relative h-16 w-16 '>
                                <img src={'https://picsum.photos/200'} alt='' className='rounded-full' />
                            </div>
                            <div>
                                <div className='font-bold'>{product.username}</div>
                                <div className='flex items-center gap-1'>
                                    <FaRegClock /> 1 phút trước
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col items-center gap-2'>
                            <Button variant={'fillBlue'} className='flex'>
                                <FiPhoneCall />
                                Bấm để hiện số điện thoại
                            </Button>
                            <Button variant={'outlineBlue'}>
                                <IoChatbubbleEllipsesOutline /> Chat với người bán
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
