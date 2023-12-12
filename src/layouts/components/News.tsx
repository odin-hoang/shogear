import Button from '../../components/Button';
import { FaAngleDoubleDown, FaFilter, FaPaperPlane } from 'react-icons/fa';
import { CiBoxList, CiGrid41 } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils/cn';
import { useState } from 'react';
import Card from '../../components/Card';
import toHyphenString from '../../lib/toHyphenString';
import HeadlessTippy from '../../components/HeadlessTippy';
type NewsProps = {};

const News = ({}: NewsProps) => {
    const data = [
        {
            imageUrl:
                'https://product.hstatic.net/200000722513/product/km086w_facd6092154b4d769a04f1859a0c4b8e_medium.png',
            username: 'David Smith',
            price: 120000,
            postedAt: '1 phút trước',
            zone: 'Hồ Chí Minh',
            name: 'Laptop gaming Acer Aspire 7 A715 76G 59MW',
            isUsed: false,
            description:
                'Máy main zin 64G \n Màn zin sọc sát mép cảm ứng ngon\n Mất face id. Pin thay.\nAe cần màn lcd + 300k',
        },
        {
            imageUrl:
                'https://product.hstatic.net/200000722513/product/latitude-3520-p108f001-70280538-fix_83b4c85f06d145199d87d838dc9eca04_medium.png',
            username: 'Todo Smith',
            price: 20890000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
            postedAt: '2 ngày trước',
            zone: 'Bà Rịa - Vũng Tàu',
            isUsed: true,
            description:
                'Máy main zin 64G \n Màn zin sọc sát mép cảm ứng ngon\n Mất face id. Pin thay.\nAe cần màn lcd + 300k',
        },
        {
            imageUrl:
                'https://product.hstatic.net/200000722513/product/lg-gram-2023-fix_28f08b20a1724869a1d5da4920697371_medium.png',
            username: 'Kelvin Smith',
            price: 35490000,
            postedAt: '5 phút trước',
            name: 'Laptop LG Gram 2023 14Z90R GAH53A5',
            zone: 'Thái Nguyên',
            isUsed: false,
            description:
                'Máy main zin 64G \n Màn zin sọc sát mép cảm ứng ngon\n Mất face id. Pin thay.\nAe cần màn lcd + 300k',
        },
        {
            imageUrl: 'https://down-vn.img.susercontent.com/file/bc3903834d250fcdadf0e5c6b5761310',
            username: 'Kelvin Smith',
            price: 340000000,
            postedAt: '2 giờ trước',
            name: '[Hàng chính hãng] Bàn phím Dell KB216',
            zone: 'Hà Nội',
            isUsed: true,
            description:
                'Máy main zin 64G \n Màn zin sọc sát mép cảm ứng ngon\n Mất face id. Pin thay.\nAe cần màn lcd + 300k',
        },
        {
            imageUrl:
                'https://product.hstatic.net/200000722513/product/vt200_1_compressed_c0a3639b9b2948bb89d600ce0640ba0d_08706b04e66d45aeb746128bfca9a29d_grande.jpg',
            username: 'Kelvin Smith',
            price: 120000,
            postedAt: '1 tuần trước',
            name: 'Chuột Rapoo Gaming VT200 RGB',
            zone: 'Đà Nẵng',
            isUsed: false,
            description:
                'Máy main zin 64G \n Màn zin sọc sát mép cảm ứng ngon\n Mất face id. Pin thay.\nAe cần màn lcd + 300k',
        },
        {
            imageUrl: 'https://picsum.photos/200/270',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            imageUrl: 'https://picsum.photos/200/280',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            imageUrl: 'https://picsum.photos/200/281',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            imageUrl: 'https://picsum.photos/200/282',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            imageUrl: 'https://picsum.photos/200/283',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            imageUrl: 'https://picsum.photos/200/284',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            imageUrl: 'https://picsum.photos/200/285',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            imageUrl: 'https://picsum.photos/200/286',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            imageUrl: 'https://picsum.photos/200/221',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            imageUrl: 'https://picsum.photos/200/222',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            imageUrl: 'https://picsum.photos/200/223',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            imageUrl: 'https://picsum.photos/200/401',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            imageUrl: 'https://picsum.photos/200/223',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            imageUrl: 'https://picsum.photos/200/401',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            imageUrl: 'https://picsum.photos/200/223',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
    ];
    // default layout = grid
    const [layout, setLayout] = useState(false);
    return (
        <div className='min-h-screen  rounded-md bg-white p-4'>
            {/* username and filterer */}
            <div className='mb-4 flex items-center justify-between'>
                <h1 className='inline-block text-lg font-bold'>
                    <span className='inline-block text-primary-default'>
                        <FaPaperPlane />
                    </span>
                    <span className='ml-2'>Bài đăng mới</span>
                </h1>
                <div className='flex gap-3 '>
                    <span className='flex items-center gap-1 text-primary-900'>
                        <span className=''>
                            <FaFilter />
                        </span>
                        <span>Lọc</span>
                    </span>
                    <HeadlessTippy content={<button>Hello</button>}>
                        <Button>Toàn quốc</Button>
                    </HeadlessTippy>

                    <Button>Danh mục</Button>
                    <Button price='asc'>Giá</Button>
                    <span className='cursor-pointer text-3xl' onClick={() => setLayout(!layout)}>
                        {layout ? <CiGrid41 /> : <CiBoxList />}
                    </span>
                </div>
            </div>
            {/* layout */}
            {layout ? (
                // List
                <div className='flex flex-col gap-2'>
                    {data.map((item, index) => (
                        <div className={cn(' flex gap-4 rounded-sm border p-2')} key={index}>
                            <Card
                                name={item.name}
                                imageUrl={item.imageUrl}
                                price={item.price}
                                username={item.username}
                                postedAt={item.postedAt}
                                zone={item.zone}
                                isUsed={item.isUsed}
                                className='w-[200px]'
                            />
                            <div>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus pariatur illo
                                similique animi laborum omnis blanditiis hic ipsam facilis sunt rem porro nulla saepe
                                consequatur, illum reprehenderit laudantium consequuntur obcaecati?
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Grid
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-3  lg:grid-cols-5'>
                    {data.map((item, index) => (
                        <Link
                            to={`/products/${toHyphenString(item.name)}`}
                            state={{ item }}
                            className={cn('flex flex-col rounded-sm border')}
                            key={index}
                            preventScrollReset={false}
                        >
                            <Card
                                name={item.name}
                                imageUrl={item.imageUrl}
                                price={item.price}
                                username={item.username}
                                postedAt={item.postedAt}
                                zone={item.zone}
                                isUsed={item.isUsed}
                            />
                        </Link>
                    ))}
                </div>
            )}
            <div className='mt-2 flex cursor-pointer flex-col items-center p-2 text-center font-bold'>
                Xem thêm{' '}
                <span>
                    <FaAngleDoubleDown />
                </span>
            </div>
        </div>
    );
};

export default News;
