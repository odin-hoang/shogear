import Button from '../../components/Button';
import {
    FaAngleDoubleDown,
    FaCaretDown,
    FaFilter,
    FaPaperPlane,
    FaSortAmountDownAlt,
    FaSortAmountUpAlt,
} from 'react-icons/fa';
import { CiBoxList, CiGrid41 } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils/cn';
import { useEffect, useState } from 'react';

import toHyphenString from '../../lib/toHyphenString';
import Card from '../../components/Card';
import HeadlessTippy from '../../components/HeadlessTippy';
import { TbBrandProducthunt, TbBuildingCommunity } from 'react-icons/tb';
import apiRequest from '../../services/request';
import axios from 'axios';
type NewsProps = object;
type InitialFilterer = {
    byZone?: string | null;
    byProductTag: string[];
    byPrice?: 'asc' | 'desc';
};
// eslint-disable-next-line no-empty-pattern
const News = ({}: NewsProps) => {
    // Data
    const data = [
        {
            id: 1,
            imageUrl:
                'https://product.hstatic.net/200000722513/product/km086w_facd6092154b4d769a04f1859a0c4b8e_medium.png',
            username: 'David Smith',
            price: 120000,
            postedAt: '1 phút trước',
            zone: 'Hồ Chí Minh',
            name: 'Laptop gaming Acer Aspire 7 A715 76G 59MW',
            isUsed: false,
        },
        {
            id: 2,
            imageUrl:
                'https://product.hstatic.net/200000722513/product/latitude-3520-p108f001-70280538-fix_83b4c85f06d145199d87d838dc9eca04_medium.png',
            username: 'Todo Smith',
            price: 20890000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
            postedAt: '2 ngày trước',
            zone: 'Bà Rịa - Vũng Tàu',
            isUsed: true,
        },
        {
            id: 3,
            imageUrl:
                'https://product.hstatic.net/200000722513/product/lg-gram-2023-fix_28f08b20a1724869a1d5da4920697371_medium.png',
            username: 'Kelvin Smith',
            price: 35490000,
            postedAt: '5 phút trước',
            name: 'Laptop LG Gram 2023 14Z90R GAH53A5',
            zone: 'Thái Nguyên',
            isUsed: false,
        },
        {
            id: 4,
            imageUrl: 'https://down-vn.img.susercontent.com/file/bc3903834d250fcdadf0e5c6b5761310',
            username: 'Kelvin Smith',
            price: 340000000,
            postedAt: '2 giờ trước',
            name: '[Hàng chính hãng] Bàn phím Dell KB216',
            zone: 'Hà Nội',
            isUsed: true,
        },
        {
            id: 5,
            imageUrl:
                'https://product.hstatic.net/200000722513/product/vt200_1_compressed_c0a3639b9b2948bb89d600ce0640ba0d_08706b04e66d45aeb746128bfca9a29d_grande.jpg',
            username: 'Kelvin Smith',
            price: 120000,
            postedAt: '1 tuần trước',
            name: 'Chuột Rapoo Gaming VT200 RGB',
            zone: 'Đà Nẵng',
            isUsed: false,
        },
        {
            id: 6,
            imageUrl: 'https://picsum.photos/200/270',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
            postedAt: '1 tuần trước',
            zone: 'Đà Nẵng',
            isUsed: false,
        },
        {
            id: 5,
            imageUrl: 'https://picsum.photos/200/280',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            id: 5,
            imageUrl: 'https://picsum.photos/200/281',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            id: 5,
            imageUrl: 'https://picsum.photos/200/282',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            id: 5,
            imageUrl: 'https://picsum.photos/200/283',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            id: 5,
            imageUrl: 'https://picsum.photos/200/284',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            id: 5,
            imageUrl: 'https://picsum.photos/200/285',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            id: 5,
            imageUrl: 'https://picsum.photos/200/286',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            id: 5,
            imageUrl: 'https://picsum.photos/200/221',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            id: 5,
            imageUrl: 'https://picsum.photos/200/222',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            id: 5,
            imageUrl: 'https://picsum.photos/200/223',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            id: 5,
            imageUrl: 'https://picsum.photos/200/401',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            id: 5,
            imageUrl: 'https://picsum.photos/200/223',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            id: 5,
            imageUrl: 'https://picsum.photos/200/401',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
        {
            id: 5,
            imageUrl: 'https://picsum.photos/200/223',
            username: 'Kelvin Smith',
            price: 120000,
            name: 'PC GVN x ASUS EVANGELION 2 (Intel i9-14900K/ VGA RTX 4090) (Powered by ASUS)',
        },
    ];
    const productTags = [
        'Laptop',
        'Laptop Gaming',
        'Ổ cứng, RAM, Thẻ nhớ',
        'Apple',
        'Màn hình',
        'Bàn phím',
        'Tai nghe - Loa',
        'Phụ kiện',
        'Chuột + Lót chuột',
    ];
    type Post = {
        id: number;
        name: string;
        imageUrl: string;
        price: number;
        description: string;
        username: string;
        postedAt: string;
        zone: string;
        isUsed?: boolean;
    };
    const [urls, setUrls] = useState('');
    const [posts, setPosts] = useState<Post[]>([
        {
            id: 1,
            imageUrl:
                'https://product.hstatic.net/200000722513/product/km086w_facd6092154b4d769a04f1859a0c4b8e_medium.png',
            username: 'David Smith',
            description: 'Description',
            price: 120000,
            postedAt: '1 phút trước',
            zone: 'Hồ Chí Minh',
            name: 'Laptop gaming Acer Aspire 7 A715 76G 59MW',
            isUsed: false,
        },
    ]);
    useEffect(() => {
        apiRequest.get('/posts').then((response) => {
            const datas: Post[] = [];
            for (const post of response.data.results) {
                const data: Post = {
                    id: post.id,
                    imageUrl: post.attachments.length
                        ? post.attachments[0].file
                        : 'https://product.hstatic.net/200000722513/product/km086w_facd6092154b4d769a04f1859a0c4b8e_medium.png',
                    description: post.description,
                    username: post.user,
                    price: post.product.price,
                    postedAt: post.updatedAt,
                    zone: post.zone,
                    name: post.product.name,
                };
                datas.push(data);
            }
            setPosts((prev) => {
                const newPosts = [...prev, ...datas];
                return newPosts.filter((post, index, self) => index === self.findIndex((p) => p.id === post.id));
            });
            console.log({ data: response.data });
            setUrls(response.data.next);
        });
    }, []);
    const handleViewMore = () => {
        if (!urls) return;
        console.log(urls);
        axios.get(urls).then((response) => {
            const datas: Post[] = [];
            for (const post of response.data.results) {
                const data: Post = {
                    id: post.id,
                    imageUrl: post.attachments.length
                        ? post.attachments[0].file
                        : 'https://product.hstatic.net/200000722513/product/km086w_facd6092154b4d769a04f1859a0c4b8e_medium.png',
                    description: post.description,
                    username: post.user,
                    price: post.product.price,
                    postedAt: post.updatedAt,
                    zone: post.zone,
                    name: post.product.name,
                };
                datas.push(data);
            }
            setPosts((prev) => {
                const newPosts = [...prev, ...datas];
                return newPosts.filter((post, index, self) => index === self.findIndex((p) => p.id === post.id));
            });
            console.log({ data: response.data });
            setUrls(response.data.next);
        });
    };
    const zoneTags = ['TP Hồ Chí Minh', 'Đà Nẵng', 'Cao Bằng', 'Hà Nội', 'Long An', 'Kiên Giang'];
    // default layout = grid
    const [layout, setLayout] = useState(false);

    const [filterer, setFilterer] = useState<InitialFilterer>({
        byZone: null,
        byProductTag: [],
        byPrice: 'asc',
    });

    function handleFilter(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, filter: 'byZone' | 'byProductTag') {
        const payloadParser = e.target as HTMLElement;
        const payload = payloadParser.innerHTML;
        if (filter === 'byZone') {
            setFilterer((prev) => (prev.byZone !== payload ? { ...prev, byZone: payload } : { ...prev, byZone: null }));
        }
        if (filter === 'byProductTag') {
            if (filterer.byProductTag.includes(payload)) {
                setFilterer((prev) => ({
                    ...prev,
                    byProductTag: [...prev.byProductTag.filter((tag) => tag !== payload)],
                }));
            } else {
                setFilterer((prev) => ({ ...prev, byProductTag: [...prev.byProductTag, payload] }));
            }
        }
    }
    function handlePrice() {
        if (filterer.byPrice === 'asc') {
            setFilterer((prev) => ({ ...prev, byPrice: 'desc' }));
        } else if (filterer.byPrice === 'desc') {
            setFilterer((prev) => ({ ...prev, byPrice: 'asc' }));
        }
    }
    const handleApplyFilter = () => {
        // TODO: send request filter to server
        console.log(filterer);
    };
    const handleDeleteFilter = (type: 'byZone' | 'byProductTag') => {
        if (type === 'byZone') setFilterer((prev) => ({ ...prev, byZone: null }));
        if (type === 'byProductTag') setFilterer((prev) => ({ ...prev, byProductTag: [] }));
        handleApplyFilter();
    };
    console.log(posts);
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
                    <HeadlessTippy
                        content={
                            <div className='w-96'>
                                <div className='icon-text'>
                                    <TbBuildingCommunity /> Tìm kiếm theo khu vực
                                </div>
                                <div className='my-4 flex flex-wrap gap-2'>
                                    {zoneTags.map((zone, index) => (
                                        <Button
                                            variant={'basic'}
                                            onClick={(e) => handleFilter(e, 'byZone')}
                                            key={index}
                                            className={cn(zone === filterer.byZone && 'active-button')}
                                        >
                                            {zone}
                                        </Button>
                                    ))}
                                </div>
                                <div className='flex items-center justify-end gap-2 '>
                                    <Button
                                        variant={'fill'}
                                        className='w-1/2 justify-center shadow-custom'
                                        onClick={handleApplyFilter}
                                    >
                                        Áp dụng
                                    </Button>
                                    <Button
                                        variant={'outline'}
                                        className='w-1/2 justify-center '
                                        onClick={() => handleDeleteFilter('byZone')}
                                    >
                                        Xoá lọc
                                    </Button>
                                </div>
                            </div>
                        }
                    >
                        <Button>
                            Toàn quốc <FaCaretDown />
                        </Button>
                    </HeadlessTippy>
                    {/* product list */}
                    <HeadlessTippy
                        content={
                            <div className='w-96'>
                                <div className='icon-text'>
                                    <TbBrandProducthunt /> Tìm kiếm theo danh mục sản phẩm
                                </div>
                                <div className='my-4 flex flex-wrap gap-2'>
                                    {productTags.map((productTag) => (
                                        <Button
                                            variant={'basic'}
                                            onClick={(e) => handleFilter(e, 'byProductTag')}
                                            key={productTag}
                                            className={cn(
                                                filterer.byProductTag.includes(productTag) && 'active-button',
                                            )}
                                        >
                                            {productTag}
                                        </Button>
                                    ))}
                                </div>
                                <div className='flex items-center justify-end gap-2 '>
                                    <Button
                                        variant={'fill'}
                                        className='w-1/2 justify-center shadow-custom'
                                        onClick={handleApplyFilter}
                                    >
                                        Áp dụng
                                    </Button>
                                    <Button
                                        variant={'outline'}
                                        className='w-1/2 justify-center '
                                        onClick={() => handleDeleteFilter('byProductTag')}
                                    >
                                        Xoá lọc
                                    </Button>
                                </div>
                            </div>
                        }
                    >
                        <Button>
                            Danh mục <FaCaretDown />
                        </Button>
                    </HeadlessTippy>
                    <Button onClick={handlePrice}>
                        Giá {filterer.byPrice === 'asc' ? <FaSortAmountUpAlt /> : <FaSortAmountDownAlt />}
                    </Button>
                    <span className='cursor-pointer text-3xl' onClick={() => setLayout(!layout)}>
                        {layout ? <CiGrid41 /> : <CiBoxList />}
                    </span>
                </div>
            </div>
            {/* layout */}
            {layout ? (
                // List
                <div className='flex flex-col gap-2'>
                    {posts.map((item, index) => (
                        <div className={cn(' flex gap-4 rounded-sm border p-2')} key={index}>
                            <Card
                                id={item.id}
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
                    {posts.map((item, index) => (
                        <Link
                            to={`/products/${toHyphenString(item.name)}`}
                            state={{ item }}
                            className={cn('flex flex-col rounded-sm border')}
                            key={index}
                            preventScrollReset={false}
                        >
                            <Card
                                id={item.id}
                                name={item.name}
                                imageUrl={item.imageUrl}
                                price={item.price}
                                username={item.username}
                                postedAt={item.postedAt}
                                zone={item.zone}
                                isUsed={item.isUsed}
                                // onClick={() => handleAddCart({ ...item, quantity: 1 })}
                            />
                        </Link>
                    ))}
                </div>
            )}
            {urls && (
                <div
                    className='mt-2 flex cursor-pointer flex-col items-center p-2 text-center font-bold'
                    onClick={handleViewMore}
                >
                    Xem thêm{' '}
                    <span>
                        <FaAngleDoubleDown />
                    </span>
                </div>
            )}
        </div>
    );
};

export default News;
